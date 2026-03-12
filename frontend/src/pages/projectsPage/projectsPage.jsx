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
        <Projects key={project.id} photo={artistPhoto} project={project} />
      ))}
    </Box>
  );
}

export default ProjectsPage;
