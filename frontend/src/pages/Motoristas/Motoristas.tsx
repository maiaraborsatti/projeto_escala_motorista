// Motoristas.tsx
import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import Header from "../../components/header/header";
import { ButtonMain } from "../../components/buttonMain/buttonMain";
import { CardMotorista } from "../../components/cardMotorista/cardMotorista";
import { ModalConfirmacao } from "../../components/modalConfirmacao/modalConfirmacao";
import { Paginacao } from "../../components/paginacao/paginacao";
import { excluirMotorista, listarMotoristas } from "../../services/motoristasService";
import type { Motorista } from "../../types/motorista";
import "./motoristas.css";

const ITENS_POR_PAGINA = 5;

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [motoristaParaExcluir, setMotoristaParaExcluir] = useState<Motorista | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        setMotoristas(await listarMotoristas());
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
      } finally {
        setCarregando(false);
      }
    }
    void carregar();
  }, []);

  // pesquisa por nome ou chapa
  const termo = busca.trim().toLowerCase();
  const filtrados = motoristas.filter(
    (m) => m.nome.toLowerCase().includes(termo) || m.chapa.includes(termo)
  );

  // paginação (Math.min evita ficar numa página que deixou de existir após excluir)
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / ITENS_POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const visiveis = filtrados.slice(inicio, inicio + ITENS_POR_PAGINA);

  async function confirmarExclusao() {
    if (!motoristaParaExcluir) return;
    try {
      await excluirMotorista(motoristaParaExcluir.chapa);
      setMotoristas((atual) => atual.filter((m) => m.chapa !== motoristaParaExcluir.chapa));
    } catch {
      setErro("Não foi possível excluir o motorista.");
    } finally {
      setMotoristaParaExcluir(null);
    }
  }

  return (
    <div className="pagina">
      <Header title="Motoristas" />

      <main className="pagina__conteudo">
        <label className="motoristas-busca">
          <Search size={24} />
          <input
            type="search"
            placeholder="Pesquisar"
            aria-label="Pesquisar motorista"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPagina(1); // nova pesquisa volta para a primeira página
            }}
          />
        </label>

        {erro && <p className="motoristas-erro" role="alert">{erro}</p>}

        {carregando ? (
          <p className="motoristas-vazio">Carregando motoristas...</p>
        ) : visiveis.length === 0 ? (
          <p className="motoristas-vazio">Nenhum motorista encontrado.</p>
        ) : (
          <ul className="motoristas-lista">
            {visiveis.map((m) => (
              <li key={m.chapa}>
                <CardMotorista
                  motorista={m}
                  onEditar={(mot) => console.log("Editar (ainda sem função):", mot.chapa)}
                  onExcluir={setMotoristaParaExcluir} // abre a janela de confirmação
                />
              </li>
            ))}
          </ul>
        )}

        <div className="motoristas-rodape">
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onMudarPagina={setPagina}
          />
          <ButtonMain className="motoristas-add">
            Adicionar <Plus size={22} />
          </ButtonMain>
        </div>
      </main>

      {motoristaParaExcluir && (
        <ModalConfirmacao
          titulo="Excluir motorista?"
          mensagem={`Você está prestes a excluir ${motoristaParaExcluir.nome} (ID ${motoristaParaExcluir.chapa}). Essa ação não pode ser desfeita.`}
          textoConfirmar="Excluir"
          onConfirmar={confirmarExclusao}
          onCancelar={() => setMotoristaParaExcluir(null)}
        />
      )}
    </div>
  );
}