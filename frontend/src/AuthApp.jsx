import React from "react";
import RequireAuth from "./components/auth/requireauth";
import { Outlet } from "react-router-dom";

function AuthApp() {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
}

export default AuthApp;
