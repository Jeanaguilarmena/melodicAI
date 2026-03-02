import React from "react";
import { Box, Card, Typography } from "@mui/material";
import Projects from "../../components/projects/projects";
import artistPhoto from "../../assets/profilePhoto.png";

function ProjectsPage() {
  const projects = [
    {
      photo: artistPhoto,
      name: "Sunshine",
      artist: "Jeannatar",
      style: "Pop",
      bpm: 128,
      keyNote: "C Minor",
      description:
        "An upbeat pop track with catchy melodies and vibrant energy, perfect for sunny days and good vibes.",
      projectId: "1",
    },
    {
      photo: artistPhoto,
      name: "Midnight Groove",
      artist: "Jeannatar",
      style: "R&B",
      bpm: 90,
      keyNote: "A Minor",
      description:
        "A smooth R&B track with sultry vocals and a laid-back groove, ideal for late-night listening and romantic vibes.",
      projectId: "2",
    },
    {
      photo: artistPhoto,
      name: "Electric Dreams",
      artist: "Jeannatar",
      style: "Electronic",
      bpm: 120,
      keyNote: "F Major",
      description:
        "An energetic electronic track with pulsating beats and futuristic synths, perfect for dance floors and late-night parties.",
      projectId: "3",
    },
  ];
  return (
    <Box
      sx={{
        marginTop: "80px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 4,
      }}
    >
      {projects.map((project) => (
        <Projects key={project.id} {...project} />
      ))}
    </Box>
  );
}

export default ProjectsPage;
