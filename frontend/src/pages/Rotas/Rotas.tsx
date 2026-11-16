// Rotas.tsx
import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import Header from "../../components/header/header";
import { ButtonMain } from "../../components/buttonMain/buttonMain";
import { CardRota } from "../../components/cardRota/cardRota";
import { ModalConfirmacao } from "../../components/modalConfirmacao/modalConfirmacao";
import { Paginacao } from "../../components/paginacao/paginacao";
import { excluirRota, listarRotas } from "../../services/rotasService";
import type { Rota } from "../../types/rota";
import "./rotas.css";

const ITENS_POR_PAGINA = 5;

export default function Rotas() {
  const [rotas, setRotas] = useState<Rota[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [rotaParaExcluir, setRotaParaExcluir] = useState<Rota | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        setRotas(await listarRotas());
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
      } finally {
        setCarregando(false);
      }
    }
    void carregar();
  }, []);

  // pesquisa por nome, tipo ou ID
  const termo = busca.trim().toLowerCase();
  const filtradas = rotas.filter(
    (r) =>
      r.nome.toLowerCase().includes(termo) ||
      r.tipo.toLowerCase().includes(termo) ||
      String(r.rotaId).includes(termo)
  );

  // paginação (Math.min evita ficar numa página que deixou de existir após excluir)
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / ITENS_POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const visiveis = filtradas.slice(inicio, inicio + ITENS_POR_PAGINA);

  async function confirmarExclusao() {
    if (!rotaParaExcluir) return;
    try {
      await excluirRota(rotaParaExcluir.rotaId);
      setRotas((atual) => atual.filter((r) => r.rotaId !== rotaParaExcluir.rotaId));
    } catch {
      setErro("Não foi possível excluir a rota.");
    } finally {
      setRotaParaExcluir(null);
    }
  }

  return (
    <div className="pagina">
      <Header title="Rotas" />

      <main className="pagina__conteudo">
        <label className="rotas-busca">
          <Search size={24} />
          <input
            type="search"
            placeholder="Pesquisar"
            aria-label="Pesquisar rota"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPagina(1); // nova pesquisa volta para a primeira página
            }}
          />
        </label>

        {erro && <p className="rotas-erro" role="alert">{erro}</p>}

        {carregando ? (
          <p className="rotas-vazio">Carregando rotas...</p>
        ) : visiveis.length === 0 ? (
          <p className="rotas-vazio">Nenhuma rota encontrada.</p>
        ) : (
          <ul className="rotas-lista">
            {visiveis.map((r) => (
              <li key={r.rotaId}>
                <CardRota
                  rota={r}
                  onEditar={(rota) => console.log("Editar (ainda sem função):", rota.rotaId)}
                  onExcluir={setRotaParaExcluir} // abre a janela de confirmação
                />
              </li>
            ))}
          </ul>
        )}

        <div className="rotas-rodape">
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onMudarPagina={setPagina}
          />
          <ButtonMain className="rotas-add">
            Adicionar <Plus size={22} />
          </ButtonMain>
        </div>
      </main>

      {rotaParaExcluir && (
        <ModalConfirmacao
          titulo="Excluir rota?"
          mensagem={`Você está prestes a excluir a rota "${rotaParaExcluir.nome}". Essa ação não pode ser desfeita.`}
          textoConfirmar="Excluir"
          onConfirmar={confirmarExclusao}
          onCancelar={() => setRotaParaExcluir(null)}
        />
      )}
    </div>
  );
}