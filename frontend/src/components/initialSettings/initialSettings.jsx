import { Box, Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion";

function InitialSettings({ onSave, onStart }) {
  const [description, setDescription] = useState("");
  const [chordProgression, setChordProgression] = useState({
    firstChord: "",
    secondChord: "",
    thirdChord: "",
    fourthChord: "",
    fifthChord: "",
    sixthChord: "",
    seventhChord: "",
    eighthChord: "",
  });

  const handleChordChange = (key, value) => {
    setChordProgression((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleStart = () => {
    onSave({
      description,
      chordProgression,
    });
    onStart();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#f5f5f7 0%,#ececf1 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card
          sx={{
            width: 520,
            borderRadius: "32px",
            px: 6,
            py: 6,
            backdropFilter: "blur(30px)",
            background: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: `
              0 8px 25px rgba(0,0,0,0.04),
              0 25px 70px rgba(0,0,0,0.08)
            `,
            transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
          }}
        >
          {/* Title */}
          <Typography
            sx={{
              fontSize: "1.9rem",
              fontWeight: 600,
              letterSpacing: "-0.5px",
              mb: 1,
              color: "#1d1d1f",
            }}
          >
            Musical context
          </Typography>

          <Typography
            sx={{
              color: "#6e6e73",
              fontSize: "0.95rem",
              mb: 4,
            }}
          >
            Configure the musical context before starting your composition.
          </Typography>

          {/* Description */}
          <Box sx={{ mb: 3 }}>
            <TextField
              value={description}
              placeholder="Describe the vibe (e.g. emotional piano melody)"
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  backgroundColor: "#f7f7f7",
                  fontSize: "0.9rem",
                  transition: "all 0.25s ease",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-root": {
                  backgroundColor: "#f1f1f3",
                },
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#6e6e73",
              mb: 1.5,
            }}
          >
            Chord progression
          </Typography>

          <Box
            sx={{
              p: 2.5,
              borderRadius: "22px",
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0,0,0,0.04)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 2,
              }}
            >
              {[
                "firstChord",
                "secondChord",
                "thirdChord",
                "fourthChord",
                "fifthChord",
                "sixthChord",
                "seventhChord",
                "eighthChord",
              ].map((key, index) => (
                <motion.div
                  key={key}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.18 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 0.6,
                    }}
                  >
                    {/* Step indicator */}
                    <Box
                      sx={{
                        fontSize: "0.65rem",
                        color: "#9a9aa0",
                        fontWeight: 500,
                        letterSpacing: "0.4px",
                      }}
                    >
                      {index + 1}
                    </Box>

                    <TextField
                      value={chordProgression[key]}
                      placeholder="Em"
                      onChange={(e) => handleChordChange(key, e.target.value)}
                      inputProps={{
                        style: {
                          textAlign: "center",
                          fontWeight: 500,
                          fontSize: "0.95rem",
                        },
                      }}
                      sx={{
                        width: "100%",

                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          height: 42,
                          background: "#f7f7f7",

                          transition: "all .2s cubic-bezier(.4,0,.2,1)",

                          boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.8),
                  0 1px 2px rgba(0,0,0,0.03)
                `,
                        },

                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },

                        "&:hover .MuiOutlinedInput-root": {
                          background: "#f1f1f3",
                          boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.9),
                  0 4px 10px rgba(0,0,0,0.04)
                `,
                        },

                        "& .MuiOutlinedInput-root.Mui-focused": {
                          background: "#ffffff",
                          boxShadow: "0 0 0 2px rgba(0,0,0,0.06)",
                        },
                      }}
                    />
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>

          {/* Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Button
                onClick={handleStart}
                sx={{
                  textTransform: "none",
                  borderRadius: "999px",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  px: 4,
                  py: 1,
                  background: "#1d1d1f",
                  color: "#fff",
                  boxShadow: `
                    0 4px 12px rgba(0,0,0,0.15),
                    0 1px 2px rgba(0,0,0,0.2)
                  `,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    background: "#111",
                    boxShadow: `
                      0 8px 20px rgba(0,0,0,0.2),
                      0 2px 6px rgba(0,0,0,0.25)
                    `,
                  },
                }}
              >
                Start composing
              </Button>
            </motion.div>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
}

export default InitialSettings;
