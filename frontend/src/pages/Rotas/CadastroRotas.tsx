
import Header from "../../components/header/header";
import { ButtonMain } from "../../components/buttonMain/buttonMain";
import "./CadastroRotas.css";

export default function CadastroRotas() {
  return (
    <div className="pagina">
      <Header title="Cadastro de rota" />

      <main className="pagina__conteudo cadastro-rota">
        <div className="cadastro-rota__introducao">
          <h2>Nova rota</h2>
          <p>
            Preencha as informações abaixo para cadastrar uma rota.
          </p>
        </div>

        <form className="cadastro-rota__formulario">
          <div className="cadastro-rota__campo">
            <label htmlFor="nome">Nome da rota</label>
            <input
              id="nome"
              type="text"
              placeholder="Ex.: Rota São Paulo - Campinas"
              maxLength={100}
            />
          </div>

          <div className="cadastro-rota__campo">
            <label htmlFor="tipo">Tipo de rota</label>
            <select id="tipo" defaultValue="">
              <option value="" disabled>
                Selecione o tipo de rota
              </option>
              <option value="City">City</option>
              <option value="Dritell">Dritell</option>
              <option value="Highway">Highway</option>
            </select>
          </div>

          <div className="cadastro-rota__campo">
            <label htmlFor="distancia">Distância (km)</label>
            <input
              id="distancia"
              type="number"
              placeholder="Ex.: 120.50"
              min="0.01"
              step="0.01"
            />
          </div>

          <div className="cadastro-rota__campo">
            <label htmlFor="status">Status</label>
            <select id="status" defaultValue="Ativo">
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          <div className="cadastro-rota__acoes">
            <ButtonMain className="cadastro-rota__botao cadastro-rota__botao--cancelar">
              Cancelar
            </ButtonMain>

            <ButtonMain className="cadastro-rota__botao cadastro-rota__botao--cadastrar">
              Cadastrar rota
            </ButtonMain>
          </div>
        </form>
      </main>
    </div>
  );
}
