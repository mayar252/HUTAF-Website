import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import VirtualReferee from "./pages/features/VirtualReferee";
import VirtualFan from "./pages/features/VirtualFan";
import GhostSeats from "./pages/features/GhostSeats";
import Analysis from "./pages/features/Analysis";
import NotFound from "./pages/NotFound";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="virtual-referee" element={<VirtualReferee />} />
          <Route path="virtual-fan" element={<VirtualFan />} />
          <Route path="guess-the-winner" element={<GhostSeats />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
