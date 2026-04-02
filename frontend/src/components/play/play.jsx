import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const softGradient =
  "radial-gradient(circle at 20% 20%, #e0e7ff, transparent), radial-gradient(circle at 80% 0%, #fce7f3, transparent)";

function GlassCard({ children, onClick }) {
  return (
    <MotionCard
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      onClick={onClick}
      sx={{
        p: 5,
        borderRadius: "32px",
        cursor: onClick ? "pointer" : "default",
        background: "#ffffff",
        boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
        border: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </MotionCard>
  );
}

const appleInput = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    background: "#f5f5f7",
    "& fieldset": { border: "none" },
    "&:hover": { background: "#ededf0" },
    "&.Mui-focused": {
      background: "#ffffff",
      boxShadow: "0 0 0 2px rgba(0,0,0,0.05)",
    },
  },
};

const appleBackButton = {
  borderRadius: "999px",
  background: "#f5f5f7",
  color: "#000",
  textTransform: "none",
  px: 2.5,
  py: 0.8,
  fontSize: "0.9rem",
  minWidth: "auto",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  "&:hover": {
    background: "#ededf0",
  },
};
const appleButton = {
  borderRadius: "999px",
  background: "#000",
  color: "#fff",
  textTransform: "none",
  px: 4,
  py: 1.4,
  fontWeight: 500,
  "&:hover": {
    background: "#111",
  },
};

function HeroCard() {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      sx={{ mb: 8 }}
    >
      <Box
        sx={{
          height: 260,
          borderRadius: "36px",
          background: `${softGradient}, url(https://images.unsplash.com/photo-1511379938547-c1f69419868d) center/cover`,
          boxShadow: "0 40px 100px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "flex-end",
          p: 5,
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight={700} color="#fff">
            Music Lab
          </Typography>
          <Typography color="rgba(255,255,255,0.8)">
            Create, explore and transform sound
          </Typography>
        </Box>
      </Box>
    </MotionBox>
  );
}

function Home({ onSelect }) {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      sx={{ minHeight: "100vh", px: 6, py: 10, background: "#fff" }}
    >
      <Box maxWidth="1100px" mx="auto">
        <HeroCard />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <GlassCard onClick={() => onSelect("chords")}>
              <Typography variant="h5" fontWeight={600}>
                Chord Intelligence
              </Typography>
              <Typography mt={1} color="text.secondary">
                Discover songs from your progression
              </Typography>
            </GlassCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <GlassCard onClick={() => onSelect("audio")}>
              <Typography variant="h5" fontWeight={600}>
                Audio Separation
              </Typography>
              <Typography mt={1} color="text.secondary">
                Remove vocals and instruments
              </Typography>
            </GlassCard>
          </Grid>
        </Grid>
      </Box>
    </MotionBox>
  );
}

function ChordTool({ onBack }) {
  const [progression, setProgression] = useState("");
  const [style, setStyle] = useState("");
  const [results, setResults] = useState([]);

  const mockResults = () => {
    setResults([
      "Let It Be — The Beatles",
      "With or Without You — U2",
      "No Woman No Cry — Bob Marley",
    ]);
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{ minHeight: "100vh", p: 6, background: "#fff" }}
    >
      <Button onClick={onBack} sx={{ ...appleBackButton, mb: 5 }}>
        <span style={{ fontSize: "14px" }}>←</span>
        Back
      </Button>

      <Stack spacing={6} maxWidth="700px" mx="auto">
        <Typography variant="h4" fontWeight={700}>
          Chord Intelligence
        </Typography>

        <GlassCard>
          <Stack spacing={3}>
            <TextField
              fullWidth
              placeholder="C — G — Am — F"
              value={progression}
              onChange={(e) => setProgression(e.target.value)}
              sx={appleInput}
            />

            <TextField
              fullWidth
              placeholder="Style (Pop, Jazz...)"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              sx={appleInput}
            />

            <Button onClick={mockResults} sx={appleButton}>
              Analyze
            </Button>
          </Stack>
        </GlassCard>

        {results.length > 0 && (
          <GlassCard>
            <Typography fontWeight={600} mb={2}>
              Suggestions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1}>
              {results.map((song, i) => (
                <Typography key={i}>{song}</Typography>
              ))}
            </Stack>
          </GlassCard>
        )}
      </Stack>
    </MotionBox>
  );
}

function AudioTool({ onBack }) {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(null);

  const mockProcess = () => {
    setOutput("Vocals removed successfully (mock)");
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{ minHeight: "100vh", p: 6, background: "#fff" }}
    >
      <Button onClick={onBack} sx={{ ...appleBackButton, mb: 5 }}>
        <span style={{ fontSize: "14px" }}>←</span>
        Back
      </Button>

      <Stack spacing={6} maxWidth="700px" mx="auto">
        <Typography variant="h4" fontWeight={700}>
          Audio Separation
        </Typography>

        <GlassCard>
          <Stack spacing={3}>
            <Button component="label" sx={appleButton}>
              Upload Audio
              <input
                hidden
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>

            {file && <Typography>{file.name}</Typography>}

            <Stack direction="row" spacing={2}>
              <Chip label="Vocals" />
              <Chip label="Drums" />
              <Chip label="Bass" />
            </Stack>

            <Button onClick={mockProcess} sx={appleButton}>
              Process
            </Button>

            {output && <Typography>{output}</Typography>}
          </Stack>
        </GlassCard>
      </Stack>
    </MotionBox>
  );
}

export default function Play() {
  const [view, setView] = useState("home");

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {view === "home" && <Home onSelect={setView} />}
      {view === "chords" && <ChordTool onBack={() => setView("home")} />}
      {view === "audio" && <AudioTool onBack={() => setView("home")} />}
    </MotionBox>
  );
}
