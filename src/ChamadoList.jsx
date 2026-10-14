import ChamadoCard from "./ChamadoCard";

export default function ChamadoList({ chamados, onToggle, onDelete }) {
  if (chamados.length === 0) {
    return <p>Nenhum chamado cadastrado.</p>;
  }

  return (
    <section className="ticket-card" aria-label="Chamados de hoje">
      {chamados.map((chamado) => (
        <ChamadoCard
          key={chamado.id}
          id={chamado.id}
          title={chamado.title}
          sector={chamado.sector}
          resolved={chamado.resolved}
          onToggle={onToggle}
          onDelete={onDelete} 
  
        // {...chamado} é usado para resumir tudo que fiz acima.
        />
      ))}
    </section>
  );
}


