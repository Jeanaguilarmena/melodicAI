import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Box, Typography } from "@mui/material";

function RequireAuth({ children }) {
  const { loading, authed } = useAuth();
  const location = useLocation();

  return (
    <Box>
      {loading && <Typography>Loading...</Typography>}
      {authed && !loading && children}
      {!authed && !loading && (
        <Navigate to={"/login"} replace state={{ path: location.pathname }} />
      )}
    </Box>
  );
}

export default RequireAuth;
