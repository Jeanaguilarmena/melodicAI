import {
  Box,
  Button,
  Card,
  Modal,
  TextField,
  Typography,
  Fade,
  Backdrop,
} from "@mui/material";
import React, { useState } from "react";

function EditProfileModal({ open, onClose, onSave, profile }) {
  const [artisticName, setArtisticName] = useState(profile.artisticName);
  const [occupation, setOccupation] = useState(profile.occupation);
  const [country, setCountry] = useState(profile.country);
  const [primaryGenre, setPrimaryGenre] = useState(profile.primaryGenre);
  const [secondaryGenre, setSecondaryGenre] = useState(profile.secondaryGenre);
  const [instrument, setInstrument] = useState(profile.instrument);

  function handleSave() {
    onSave(
      artisticName,
      occupation,
      country,
      primaryGenre,
      secondaryGenre,
      instrument
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 400,
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.25)",
          },
        },
      }}
    >
      <Fade in={open} timeout={400}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(1)",
            width: 420,
            outline: "none",
          }}
        >
          <Card
            sx={{
              p: 5,
              borderRadius: "24px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)",
              backdropFilter: "blur(20px)",
              background: "rgba(255,255,255,0.9)",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              transition: "all 0.3s ease",
            }}
          >
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.3px",
              }}
            >
              Edit profile
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                value={artisticName}
                placeholder="Artistic Name"
                onChange={(e) => setArtisticName(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: "#f7f7f7",
                    transition: "all 0.2s ease",
                  },
                  "&:hover .MuiOutlinedInput-root": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              />

              <TextField
                value={occupation}
                placeholder="Occupation"
                onChange={(e) => setOccupation(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: "#f7f7f7",
                  },
                  "&:hover .MuiOutlinedInput-root": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              />

              <TextField
                value={country}
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: "#f7f7f7",
                  },
                  "&:hover .MuiOutlinedInput-root": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              />
              <TextField
                value={primaryGenre}
                placeholder="Primary Genre"
                onChange={(e) => setPrimaryGenre(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: "#f7f7f7",
                  },
                  "&:hover .MuiOutlinedInput-root": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              />
              <TextField
                value={secondaryGenre}
                placeholder="Secondary Genre"
                onChange={(e) => setSecondaryGenre(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: "#f7f7f7",
                  },
                  "&:hover .MuiOutlinedInput-root": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              />
              <TextField
                value={instrument}
                placeholder="Instrument"
                onChange={(e) => setInstrument(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: "#f7f7f7",
                  },
                  "&:hover .MuiOutlinedInput-root": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1.5,
                mt: 1,
              }}
            >
              <Button
                onClick={onClose}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "12px",
                  px: 2.5,
                  color: "#555",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "12px",
                  px: 3,
                  backgroundColor: "#000",
                  color: "#fff",
                  transition: "all 0.25s ease",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: "#111",
                    transform: "translateY(-1px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                  },
                }}
              >
                Save
              </Button>
            </Box>
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditProfileModal;
