import { useContext } from "react";
import { Routes, Route, NavLink } from "react-router"; // Importando as ferramentas do roteador
import "./App.css";

// Importando as nossas páginas
import FilaPage from "./pages/FilaPage";
import SobrePage from "./pages/SobrePage";
import NaoEncontradaPage from "./pages/NaoEncontradaPage";
import NovoChamadoPage from "./pages/NovoChamadoPage"; // Criaremos no próximo passo!

import { ChamadosContext } from "./context/ChamadosContext";

export default function App() {
  const contexto = useContext(ChamadosContext);

  if (!contexto) {
    throw new Error("O App precisa estar dentro do ChamadosProvider.");
  }

  const { chamados, resolvidosCount } = contexto;

  return (
    <main className="app">
      {/* O Cabeçalho (Fica fixo em todas as páginas) */}
      <header className="hero">
        <p className="eyebrow">ITEAM · SUPORTE</p>
        <h1>Fila de Atendimento</h1>
        <p>Organize os chamados recebidos pelos setores.</p>
        <p>{resolvidosCount} de {chamados.length} chamados resolvidos.</p>
        
        {/* Nosso Menu de Navegação */}
        <nav style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          {/* A prop 'end' garante que a home só fique ativa se for exatamente "/" */}
          <NavLink to="/" end>Fila</NavLink>
          <NavLink to="/novo">Novo chamado</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
      </header>

      {/* A Área Dinâmica (Aqui é onde a página troca sem dar F5!) */}
      <Routes>
        <Route path="/" element={<FilaPage />} />
        <Route path="/novo" element={<NovoChamadoPage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="*" element={<NaoEncontradaPage />} /> {/* O asterisco pega qualquer URL errada */}
      </Routes>
    </main>
  );
}