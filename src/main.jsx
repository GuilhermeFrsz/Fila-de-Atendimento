import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router"; // <-- Importa o GPS
import "./index.css";
import App from "./App";
import { ChamadosProvider } from "./context/ChamadosContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>  {/* <-- O GPS abraça toda a aplicação */}
      <ChamadosProvider>
        <App />
      </ChamadosProvider>
    </BrowserRouter>
  </StrictMode>
);