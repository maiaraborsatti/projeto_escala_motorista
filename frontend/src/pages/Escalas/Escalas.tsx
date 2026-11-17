// Escalas.tsx
import { useEffect, useState } from "react";
import { Plus, Search, Sparkles } from "lucide-react";
import Header from "../../components/header/header";
import { ButtonMain } from "../../components/buttonMain/buttonMain";
import { CardEscala } from "../../components/cardEscala/cardEscala";
import { ModalConfirmacao } from "../../components/modalConfirmacao/modalConfirmacao";
import { Paginacao } from "../../components/paginacao/paginacao";
import { excluirEscala, listarEscalas } from "../../services/escalasService";
import type { Escala } from "../../types/escala";
import "./escalas.css";

const DIAS_POR_PAGINA = 3;

// "2026-11-09" -> "09/11/2026"
function formatarDataCurta(iso: string) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

// "2026-11-09" -> "Segunda-feira, 9 de novembro de 2026"
function formatarDataExtenso(iso: string) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  const texto = new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

interface GrupoPorData {
  data: string;
  escalas: Escala[];
}

// junta as escalas do mesmo dia (datas em ordem crescente; dentro do dia, por turno e nome)
function agruparPorData(escalas: Escala[]): GrupoPorData[] {
  const porData = new Map<string, Escala[]>();
  for (const escala of escalas) {
    const lista = porData.get(escala.data) ?? [];
    lista.push(escala);
    porData.set(escala.data, lista);
  }

  return Array.from(porData.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([data, itens]) => ({
      data,
      escalas: itens.sort(
        (x, y) =>
          x.turno.localeCompare(y.turno) ||
          (x.motoristaNome ?? x.motoristaChapa).localeCompare(y.motoristaNome ?? y.motoristaChapa)
      ),
    }));
}

export default function Escalas() {
  const [escalas, setEscalas] = useState<Escala[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [escalaParaExcluir, setEscalaParaExcluir] = useState<Escala | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        setEscalas(await listarEscalas());
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
      } finally {
        setCarregando(false);
      }
    }
    void carregar();
  }, []);

  // pesquisa por motorista, veículo, rota, turno ou data
  const termo = busca.trim().toLowerCase();
  const filtradas = escalas.filter((e) =>
    [
      e.motoristaNome ?? "",
      e.motoristaChapa,
      e.veiculoModelo ?? "",
      e.veiculoPlaca,
      e.rotaNome ?? "",
      e.turno,
      e.data,
    ].some((campo) => campo.toLowerCase().includes(termo))
  );

  // a paginação é por DIA (cada página mostra alguns dias inteiros)
  const grupos = agruparPorData(filtradas);
  const totalPaginas = Math.max(1, Math.ceil(grupos.length / DIAS_POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * DIAS_POR_PAGINA;
  const gruposVisiveis = grupos.slice(inicio, inicio + DIAS_POR_PAGINA);

  async function confirmarExclusao() {
    if (!escalaParaExcluir) return;
    try {
      await excluirEscala(escalaParaExcluir.escalaId);
      setEscalas((atual) => atual.filter((e) => e.escalaId !== escalaParaExcluir.escalaId));
    } catch {
      setErro("Não foi possível excluir a escala.");
    } finally {
      setEscalaParaExcluir(null);
    }
  }

  return (
    <div className="pagina">
      <Header title="Escalas" />

      <main className="pagina__conteudo">
        <label className="escalas-busca">
          <Search size={24} />
          <input
            type="search"
            placeholder="Pesquisar"
            aria-label="Pesquisar escala"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPagina(1); // nova pesquisa volta para a primeira página
            }}
          />
        </label>

        <div className="escalas-acoes">
          <ButtonMain
            className="escalas-btn"
            onClick={() => console.log("Gerar escala manualmente (a tela de criação ainda não existe)")}
          >
            Gerar manualmente <Plus size={22} />
          </ButtonMain>
          <ButtonMain
            className="escalas-btn escalas-btn--auto"
            onClick={() => console.log("Gerar escalas automaticamente (algoritmo do back ainda não existe)")}
          >
            Gerar automaticamente <Sparkles size={22} />
          </ButtonMain>
        </div>

        {erro && <p className="escalas-erro" role="alert">{erro}</p>}

        {carregando ? (
          <p className="escalas-vazio">Carregando escalas...</p>
        ) : gruposVisiveis.length === 0 ? (
          <p className="escalas-vazio">Nenhuma escala encontrada.</p>
        ) : (
          gruposVisiveis.map((grupo) => (
            <section key={grupo.data} className="escalas-grupo">
              <h2 className="escalas-grupo__titulo">
                {formatarDataExtenso(grupo.data)}
                <span className="escalas-grupo__contagem">
                  {grupo.escalas.length} {grupo.escalas.length === 1 ? "escala" : "escalas"}
                </span>
              </h2>

              <ul className="escalas-grupo__lista">
                {grupo.escalas.map((e) => (
                  <li key={e.escalaId}>
                    <CardEscala
                      escala={e}
                      onEditar={(esc) => console.log("Editar (ainda sem função):", esc.escalaId)}
                      onExcluir={setEscalaParaExcluir} // abre a janela de confirmação
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}

        <div className="escalas-rodape">
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onMudarPagina={setPagina}
          />
        </div>
      </main>

      {escalaParaExcluir && (
        <ModalConfirmacao
          titulo="Excluir escala?"
          mensagem={`Você está prestes a excluir a escala de ${formatarDataCurta(escalaParaExcluir.data)} (${escalaParaExcluir.turno}) de ${escalaParaExcluir.motoristaNome ?? `chapa ${escalaParaExcluir.motoristaChapa}`}. Essa ação não pode ser desfeita.`}
          textoConfirmar="Excluir"
          onConfirmar={confirmarExclusao}
          onCancelar={() => setEscalaParaExcluir(null)}
        />
      )}
    </div>
  );
}