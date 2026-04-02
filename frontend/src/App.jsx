import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HeaderPage from "./pages/headerPage/headerPage";
import MainPage from "./pages/mainPage/mainPage";
import ProfilePage from "./pages/profilePage/profilePage";
import ProducePage from "./pages/producePage/producePage";
import PlayPage from "./pages/playPage/playPage";
import ProjectsPage from "./pages/projectsPage/projectsPage";
import LoginPage from "./pages/loginPage/loginPage";
import { AuthProvider } from "./context/authContext";
import AuthApp from "./AuthApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OpenProjectPage from "./pages/openProjectPage/openProjectPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={<AuthApp />}>
              <Route index element={<Navigate to="home" replace />} />

              <Route path="home" element={<HeaderPage />}>
                <Route index element={<MainPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="produce" element={<ProducePage />} />
                <Route path="play" element={<PlayPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:id" element={<OpenProjectPage />} />
                <Route path="*" element={<MainPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
