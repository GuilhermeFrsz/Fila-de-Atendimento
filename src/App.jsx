import { useState, useEffect } from "react"; 
import { initialTickets } from "./data/chamados";
import "./App.css";
import ChamadoList from "./components/ChamadoList";
import ChamadoForm from "./components/ChamadoForm";
import Panel from "./components/Panel";

// Chave que a atividade exige para o localStorage
const STORAGE_KEY = "iteam:fila-atendimento";


function loadChamados() {
  const savedChamados = localStorage.getItem(STORAGE_KEY);
  
  // Se não tem nada salvo, retorna os dados da aula
  if (!savedChamados) return initialTickets;
   
  try {
    const parsedChamados = JSON.parse(savedChamados);
    // Verifica se o que foi lido realmente é um array
    return Array.isArray(parsedChamados) ? parsedChamados : initialTickets;
  } catch {
    // Se o JSON estiver quebrado (ex: "{oops"), cai aqui sem travar a tela
    return initialTickets;
  }
}

export default function App() {
  // 3. Inicialização preguiçosa: passamos o nome da função (sem os parênteses)
  const [chamados, setChamados] = useState(loadChamados);
  
  const resolvidosCount = chamados.filter((chamado) => chamado.resolved).length;

  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chamados));
  }, [chamados]); // Dependência: só roda quando 'chamados' mudar

  
  useEffect(() => {
    // Guarda o título original
    const previousTitle = document.title;
    
    // Atualiza o título com a contagem exigida
    document.title = `${resolvidosCount}/${chamados.length} chamados resolvidos`;

    // Função de limpeza (cleanup) que a atividade pede
    return () => {
      document.title = previousTitle;
    };
  }, [resolvidosCount, chamados.length]); // Dependências exigidas para este cálculo

  function handleToggle(id) {
    setChamados((currentChamados) =>
      currentChamados.map((chamado) =>
        chamado.id === id ? { ...chamado, resolved: !chamado.resolved } : chamado
      )
    );
  }

  function handleDelete(id) {
    setChamados((currentChamados) =>
      currentChamados.filter((chamado) => chamado.id !== id)
    );
  }

  function handleAddChamado(newChamado) {
    setChamados((currentChamados) => [...currentChamados, newChamado]);
  }

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">ITEAM · SUPORTE</p>
        <h1>Fila de Atendimento</h1>
        <p>Organize os chamados recebidos pelos setores.</p>
      </header>

      <Panel title="Resumo">
        <p>{resolvidosCount} de {chamados.length} chamados resolvidos.</p>
      </Panel>

      <Panel title="Novo Chamado">
        <ChamadoForm onAddChamado={handleAddChamado} />
      </Panel>

      <Panel title="Chamados">
        <ChamadoList
          chamados={chamados}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </Panel>
    </main>
  );
}