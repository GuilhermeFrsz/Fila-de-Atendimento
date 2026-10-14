export default function ChamadoCard({ id, title, sector, resolved, onToggle, onDelete }) {
  return (
    <article className="ticket-card">
      <div>
        <h2>{title}</h2>
        <p>Setor: {sector}</p>
      </div>
      {/* RENDEREIZAÇÃO CONDICIONAL SIMPLES */} 
      <span className={`badge ${resolved ? "badge-resolved" : "badge-open"}`}>
        {resolved ? "Resolvido" : "Aberto"}</span>

      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <button type="button" onClick={() => onToggle(id)}>
          {resolved ? "Reabrir" : "Resolver"}
        </button>

        <button type="button" onClick={() => onDelete(id)}>
          Excluir</button>
      </div>
    </article>

  )
}