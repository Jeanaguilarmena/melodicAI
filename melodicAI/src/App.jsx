import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderPage from "./pages/headerPage/headerPage";
import MainPage from "./pages/mainPage/mainPage";
import ProfilePage from "./pages/profilePage/profilePage";
import ProducePage from "./pages/producePage/producePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderPage />}>
          <Route index element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/produce" element={<ProducePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
