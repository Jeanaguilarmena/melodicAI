import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function SaveProjectModal({ open, onClose, onSave }) {
  const [name, setName] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [open]);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name);
    setName("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          backdropFilter: "blur(28px)",
          background: "rgba(0,0,0,0.14)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.94, y: 20, filter: "blur(6px)" }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Card
            sx={{
              width: 430,
              px: 5,
              py: 4,

              borderRadius: "34px",

              background: "#ffffff",

              border: "1px solid rgba(0,0,0,0.04)",

              boxShadow: `
                0 10px 30px rgba(0,0,0,0.06),
                0 40px 100px rgba(0,0,0,0.12)
              `,

              display: "flex",
              flexDirection: "column",
              gap: 3.2,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.3rem",
                fontWeight: 600,
                letterSpacing: "-0.35px",
                color: "#1d1d1f",
              }}
            >
              Save Composition
            </Typography>

            <TextField
              inputRef={inputRef}
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleEnter}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "18px",

                  background: "#f5f5f7",

                  fontSize: "0.95rem",

                  transition: "all 0.28s cubic-bezier(.4,0,.2,1)",

                  "& fieldset": {
                    border: "1px solid transparent",
                  },

                  "&:hover": {
                    background: "#f1f1f4",
                  },

                  "&.Mui-focused": {
                    background: "#ffffff",

                    boxShadow: "0 0 0 4px rgba(0,0,0,0.06)",

                    "& fieldset": {
                      borderColor: "rgba(0,0,0,0.08)",
                    },
                  },
                },

                "& input::placeholder": {
                  color: "#8e8e93",
                  opacity: 1,
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1.6,
                mt: 1,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  onClick={onClose}
                  sx={{
                    textTransform: "none",

                    borderRadius: "999px",

                    px: 3,
                    py: 0.9,

                    fontSize: "0.9rem",

                    color: "#1d1d1f",

                    background: "#f5f5f7",

                    transition: "all 0.25s ease",

                    "&:hover": {
                      background: "#ebebef",
                    },
                  }}
                >
                  Cancel
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <Button
                  onClick={handleSave}
                  sx={{
                    textTransform: "none",

                    borderRadius: "999px",

                    px: 3.4,
                    py: 0.9,

                    fontSize: "0.9rem",
                    fontWeight: 500,

                    background: "#1d1d1f",
                    color: "#ffffff",

                    boxShadow: `
                      0 6px 18px rgba(0,0,0,0.18),
                      0 2px 4px rgba(0,0,0,0.25)
                    `,

                    transition: "all 0.25s ease",

                    "&:hover": {
                      background: "#111",

                      boxShadow: `
                        0 12px 28px rgba(0,0,0,0.22),
                        0 4px 10px rgba(0,0,0,0.25)
                      `,
                    },
                  }}
                >
                  Save
                </Button>
              </motion.div>
            </Box>
          </Card>
        </motion.div>
      </Box>
    </Modal>
  );
}

export default SaveProjectModal;
