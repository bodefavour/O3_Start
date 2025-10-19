import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MacbookPro } from "./screens/MacbookPro";
import { RegisterBusiness } from "./screens/RegisterBusiness";
import { VerifyBusiness } from "./screens/VerifyBusiness";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MacbookPro />} />
        <Route path="/register" element={<RegisterBusiness />} />
        <Route path="/verify" element={<VerifyBusiness />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
