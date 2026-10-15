import { useState, useContext } from "react";
import { ChamadosContext } from "../context/ChamadosContext";

export default function ChamadoForm() {
  const contexto = useContext(ChamadosContext);

  if (!contexto) {
    throw new Error("ChamadoForm precisa estar dentro do ChamadosProvider.");
  }

  const { handleAddChamado } = contexto;

  // ... o resto do seu código (useState do form, handleChange) continua igual!
  
  const [form, setForm] = useState({ title: "", sector: "" });
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();
    const sector = form.sector.trim();
    if (!title || !sector) {
      setError("Preencha o assunto e o setor.");
      return;
    }
    // Se passou pela validação, enviamos o objeto montado para a função do contexto
    handleAddChamado({
      id: crypto.randomUUID(),
      title: title,
      sector: sector,
      resolved: false,
    });
    setForm({ title: "", sector: "" });
    setError("");
  }

  
  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Assunto</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} />
      </div>
      <div className="field">
        <label htmlFor="sector">Setor</label>
        <input id="sector" name="sector" value={form.sector} onChange={handleChange} />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit">Cadastrar chamado</button>
    </form>
  );
}
