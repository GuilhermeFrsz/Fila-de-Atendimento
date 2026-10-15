import { useContext } from "react";
import { ChamadosContext } from "../context/ChamadosContext"; // Importe o contexto
import ChamadoCard from "./ChamadoCard";

// Remova as props da assinatura da função: () em vez de ({ chamados, ... })
export default function ChamadoList() {
  const contexto = useContext(ChamadosContext);

  if (!contexto) {
    throw new Error("ChamadoList precisa estar dentro do ChamadosProvider.");
  }

  // Puxa as variáveis e funções direto da nossa "tomada" global
  const { chamados, handleToggle, handleDelete } = contexto;

  if (chamados.length === 0) {
    return <p>Nenhum chamado cadastrado.</p>;
  }

  return (
    <div className="ticket-list" aria-label="Chamados de hoje">
      {chamados.map((chamado) => (
        <ChamadoCard
          key={chamado.id}
          id={chamado.id}
          title={chamado.title}
          sector={chamado.sector}
          resolved={chamado.resolved}
          // O ChamadoCard CONTINUA recebendo props normalmente
          onToggle={handleToggle} 
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}