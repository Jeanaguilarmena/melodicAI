import { Box, Button, Card } from "@mui/material";
import React from "react";
import PianoRoll from "../pianoRoll/pianoRoll";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function OpenProject() {
  const location = useLocation();
  const project = location.state?.project;

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
              composition={project}
              onCompositionChange=""
              onAiRequest=""
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
        </motion.div>
      </Box>
    </Box>
  );
}

export default OpenProject;
