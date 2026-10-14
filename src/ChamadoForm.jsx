import { useState } from "react";

export default function ChamadoForm({ onAddChamado }) {
  // Estado único para os dois campos do formulário
  const [form, setForm] = useState({ title: "", sector: "" });
  // Estado para exibir mensagem de erro
  const [error, setError] = useState("");

  // Handler genérico que atualiza qualquer campo baseado no atributo 'name' do input
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    // Evita que o formulário recarregue a página inteira
    event.preventDefault();

    // Remove espaços das extremidades usando o trim()
    const title = form.title.trim();
    const sector = form.sector.trim();

    // Validação: se algum campo ficou vazio, mostra erro e para a função
    if (!title || !sector) {
      setError("Preencha o assunto e o setor.");
      return;
    }

    // Se passou pela validação, enviamos o objeto montado para o pai
    onAddChamado({
      id: crypto.randomUUID(), // Cria um ID único aleatório
      title: title,
      sector: sector,
      resolved: false, // Todo novo chamado nasce como Aberto
    });

    // Limpa os campos e o erro após sucesso
    setForm({ title: "", sector: "" });
    setError("");
  }

  return (
    // Ligando o evento onSubmit ao nosso formulário
    <form className="habit-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Assunto</label>
        <input
          id="title"
          name="title"       // O name DEVE ser igual à propriedade no useState
          value={form.title} // O valor exibido vem do estado
          onChange={handleChange}
          placeholder="Ex.: Monitor não liga"
        />
      </div>

      <div className="field">
        <label htmlFor="sector">Setor</label>
        <input
          id="sector"
          name="sector"       // O name DEVE ser igual à propriedade no useState
          value={form.sector} // O valor exibido vem do estado
          onChange={handleChange}
          placeholder="Ex.: Tesouraria"
        />
      </div>

      {/* Renderização condicional para a mensagem de erro */}
      {error && <p className="form-error">{error}</p>}

      <button type="submit">Abrir chamado</button>
    </form>
  );
}