
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import Header from "../../components/header/header";
import { CardEscalaMotorista } from "../../components/cardEscalaMotorista/cardEscalaMotorista";
import { Paginacao } from "../../components/paginacao/paginacao";
import { listarEscalasPorMotorista } from "../../services/escalasService";

import type { Escala } from "../../types/escala";

import "./escalasMotorista.css";

// Quantidade de dias exibidos por página
const DIAS_POR_PAGINA = 3;

// Dados temporários do motorista logado
const MOTORISTA_LOGADO = {
  chapa: "12345",
  nome: "João Souza",
};

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

// Agrupa as escalas pela data
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
      escalas: itens.sort((a, b) => a.turno.localeCompare(b.turno)),
    }));
}

export default function EscalasMotorista() {
  const [escalas, setEscalas] = useState<Escala[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);

  // Busca somente as escalas da matrícula do motorista
  useEffect(() => {
    async function carregar() {
      try {
        const resultado = await listarEscalasPorMotorista(
          MOTORISTA_LOGADO.chapa
        );

        setEscalas(resultado);
      } catch (err) {
        setErro(
          err instanceof Error
            ? err.message
            : "Ocorreu um erro inesperado."
        );
      } finally {
        setCarregando(false);
      }
    }

    void carregar();
  }, []);

  // Pesquisa por veículo, rota, turno ou data
  const termo = busca.trim().toLowerCase();

  const filtradas = escalas.filter((e) =>
    [
      e.veiculoModelo ?? "",
      e.veiculoPlaca,
      e.rotaNome ?? "",
      e.turno,
      e.data,
      formatarDataCurta(e.data),
    ].some((campo) => campo.toLowerCase().includes(termo))
  );

  // Agrupa e organiza as escalas por data
  const grupos = agruparPorData(filtradas);

  // Calcula a quantidade de páginas
  const totalPaginas = Math.max(
    1,
    Math.ceil(grupos.length / DIAS_POR_PAGINA)
  );

  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * DIAS_POR_PAGINA;

  const gruposVisiveis = grupos.slice(
    inicio,
    inicio + DIAS_POR_PAGINA
  );

  return (
    <div className="pagina">
      <Header
        title={`${MOTORISTA_LOGADO.nome} - Chapa ${MOTORISTA_LOGADO.chapa}`}
        mostrarVoltar={false}

      />

      <main className="pagina__conteudo">
        <h1 className="escalas-motorista__titulo">
          Minhas escalas
        </h1>

        <label className="escalas-busca">
          <Search size={24} />

          <input
            type="search"
            placeholder="Pesquisar"
            aria-label="Pesquisar minhas escalas"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPagina(1);
            }}
          />
        </label>

        {erro && (
          <p className="escalas-erro" role="alert">
            {erro}
          </p>
        )}

        {carregando ? (
          <p className="escalas-vazio">
            Carregando suas escalas...
          </p>
        ) : gruposVisiveis.length === 0 ? (
          <p className="escalas-vazio">
            Nenhuma escala encontrada.
          </p>
        ) : (
          gruposVisiveis.map((grupo) => (
            <section key={grupo.data} className="escalas-grupo">
              <h2 className="escalas-grupo__titulo">
                {formatarDataExtenso(grupo.data)}

                <span className="escalas-grupo__contagem">
                  {grupo.escalas.length}{" "}
                  {grupo.escalas.length === 1 ? "escala" : "escalas"}
                </span>
              </h2>

              <ul className="escalas-grupo__lista">
                {grupo.escalas.map((escala) => (
                  <li key={escala.escalaId}>
                    <CardEscalaMotorista escala={escala} />
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
    </div>
  );
}
