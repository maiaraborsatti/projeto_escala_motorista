
import Header from "../../components/header/header";
import "./cadastroVeiculo.css";
//import { ButtonMain } from "../../components/buttonMain/buttonMain";

export default function CadastroVeiculo() {
  return (
    <div className="pagina">
      <Header title="Cadastro de veículo" />

      <main className="pagina__conteudo cadastro-veiculo">
        <div className="cadastro-veiculo__introducao">
          <h2>Novo veículo</h2>
          <p>
            Preencha as informações abaixo para cadastrar um veículo.
          </p>
        </div>

        <form className="cadastro-veiculo__formulario">
          <div className="cadastro-veiculo__campo">
            <label htmlFor="placa">Placa</label>
            <input
              id="placa"
              type="text"
              placeholder="Ex.: ABC1D23"
              maxLength={10}
            />
          </div>

          <div className="cadastro-veiculo__campo">
            <label htmlFor="vin">Número do chassi (VIN)</label>
            <input
              id="vin"
              type="text"
              placeholder="Digite o número do chassi"
              maxLength={17}
            />
          </div>

          <div className="cadastro-veiculo__campo">
            <label htmlFor="marca">Marca</label>
            <input
              id="marca"
              type="text"
              placeholder="Ex.: Volvo"
              maxLength={50}
            />
          </div>

          <div className="cadastro-veiculo__campo">
            <label htmlFor="modelo">Modelo</label>
            <input
              id="modelo"
              type="text"
              placeholder="Ex.: FH 540"
              maxLength={50}
            />
          </div>

          <div className="cadastro-veiculo__campo">
            <label htmlFor="tipoRota">Tipo de rota exigido</label>
            <select id="tipoRota" defaultValue="">
              <option value="" disabled>
                Selecione o tipo de rota
              </option>
              <option value="City">City</option>
              <option value="Dritell">Dritell</option>
              <option value="Highway">Highway</option>
            </select>
          </div>

          <div className="cadastro-veiculo__campo">
            <label htmlFor="projeto">Projeto</label>
            <select id="projeto" defaultValue="">
              <option value="" disabled>
                Selecione um projeto
              </option>
            </select>
          </div>

          <div className="cadastro-veiculo__acoes">
            <button
              type="button"
              className="cadastro-veiculo__botao cadastro-veiculo__botao--cancelar"
            >
              Cancelar
            </button>

            <button
              type="button"
              className="cadastro-veiculo__botao cadastro-veiculo__botao--cadastrar"
            >
              Cadastrar veículo
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
