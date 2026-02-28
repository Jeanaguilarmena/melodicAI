import React, { useRef, useEffect, useState } from "react";

const PianoRoll = () => {
  const canvasRef = useRef(null);

  // CONFIG
  const beatsPerBar = 4;
  const stepsPerBeat = 4;
  const totalBars = 8;

  const octaves = 4;
  const keysPerOctave = 12;
  const totalKeys = octaves * keysPerOctave;
  const rowHeight = 24;

  const totalStepsPerBar = beatsPerBar * stepsPerBeat;
  const totalSteps = totalBars * totalStepsPerBar;

  const bpm = 120;

  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [draggingPlayhead, setDraggingPlayhead] = useState(false);

  const baseStepWidth = 20;
  const stepWidth = baseStepWidth * zoom;

  const totalWidth = totalSteps * stepWidth;
  const totalHeight = totalKeys * rowHeight;

  const pianoWidth = 80;

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

  const startOctave = 3;

  const [notes, setNotes] = useState([
    { pitch: 10, start: 0, length: 8 },
    { pitch: 14, start: 16, length: 16 },
  ]);

  const [draggingNoteIndex, setDraggingNoteIndex] = useState(null);
  const [dragType, setDragType] = useState(null);
  const [cursor, setCursor] = useState("default");

  const audioRefs = useRef({});

  const pitchToNoteName = (pitch) => {
    const noteIndex = pitch % 12;
    const octave = startOctave + Math.floor(pitch / 12);
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
    } catch (err) {
      console.log("Audio blocked:", err);
    }
  };

  // 🎵 MOTOR DE REPRODUCCIÓN
  useEffect(() => {
    if (!isPlaying) return;

    const secondsPerBeat = 60 / bpm;
    const secondsPerStep = secondsPerBeat / stepsPerBeat;

    const interval = setInterval(() => {
      setCurrentStep((prevStep) => {
        const nextStep = (prevStep + 1) % totalSteps;

        // 🔊 disparar notas que empiezan en este step
        notes.forEach((note) => {
          if (note.start === nextStep) {
            playNote(note.pitch);
          }
        });

        return nextStep;
      });
    }, secondsPerStep * 1000);

    return () => clearInterval(interval);
  }, [isPlaying, notes]);

  const isBlackKey = (noteIndex) => {
    const pattern = [1, 3, 6, 8, 10];
    return pattern.includes(noteIndex % 12);
  };

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

    // CLICK DERECHO → borrar nota
    if (e.button === 2) {
      if (noteIndex !== -1) {
        setNotes((prev) => prev.filter((_, i) => i !== noteIndex));
      }
      return;
    }

    // 🔴 SHIFT + CLICK → mover playhead
    if (e.shiftKey) {
      setCurrentStep(Math.max(0, Math.min(totalSteps - 1, step)));
      setDraggingPlayhead(true);
      return;
    }

    // CLICK sobre el playhead (zona roja) → arrastrarlo
    const playheadX = currentStep * stepWidth;
    if (Math.abs(x - playheadX) < 6) {
      setDraggingPlayhead(true);
      return;
    }

    // SI HAY NOTA → comportamiento normal
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
    } else {
      const newNote = { pitch, start: step, length: 1 };
      setNotes((prev) => [...prev, newNote]);
      playNote(pitch);
    }
  };

  const handleMouseMove = (e) => {
    const { x, y } = getMousePos(e);

    // 🎯 DRAG PLAYHEAD
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
            const newLength = Math.max(1, step - note.start + 1);
            return { ...note, length: newLength };
          }

          if (dragType === "move") {
            const newPitch = Math.max(0, Math.min(totalKeys - 1, pitch));
            if (newPitch !== note.pitch) playNote(newPitch);

            return {
              ...note,
              start: Math.max(0, step),
              pitch: newPitch,
            };
          }

          return note;
        })
      );
    }
  };

  const handleMouseUp = () => {
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

    // 🔴 PLAYHEAD
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

      ctx.fillStyle = "#4da6ff";
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
    <div
      style={{
        height: "500px",
        background: "#1e1e1e",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ▶ CONTROLES */}
      <div style={{ padding: 10 }}>
        <button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? "Stop" : "Play"}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ display: "flex", minHeight: totalHeight }}>
          <div style={{ width: pianoWidth }}>
            {Array.from({ length: totalKeys }).map((_, i) => {
              const reversedIndex = totalKeys - i - 1;
              const black = isBlackKey(reversedIndex);

              return (
                <div
                  key={i}
                  onMouseDown={() => playNote(reversedIndex)}
                  style={{
                    height: rowHeight,
                    background: black ? "#111" : "#ddd",
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>

          <div style={{ flex: 1, overflowX: "auto" }} onWheel={handleWheel}>
            <canvas
              ref={canvasRef}
              style={{ cursor }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PianoRoll;
