import React from "react";
import { Box } from "@mui/material";
import Login from "../../components/login/login";

function LoginPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at 30% 30%, #f5f5f7, #e8e8ed 60%, #dcdce3)",
      }}
    >
      <Login />
    </Box>
  );
}

export default LoginPage;
