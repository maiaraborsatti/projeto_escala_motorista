
import Header from "../../components/header/header";
import { ButtonMain } from "../../components/buttonMain/buttonMain";
import "./cadastroMotorista.css";

export default function CadastroMotorista() {
  return (
    <div className="pagina">
      <Header title="Cadastro de motorista" />

      <main className="pagina__conteudo cadastro-motorista">
        <div className="cadastro-motorista__introducao">
          <h2>Novo motorista</h2>
          <p>
            Preencha as informações abaixo para cadastrar um motorista.
          </p>
        </div>

        <form className="cadastro-motorista__formulario">
          <div className="cadastro-motorista__campo">
            <label htmlFor="chapa">Chapa</label>
            <input
              id="chapa"
              type="text"
              placeholder="Digite a chapa do motorista"
              maxLength={20}
            />
          </div>

          <div className="cadastro-motorista__campo">
            <label htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite o nome do motorista"
              maxLength={100}
            />
          </div>

          <div className="cadastro-motorista__campo">
            <label htmlFor="fotoUrl">URL da foto</label>
            <input
              id="fotoUrl"
              type="url"
              placeholder="https://exemplo.com/foto.jpg"
              maxLength={255}
            />
          </div>

          <div className="cadastro-motorista__campo">
            <label htmlFor="cnhNumero">Número da CNH</label>
            <input
              id="cnhNumero"
              type="text"
              placeholder="Digite o número da CNH"
              maxLength={20}
            />
          </div>

          <div className="cadastro-motorista__campo">
  <label htmlFor="cnhClasse">Classe da CNH</label>
  <select id="cnhClasse" defaultValue="">
    <option value="" disabled>
      Selecione a classe
    </option>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
    <option value="D">D</option>
    <option value="E">E</option>
  </select>
</div>
          <div className="cadastro-motorista__campo">
            <label htmlFor="cnhValidade">Validade da CNH</label>
            <input
              id="cnhValidade"
              type="date"
            />
          </div>

          <div className="cadastro-motorista__campo">
            <label htmlFor="podeDirigir">Pode dirigir</label>
            <select id="podeDirigir" defaultValue="">
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="Manual">Manual</option>
              <option value="Automatico">Automático</option>
              <option value="Ambos">Ambos</option>
            </select>
          </div>

          <div className="cadastro-motorista__campo">
  <label htmlFor="statusDisponibilidade">
    Status de disponibilidade
  </label>
  <select id="statusDisponibilidade" defaultValue="Disponivel">
    <option value="Disponivel">Disponível</option>
    <option value="Indisponivel">Indisponível</option>
  </select>
</div>

          <div className="cadastro-motorista__acoes">
            <ButtonMain className="cadastro-motorista__botao cadastro-motorista__botao--cancelar">
              Cancelar
            </ButtonMain>

            <ButtonMain className="cadastro-motorista__botao cadastro-motorista__botao--cadastrar">
              Cadastrar motorista
            </ButtonMain>
          </div>
        </form>
      </main>
    </div>
  );
}
