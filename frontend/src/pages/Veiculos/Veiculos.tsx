// Veiculos.tsx
import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import Header from "../../components/header/header";
import { ButtonMain } from "../../components/buttonMain/buttonMain";
import { CardVeiculo } from "../../components/cardVeiculo/cardVeiculo";
import { ModalConfirmacao } from "../../components/modalConfirmacao/modalConfirmacao";
import { Paginacao } from "../../components/paginacao/paginacao";
import { excluirVeiculo, listarVeiculos } from "../../services/veiculosService";
import type { Veiculo } from "../../types/veiculo";
import "./veiculos.css";

const ITENS_POR_PAGINA = 5;

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [veiculoParaExcluir, setVeiculoParaExcluir] = useState<Veiculo | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        setVeiculos(await listarVeiculos());
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
      } finally {
        setCarregando(false);
      }
    }
    void carregar();
  }, []);

  // pesquisa por modelo, marca, placa, VIN ou tipo de rota
  const termo = busca.trim().toLowerCase();
  const filtrados = veiculos.filter((v) =>
    [v.modelo, v.marca, v.placa, v.vin, v.tipoRotaExigido].some((campo) =>
      campo.toLowerCase().includes(termo)
    )
  );

  // paginação (Math.min evita ficar numa página que deixou de existir após excluir)
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / ITENS_POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const visiveis = filtrados.slice(inicio, inicio + ITENS_POR_PAGINA);

  async function confirmarExclusao() {
    if (!veiculoParaExcluir) return;
    try {
      await excluirVeiculo(veiculoParaExcluir.placa);
      setVeiculos((atual) => atual.filter((v) => v.placa !== veiculoParaExcluir.placa));
    } catch {
      setErro("Não foi possível excluir o veículo.");
    } finally {
      setVeiculoParaExcluir(null);
    }
  }

  return (
    <div className="pagina">
      <Header title="Veículos" />

      <main className="pagina__conteudo">
        <label className="veiculos-busca">
          <Search size={24} />
          <input
            type="search"
            placeholder="Pesquisar"
            aria-label="Pesquisar veículo"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPagina(1); // nova pesquisa volta para a primeira página
            }}
          />
        </label>

        {erro && <p className="veiculos-erro" role="alert">{erro}</p>}

        {carregando ? (
          <p className="veiculos-vazio">Carregando veículos...</p>
        ) : visiveis.length === 0 ? (
          <p className="veiculos-vazio">Nenhum veículo encontrado.</p>
        ) : (
          <ul className="veiculos-lista">
            {visiveis.map((v) => (
              <li key={v.placa}>
                <CardVeiculo
                  veiculo={v}
                  onEditar={(veic) => console.log("Editar (ainda sem função):", veic.placa)}
                  onExcluir={setVeiculoParaExcluir} // abre a janela de confirmação
                />
              </li>
            ))}
          </ul>
        )}

        <div className="veiculos-rodape">
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onMudarPagina={setPagina}
          />
          <ButtonMain className="veiculos-add">
            Adicionar <Plus size={22} />
          </ButtonMain>
        </div>
      </main>

      {veiculoParaExcluir && (
        <ModalConfirmacao
          titulo="Excluir veículo?"
          mensagem={`Você está prestes a excluir o veículo ${veiculoParaExcluir.modelo || "sem modelo"} (placa ${veiculoParaExcluir.placa}). Essa ação não pode ser desfeita.`}
          textoConfirmar="Excluir"
          onConfirmar={confirmarExclusao}
          onCancelar={() => setVeiculoParaExcluir(null)}
        />
      )}
    </div>
  );
}