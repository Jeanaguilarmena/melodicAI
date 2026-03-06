import { Box, Button, Card } from "@mui/material";
import React, { useState } from "react";
import PianoRoll from "../../components/pianoRoll/pianoRoll";
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
        name: "Em",
        start: 0,
        bass: { pitch: 4, length: 16 }, // E2 aprox
        chord: [
          { pitch: 16, length: 16 },
          { pitch: 19, length: 16 }, // G +12
          { pitch: 23, length: 16 }, // B +12
        ],
      },
      {
        name: "G",
        start: 16,
        bass: { pitch: 7, length: 16 },
        chord: [
          { pitch: 19, length: 16 },
          { pitch: 23, length: 16 }, // B +12
          { pitch: 26, length: 16 }, // D +12
        ],
      },
      {
        name: "D",
        start: 32,
        bass: { pitch: 2, length: 16 },
        chord: [
          { pitch: 14, length: 16 },
          { pitch: 18, length: 16 }, // F# +12
          { pitch: 21, length: 16 }, // A +12
        ],
      },
      {
        name: "A",
        start: 48,
        bass: { pitch: 9, length: 16 },
        chord: [
          { pitch: 21, length: 16 },
          { pitch: 25, length: 16 }, // C# +12
          { pitch: 28, length: 16 }, // E +12
        ],
      },
      {
        name: "Em",
        start: 64,
        bass: { pitch: 4, length: 16 }, // E2 aprox
        chord: [
          { pitch: 16, length: 16 },
          { pitch: 19, length: 16 }, // G +12
          { pitch: 23, length: 16 }, // B +12
        ],
      },
      {
        name: "G",
        start: 80,
        bass: { pitch: 7, length: 16 },
        chord: [
          { pitch: 19, length: 16 },
          { pitch: 23, length: 16 }, // B +12
          { pitch: 26, length: 16 }, // D +12
        ],
      },
      {
        name: "D",
        start: 96,
        bass: { pitch: 2, length: 16 },
        chord: [
          { pitch: 14, length: 16 },
          { pitch: 18, length: 16 }, // F# +12
          { pitch: 21, length: 16 }, // A +12
        ],
      },
      {
        name: "A",
        start: 112,
        bass: { pitch: 9, length: 16 },
        chord: [
          { pitch: 21, length: 16 },
          { pitch: 25, length: 16 }, // C# +12
          { pitch: 28, length: 16 }, // E +12
        ],
      },
    ],
    melody: {
      ai: [
        // Em (E G B)
        { pitch: 31, start: 0, length: 8 }, // B
        { pitch: 28, start: 8, length: 8 }, // G

        // G (G B D)
        { pitch: 31, start: 16, length: 8 }, // B
        { pitch: 33, start: 24, length: 8 }, // D

        // D (D F# A)
        { pitch: 33, start: 32, length: 8 }, // D
        { pitch: 30, start: 40, length: 8 }, // A

        // A (A C# E)
        { pitch: 30, start: 48, length: 8 }, // A
        { pitch: 28, start: 56, length: 8 }, // E

        // Repetición tipo Alan Walker (motivo repetido)
        // Em
        { pitch: 31, start: 64, length: 8 },
        { pitch: 28, start: 72, length: 8 },

        // G
        { pitch: 31, start: 80, length: 8 },
        { pitch: 33, start: 88, length: 8 },

        // D
        { pitch: 33, start: 96, length: 8 },
        { pitch: 30, start: 104, length: 8 },

        // A resolución emocional
        { pitch: 30, start: 112, length: 4 },
        { pitch: 28, start: 116, length: 4 },
        { pitch: 31, start: 120, length: 8 },
      ],
      user: [],
    },
  });

  const handleAiRequest = (payload) => {
    console.log("🔥 AI REQUEST RECEIVED →", payload);

    const { userNotes, aiContext, cutTime } = payload;

    const regenerated = [
      { pitch: 30, start: cutTime, length: 4 },
      { pitch: 31, start: cutTime + 4, length: 4 },
    ];

    setComposition((prev) => ({
      ...prev,
      melody: {
        ai: [...aiContext, ...regenerated],
        user: userNotes,
      },
    }));
  };

  async function handleSaveProject(projectName) {
    const token = await user.getIdToken();

    const payload = {
      name: projectName,
      composition,
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
            {/* Piano Roll */}
            <PianoRoll
              composition={composition}
              onCompositionChange={setComposition}
              onAiRequest={handleAiRequest}
            />

            {/* Subtle Divider */}
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
  );
}

export default ProducePage;
