import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; 
import App from "./App";
import { ChamadosProvider } from "./context/ChamadosContext"; // 1. Importe o Provider que você criou!

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 2. Envolva o App com o Provider */}
    <ChamadosProvider>
      <App />
    </ChamadosProvider>
  </StrictMode>
);