import { createContext, useState, useEffect } from "react";
import { initialTickets } from "../data/chamados";

export const ChamadosContext = createContext(null);

// Cole aqui a sua função loadChamados() que estava no App.jsx
const STORAGE_KEY = "iteam:fila-atendimento"; // Chave que a atividade exige para o localStorage

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


export function ChamadosProvider({ children }) {
    // 1. Cole aqui o useState dos chamados
    const [chamados, setChamados] = useState(loadChamados);

    // 2. Cole o valor derivado (resolvidosCount)
    const resolvidosCount = chamados.filter((chamado) => chamado.resolved).length;

    // 3. Cole os dois useEffects (localStorage e title)
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


    // 4. Cole as funções handleToggle, handleDelete e handleAddChamado
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
    
    // O context deve expor tudo que os outros componentes vão precisar ler ou executar
    const value = {
        chamados,
        resolvidosCount,
        handleToggle,
        handleDelete,
        handleAddChamado
    };

    return (
        <ChamadosContext.Provider value={value}>
            {children}
        </ChamadosContext.Provider>
    );
}