import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderPage from "./pages/headerPage/headerPage";
import MainPage from "./pages/mainPage/mainPage";
import ProfilePage from "./pages/profilePage/profilePage";
import ProducePage from "./pages/producePage/producePage";
import PlayPage from "./pages/playPage/playPage";
import ProjectsPage from "./pages/projectsPage/projectsPage";
import LoginPage from "./pages/loginPage/loginPage";
import { AuthProvider } from "./context/authContext";
import AuthApp from "./AuthApp";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<AuthApp />}>
            <Route path="home" element={<HeaderPage />}>
              <Route index element={<MainPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="produce" element={<ProducePage />} />
              <Route path="play" element={<PlayPage />} />
              <Route path="projects" element={<ProjectsPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
