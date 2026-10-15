import { Link } from "react-router";
import Panel from "../components/Panel";

export default function NaoEncontradaPage() {
  return (
    <Panel title="404">
      <h2>Página não encontrada</h2>
      <p>O endereço que você acessou não existe.</p>
      <Link to="/">Voltar à fila</Link>
    </Panel>
  );
}