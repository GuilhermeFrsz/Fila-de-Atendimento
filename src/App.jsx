import { useContext } from "react";
import "./App.css";
import ChamadoList from "./components/ChamadoList";
import ChamadoForm from "./components/ChamadoForm";
import Panel from "./components/Panel";
import { ChamadosContext } from "./context/ChamadosContext"; // Importe o contexto

export default function App() {
  // Conecta ao contexto
  const contexto = useContext(ChamadosContext);

  // Validação exigida pela apostila e pela atividade
  if (!contexto) {
    throw new Error("O App precisa estar dentro do ChamadosProvider.");
  }

  // Extrai apenas o que o App precisa usar no cabeçalho
  const { chamados, resolvidosCount } = contexto;

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">ITEAM · SUPORTE</p>
        <h1>Fila de Atendimento</h1>
        <p>Organize os chamados recebidos pelos setores.</p>
        <p>{resolvidosCount} de {chamados.length} chamados resolvidos.</p>
      </header>

      <Panel title="Novo Chamado">
        {/* Olha que limpo! Não passamos mais props */}
        <ChamadoForm />
      </Panel>

      <Panel title="Chamados">
        {/* Não passamos mais props */}
        <ChamadoList />
      </Panel>
    </main>
  );
}