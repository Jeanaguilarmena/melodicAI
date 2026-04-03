import { Box, Button, Card } from "@mui/material";
import React, { useState } from "react";
import PianoRoll from "../../components/pianoRoll/pianoRoll";
import InitialSettings from "../../components/initialSettings/initialSettings";
import { makeAIRequest } from "../../api/project.api";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../../context/authContext";
import SaveProjectModal from "../../components/saveProjectModal/saveProjectModal";

function ProducePage() {
  const { user } = useAuth();
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  // This is hardcoded for now, but in a real app this would be loaded from a server or created by the user
  const [composition, setComposition] = useState({
    harmony: [
      {
        name: "C",
        start: 0,
        bass: { pitch: 12, length: 16 },
        chord: [
          { pitch: 24, length: 16 },
          { pitch: 28, length: 16 },
          { pitch: 31, length: 16 },
        ],
      },
      {
        name: "Dm",
        start: 16,
        bass: { pitch: 14, length: 16 },
        chord: [
          { pitch: 26, length: 16 },
          { pitch: 29, length: 16 },
          { pitch: 33, length: 16 },
        ],
      },
      {
        name: "A#",
        start: 32,
        bass: { pitch: 10, length: 16 },
        chord: [
          { pitch: 22, length: 16 },
          { pitch: 26, length: 16 },
          { pitch: 29, length: 16 },
        ],
      },
      {
        name: "A#",
        start: 48,
        bass: { pitch: 10, length: 16 },
        chord: [
          { pitch: 22, length: 16 },
          { pitch: 26, length: 16 },
          { pitch: 29, length: 16 },
        ],
      },
      {
        name: "C",
        start: 64,
        bass: { pitch: 12, length: 16 },
        chord: [
          { pitch: 24, length: 16 },
          { pitch: 28, length: 16 },
          { pitch: 31, length: 16 },
        ],
      },
      {
        name: "Dm",
        start: 80,
        bass: { pitch: 14, length: 16 },
        chord: [
          { pitch: 26, length: 16 },
          { pitch: 29, length: 16 },
          { pitch: 33, length: 16 },
        ],
      },
      {
        name: "A#",
        start: 96,
        bass: { pitch: 10, length: 16 },
        chord: [
          { pitch: 22, length: 16 },
          { pitch: 26, length: 16 },
          { pitch: 29, length: 16 },
        ],
      },
      {
        name: "A#",
        start: 112,
        bass: { pitch: 10, length: 16 },
        chord: [
          { pitch: 22, length: 16 },
          { pitch: 26, length: 16 },
          { pitch: 29, length: 16 },
        ],
      },
    ],

    melody: {
      ai: [
        { pitch: 36, start: 4, length: 2 },
        { pitch: 36, start: 6, length: 2 },
        { pitch: 36, start: 8, length: 2 },
        { pitch: 36, start: 10, length: 2 },
        { pitch: 36, start: 12, length: 2 },
        { pitch: 31, start: 14, length: 4 },
        { pitch: 33, start: 18, length: 10 },
        { pitch: 29, start: 28, length: 2 },
        { pitch: 29, start: 30, length: 2 },
        { pitch: 38, start: 32, length: 2 },
        { pitch: 38, start: 34, length: 2 },

        { pitch: 36, start: 36, length: 4 },
        { pitch: 33, start: 40, length: 4 },
        { pitch: 29, start: 44, length: 2 },
        { pitch: 29, start: 46, length: 2 },

        { pitch: 38, start: 48, length: 4 },
        { pitch: 36, start: 52, length: 4 },
        { pitch: 33, start: 56, length: 4 },
        { pitch: 31, start: 60, length: 4 },

        { pitch: 36, start: 68, length: 2 },
        { pitch: 36, start: 70, length: 2 },
        { pitch: 36, start: 72, length: 2 },
        { pitch: 36, start: 74, length: 2 },
        { pitch: 36, start: 76, length: 2 },
        { pitch: 31, start: 78, length: 4 },
        { pitch: 33, start: 82, length: 10 },
        { pitch: 29, start: 92, length: 2 },
        { pitch: 29, start: 94, length: 2 },
        { pitch: 38, start: 96, length: 2 },
        { pitch: 38, start: 98, length: 2 },

        { pitch: 36, start: 100, length: 4 },
        { pitch: 33, start: 104, length: 4 },
        { pitch: 29, start: 108, length: 2 },
        { pitch: 29, start: 110, length: 2 },

        { pitch: 38, start: 112, length: 4 },
        { pitch: 36, start: 116, length: 4 },
        { pitch: 33, start: 120, length: 4 },
        { pitch: 31, start: 124, length: 4 },
      ],
      user: [],
    },
  });

  const [initialSettings, setInitialSettings] = useState(null);
  const [started, setStarted] = useState(false);

  const handleAiRequest = async (payload) => {
    const { userNotes, aiContext, cutTime } = payload;

    const regenerated = Array.from({ length: 5 }, (_, i) => ({
      pitch: [36, 33, 31, 29, 38][i % 5],
      start: cutTime + i * 4 + 4,
      length: 4,
    }));

    // const generatedNotes = await makeAIRequest(user, {
    //   userNotes,
    //   aiContext,
    //   cutTime,
    //   initialSettings,
    // });

    //Here I need to make the request to the AI and then update the composition with the new Melody
    setComposition((prev) => ({
      ...prev,
      melody: {
        ai: [...aiContext, ...regenerated],
        user: userNotes,
      },
    }));
  };

  async function handleSaveProject(
    projectName,
    description,
    artist,
    bpm,
    genre,
    scale
  ) {
    const token = await user.getIdToken();

    const payload = {
      name: projectName,
      description: description,
      artist: artist,
      bpm: bpm,
      genre: genre,
      scale: scale,
      ...composition,
    };

    try {
      const res = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Error saving project");
      }

      setSaveModalOpen(false);

      console.log("Project saved");
    } catch (error) {
      console.error("Error saving project", error);
    }
  }
  return (
    <>
      {!started && (
        <InitialSettings
          onSave={setInitialSettings}
          onStart={() => setStarted(true)}
        />
      )}
      {started && (
        <Box
          sx={{
            minHeight: "100vh",
            px: 4,
            py: 10,
            background: "linear-gradient(180deg, #f5f5f7 0%, #ececf1 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 1100 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Card
                sx={{
                  borderRadius: "24px",
                  px: 5,
                  py: 5,

                  backdropFilter: "blur(30px)",
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.6)",

                  boxShadow: `
                0 8px 24px rgba(0,0,0,0.04),
                0 20px 60px rgba(0,0,0,0.06)
              `,

                  transition: "all 0.35s cubic-bezier(.4,0,.2,1)",

                  "&:hover": {
                    boxShadow: `
                  0 12px 30px rgba(0,0,0,0.06),
                  0 25px 70px rgba(0,0,0,0.08)
                `,
                  },
                }}
              >
                <PianoRoll
                  composition={composition}
                  onCompositionChange={setComposition}
                  onAiRequest={handleAiRequest}
                  chordProgression={composition.harmony}
                />

                <Box
                  sx={{
                    mt: 5,
                    pt: 4,
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <Button
                      onClick={() => setSaveModalOpen(true)}
                      sx={{
                        px: 3.5,
                        py: 1,
                        borderRadius: "999px",
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.85rem",
                        letterSpacing: "0.3px",

                        background: "#1d1d1f",
                        color: "#fff",

                        boxShadow: `
                      0 4px 12px rgba(0,0,0,0.15),
                      0 1px 2px rgba(0,0,0,0.2)
                    `,

                        transition: "all 0.25s ease",

                        "&:hover": {
                          background: "#111111",
                          boxShadow: `
                        0 8px 20px rgba(0,0,0,0.2),
                        0 2px 6px rgba(0,0,0,0.25)
                      `,
                        },
                      }}
                    >
                      Save Composition
                    </Button>
                  </motion.div>
                </Box>
              </Card>
              {saveModalOpen && (
                <SaveProjectModal
                  open={saveModalOpen}
                  onClose={() => setSaveModalOpen(false)}
                  onSave={handleSaveProject}
                />
              )}
            </motion.div>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ProducePage;
