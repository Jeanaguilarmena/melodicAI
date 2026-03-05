import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const PianoRoll = ({ composition, onCompositionChange, onAiRequest }) => {
  const canvasRef = useRef(null);

  //Initial configuration
  const beatsPerBar = 4;
  const stepsPerBeat = 4;
  const totalBars = 8;
  const TONAL_OFFSET = 0;

  const octaves = 4;
  const keysPerOctave = 12;
  const totalKeys = octaves * keysPerOctave;
  const rowHeight = 24;

  const totalStepsPerBar = beatsPerBar * stepsPerBeat;
  const totalSteps = totalBars * totalStepsPerBar;

  const bpm = 120;

  const flattenComposition = (composition) => {
    const harmonyNotes = composition.harmony.flatMap((block) => {
      const { start, bass, chord } = block;

      return [
        { ...bass, start, source: "harmony" },
        ...chord.map((note) => ({
          ...note,
          start,
          source: "harmony",
        })),
      ];
    });

    const aiNotes = composition.melody.ai.map((note) => ({
      ...note,
      source: "ai",
    }));

    const userNotes = composition.melody.user.map((note) => ({
      ...note,
      source: "user",
    }));

    return [...harmonyNotes, ...aiNotes, ...userNotes];
  };

  const [notes, setNotes] = useState(() => flattenComposition(composition));

  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [draggingPlayhead, setDraggingPlayhead] = useState(false);

  const [draggingNoteIndex, setDraggingNoteIndex] = useState(null);
  const [dragType, setDragType] = useState(null);
  const [cursor, setCursor] = useState("default");
  const [pendingAiPayload, setPendingAiPayload] = useState(null);
  const deletedAiNoteRef = useRef(false);

  useEffect(() => {
    if (!pendingAiPayload) return;

    if (onAiRequest) {
      onAiRequest(pendingAiPayload);
    }

    setPendingAiPayload(null);
  }, [pendingAiPayload, onAiRequest]);

  const baseStepWidth = 20;
  const stepWidth = baseStepWidth * zoom;

  const totalWidth = totalSteps * stepWidth;
  const totalHeight = totalKeys * rowHeight;

  const pianoWidth = 80;

  const startOctave = 2;

  const audioRefs = useRef({});

  // Sync when composition changes
  useEffect(() => {
    setNotes(flattenComposition(composition));
  }, [composition]);

  const emitChange = (updatedNotes) => {
    if (!onCompositionChange) return;

    const ai = updatedNotes.filter((n) => n.source === "ai");
    const user = updatedNotes.filter((n) => n.source === "user");

    onCompositionChange({
      ...composition,
      melody: { ai, user },
    });
  };

  const noteNames = [
    "C",
    "Csharp",
    "D",
    "Dsharp",
    "E",
    "F",
    "Fsharp",
    "G",
    "Gsharp",
    "A",
    "Asharp",
    "B",
  ];

  const pitchToNoteName = (pitch) => {
    const midiPitch = pitch + TONAL_OFFSET;

    const noteIndex = midiPitch % 12;
    const octave = startOctave + Math.floor(midiPitch / 12);

    return `${noteNames[noteIndex]}${octave}`;
  };

  const playNote = (pitch) => {
    const noteName = pitchToNoteName(pitch);
    const filePath = `/sounds/Piano/${noteName}.wav`;

    if (!audioRefs.current[noteName]) {
      audioRefs.current[noteName] = new Audio(filePath);
    }

    const audio = audioRefs.current[noteName];
    try {
      audio.currentTime = 0;
      audio.play();
    } catch {}
  };

  // Playback engine
  useEffect(() => {
    if (!isPlaying) return;

    const secondsPerBeat = 60 / bpm;
    const secondsPerStep = secondsPerBeat / stepsPerBeat;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % totalSteps;

        notes.forEach((note) => {
          if (note.start === next) {
            playNote(note.pitch);
          }
        });

        return next;
      });
    }, secondsPerStep * 1000);

    return () => clearInterval(interval);
  }, [isPlaying, notes]);

  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      setZoom((prev) =>
        Math.min(Math.max(prev + (e.deltaY < 0 ? 0.1 : -0.1), 0.5), 3)
      );
    }
  };

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const findNoteAtPosition = (x, y) => {
    const step = Math.floor(x / stepWidth);
    const pitch = totalKeys - Math.floor(y / rowHeight) - 1;

    return notes.findIndex(
      (note) =>
        pitch === note.pitch &&
        step >= note.start &&
        step < note.start + note.length
    );
  };

  const handleMouseDown = (e) => {
    const { x, y } = getMousePos(e);
    const step = Math.floor(x / stepWidth);
    const pitch = totalKeys - Math.floor(y / rowHeight) - 1;
    const noteIndex = findNoteAtPosition(x, y);

    console.log("noteIndex:", noteIndex);
    console.log("deleted flag:", deletedAiNoteRef.current);

    console.log("mouse button:", e.button);

    // RIGHT CLICK → DELETE
    if (e.button === 2) {
      if (noteIndex !== -1 && notes[noteIndex].source !== "harmony") {
        const noteToDelete = notes[noteIndex];

        const updated = notes.filter((_, i) => i !== noteIndex);
        setNotes(updated);

        // If we just deleted an AI note, we set a flag and wait for the next user note to trigger the AI request with the cut context. If we deleted a user note, we can immediately emit the change.
        if (noteToDelete.source === "ai") {
          deletedAiNoteRef.current = true;
          console.log("AI note deleted → waiting for user note...");
        } else {
          emitChange(updated);
        }
      }
      return;
    }

    // SHIFT → Move playhead
    if (e.shiftKey) {
      setCurrentStep(Math.max(0, Math.min(totalSteps - 1, step)));
      setDraggingPlayhead(true);
      return;
    }

    // DRAG EXISTING NOTE
    if (noteIndex !== -1) {
      const note = notes[noteIndex];
      const endBoundary = (note.start + note.length) * stepWidth;

      if (Math.abs(x - endBoundary) < 6) {
        setDragType("resize");
        setCursor("ew-resize");
      } else {
        setDragType("move");
        setCursor("grabbing");
      }

      setDraggingNoteIndex(noteIndex);
      return;
    }

    // ADD NEW USER NOTE
    const newNote = {
      pitch,
      start: step,
      length: 1,
      source: "user",
    };

    setNotes((prevNotes) => {
      const updated = [...prevNotes, newNote];

      if (deletedAiNoteRef.current) {
        const cutTime = newNote.start;

        const userNotes = updated.filter((n) => n.source === "user");

        const aiContext = updated.filter(
          (n) => n.source === "ai" && n.start < cutTime
        );

        const payload = {
          userNotes,
          aiContext,
          cutTime,
        };

        console.log("Triggering AI request:", payload);

        setPendingAiPayload(payload);

        deletedAiNoteRef.current = false;
      } else {
        emitChange(updated);
      }

      return updated;
    });

    playNote(pitch);
  };

  const handleMouseMove = (e) => {
    const { x, y } = getMousePos(e);

    if (draggingPlayhead) {
      const step = Math.floor(x / stepWidth);
      setCurrentStep(Math.max(0, Math.min(totalSteps - 1, step)));
      return;
    }

    if (draggingNoteIndex !== null) {
      const step = Math.floor(x / stepWidth);
      const pitch = totalKeys - Math.floor(y / rowHeight) - 1;

      setNotes((prev) =>
        prev.map((note, i) => {
          if (i !== draggingNoteIndex) return note;

          if (dragType === "resize") {
            return {
              ...note,
              length: Math.max(1, step - note.start + 1),
            };
          }

          if (dragType === "move") {
            return {
              ...note,
              start: Math.max(0, step),
              pitch: Math.max(0, Math.min(totalKeys - 1, pitch)),
            };
          }

          return note;
        })
      );
    }
  };

  const handleMouseUp = () => {
    if (draggingNoteIndex !== null) {
      emitChange(notes);
    }

    setDraggingNoteIndex(null);
    setDragType(null);
    setDraggingPlayhead(false);
    setCursor("default");
  };

  const drawGrid = (ctx) => {
    ctx.clearRect(0, 0, totalWidth, totalHeight);

    for (let i = 0; i <= totalSteps; i++) {
      const x = Math.round(i * stepWidth) + 0.5;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, totalHeight);

      ctx.strokeStyle =
        i % totalStepsPerBar === 0
          ? "rgba(255,255,255,0.18)"
          : i % stepsPerBeat === 0
          ? "rgba(255,255,255,0.10)"
          : "rgba(255,255,255,0.05)";

      ctx.lineWidth = i % totalStepsPerBar === 0 ? 2 : 1;
      ctx.stroke();
    }

    for (let i = 0; i <= totalKeys; i++) {
      const y = Math.round(i * rowHeight) + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(totalWidth, y);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(currentStep * stepWidth, 0);
    ctx.lineTo(currentStep * stepWidth, totalHeight);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawNotes = (ctx) => {
    notes.forEach((note) => {
      const x = note.start * stepWidth;
      const y = (totalKeys - note.pitch - 1) * rowHeight;

      ctx.fillStyle =
        note.source === "ai"
          ? "rgba(180,180,180,0.7)"
          : note.source === "harmony"
          ? "rgba(120,120,120,0.5)"
          : "#4da6ff";

      ctx.fillRect(x, y, note.length * stepWidth, rowHeight);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    drawGrid(ctx);
    drawNotes(ctx);
  }, [notes, zoom, currentStep]);

  return (
    <Box
      sx={{
        height: 520,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 20% 20%, #2a2a2a, #121212 70%)",
        p: 4,
      }}
    >
      <MotionCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          width: "100%",
          maxWidth: 1200,
          height: 500,
          borderRadius: "28px",
          backdropFilter: "blur(30px)",
          background: alpha("#ffffff", 0.05),
          border: `1px solid ${alpha("#ffffff", 0.08)}`,
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 500,
              letterSpacing: 0.5,
              opacity: 0.85,
            }}
          >
            Piano Roll
          </Typography>

          <IconButton
            onClick={() => setIsPlaying((prev) => !prev)}
            sx={{
              width: 46,
              height: 46,
              borderRadius: "16px",
              background: alpha("#ffffff", 0.08),
              transition: "all 0.25s ease",
              "&:hover": {
                background: alpha("#ffffff", 0.15),
                transform: "scale(1.05)",
              },
            }}
          >
            {isPlaying ? (
              <StopIcon sx={{ color: "#fff" }} />
            ) : (
              <PlayArrowIcon sx={{ color: "#fff" }} />
            )}
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: alpha("#ffffff", 0.08) }} />

        {/* Scrollable Piano Area — FUNCIONALIDAD INTACTA */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              minHeight: totalHeight,
            }}
          >
            {/* Piano Keys — MISMO TAMAÑO */}
            <Box
              sx={{
                width: pianoWidth,
              }}
            >
              {Array.from({ length: totalKeys }).map((_, i) => {
                const reversedIndex = totalKeys - i - 1;
                const isBlack = [1, 3, 6, 8, 10].includes(reversedIndex % 12);

                return (
                  <Box
                    key={i}
                    onMouseDown={() => playNote(reversedIndex)}
                    sx={{
                      height: rowHeight,
                      background: isBlack
                        ? alpha("#000", 0.7)
                        : alpha("#fff", 0.9),
                      transition: "background 0.15s ease",
                      cursor: "pointer",
                      "&:hover": {
                        background: isBlack ? alpha("#000", 0.9) : "#ffffff",
                      },
                    }}
                  />
                );
              })}
            </Box>

            {/* Canvas Scroll — NO SE TOCA NADA */}
            <Box
              sx={{
                flex: 1,
                overflowX: "auto",
              }}
              onWheel={handleWheel}
            >
              <canvas
                ref={canvasRef}
                style={{
                  cursor,
                  display: "block",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onContextMenu={(e) => e.preventDefault()}
              />
            </Box>
          </Box>
        </Box>
      </MotionCard>
    </Box>
  );
};

export default PianoRoll;
