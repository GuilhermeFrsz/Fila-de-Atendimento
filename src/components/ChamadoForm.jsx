import { useState, useContext } from "react";
import { Link } from "react-router"; // <-- Importe o Link
import { ChamadosContext } from "../context/ChamadosContext";

export default function ChamadoForm() {
  const contexto = useContext(ChamadosContext);
  if (!contexto) {
    throw new Error("ChamadoForm precisa estar dentro do ChamadosProvider.");
  }
  const { handleAddChamado } = contexto;

  const [form, setForm] = useState({ title: "", sector: "" });
  const [error, setError] = useState("");
  const [sucesso, setSucesso] = useState(false); // <-- Novo estado de sucesso!

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
    setSucesso(false); // Esconde a mensagem de sucesso se o usuário começar a digitar de novo
  }

  function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();
    const sector = form.sector.trim();

    if (!title || !sector) {
      setError("Preencha o assunto e o setor.");
      setSucesso(false);
      return;
    }

    handleAddChamado({
      id: crypto.randomUUID(),
      title: title,
      sector: sector,
      resolved: false,
    });

    setForm({ title: "", sector: "" });
    setError("");
    setSucesso(true); // <-- Ativa a mensagem de sucesso!
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Assunto</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ex.: Monitor não liga"
        />
      </div>

      <div className="field">
        <label htmlFor="sector">Setor</label>
        <input
          id="sector"
          name="sector"
          value={form.sector}
          onChange={handleChange}
          placeholder="Ex.: Tesouraria"
        />
      </div>

      {error && <p className="form-error">{error}</p>}
      
      {/* <-- AQUI ESTÁ A EXIGÊNCIA DA ATIVIDADE --> */}
      {sucesso && (
        <div style={{ color: "green", fontWeight: "bold", marginBottom: "10px" }}>
          <p>Chamado cadastrado.</p>
          <Link to="/">Ver a fila</Link>
        </div>
      )}

      <button type="submit">Abrir chamado</button>
    </form>
  );
}