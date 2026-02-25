import { Box, Card, Typography } from "@mui/material";
import React from "react";

function ProducePage() {
  return (
    <Box>
      <Card
        sx={{
          margin: "20px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: 4,
        }}
      >
        <Typography>This is the produce page</Typography>
      </Card>
    </Box>
  );
}

export default ProducePage;
