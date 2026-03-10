import React from "react";
import { Box, Card, Typography } from "@mui/material";
import Projects from "../../components/projects/projects";
import artistPhoto from "../../assets/profilePhoto.png";
import { fetchUserProjects } from "../../api/user.api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";

function ProjectsPage() {
  const { user } = useAuth();

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects", user?.uid],
    queryFn: () => fetchUserProjects(user),
    enabled: !!user,
  });
  const projects1 = [
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

  if (isLoading || isLoading) {
    return <Box sx={{ p: 4 }}>👤 Loading profile...</Box>;
  }

  if (isError || isError) {
    return <Box sx={{ p: 4, color: "red" }}>Error loading profile</Box>;
  }
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
        <Projects
          key={project.id}
          photo={artistPhoto}
          name={project.name}
          description={project.description}
          artist={project.artist}
          style={project.genre}
          bpm={project.bpm}
          keyNote={project.scale}
        />
      ))}
    </Box>
  );
}

export default ProjectsPage;
