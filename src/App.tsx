import React from "react";
import { Header } from "./components/Header";
import { Flags } from "./pages/Flags";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FlagDetail } from "./pages/FlagDetail";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="bg-cream h-fit min-h-screen text-black_text dark:text-white dark:bg-black">
        <Header />
        <Routes>
          <Route path="/" element={<Flags />} />
          <Route path="/detail/:name" element={<FlagDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
