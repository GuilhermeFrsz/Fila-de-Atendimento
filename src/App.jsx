import { useState } from "react";
import "./App.css";
import ChamadoList from "./ChamadoList";
import Panel from "./Panel"
import { initialTickets } from "./data/chamados";


export default function App() {
  const [chamados,setChamados] = useState(initialTickets);

  const resolvidosCount = chamados.filter((chamado) => chamado.resolved).length;

  function handleToggle(id) {
    setChamados((currentChamados) =>
      currentChamados.map((chamado) =>
        chamado.id === id
          ? { ...chamado, resolved: !chamado.resolved } // Inverte o status
          : chamado
      )
    );
  }

    function handleDelete(id){
      setChamados((currentChamados) =>
        // .filter() para remover um item, criando sempre um novo array
        currentChamados.filter((chamado) => chamado.id != id));
    }



  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">ITEAM · SUPORTE</p>
        <h1>Fila de Atendimento</h1>
        <p>Organize os chamados recebidos pelos setores.</p>
        <p>{resolvidosCount} de {chamados.length} chamados resolvidos.</p>
      </header>

      <section className="panel">
        <div className="panel-header">
          <h2>Chamados</h2>
        </div>

        <div className="panel-content">
          <div className="ticket-list">
            <Panel>
              <ChamadoList
                chamados={chamados}
                onToggle={handleToggle}
                onDelete={handleDelete} />
            </Panel>
          </div>
      </div>
    </section>
    </main >
  );
}
