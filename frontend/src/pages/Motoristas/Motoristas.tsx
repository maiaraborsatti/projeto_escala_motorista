// Motoristas.tsx
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import Header from "../../components/header/header"; // ⚠️ ajuste ao export e às props do seu header
import { ButtonMain } from "../../components/buttonMain/buttonMain";
import { CardMotorista } from "../../components/cardMotorista/cardMotorista";
import { ModalConfirmacao } from "../../components/modalConfirmacao/modalConfirmacao";
import { Paginacao } from "../../components/paginacao/paginacao";
import type { Motorista } from "../../types/motorista";
import "./motoristas.css";

/* ============================================================================
   ⚠️⚠️⚠️  PLACEHOLDER  —  DADOS FALSOS, SÓ PARA TESTAR O VISUAL  ⚠️⚠️⚠️

   Estes motoristas NÃO existem de verdade. Quando a API estiver pronta:
     1. APAGUE todo este bloco (a constante MOTORISTAS_PLACEHOLDER);
     2. troque o useState abaixo por uma chamada à API, por exemplo em um
        arquivo da pasta "services" + useEffect;
     3. no confirmarExclusao(), troque a remoção local pela chamada DELETE.
   ============================================================================ */
const MOTORISTAS_PLACEHOLDER: Motorista[] = [
  { id: "12345", nome: "João Souza",      cnh: "D", validadeCnh: "2027-10-20", turno: "T1", disponivel: true },
  { id: "34567", nome: "Pedro Silva",     cnh: "D", validadeCnh: "2025-10-20", turno: "T1", disponivel: false },
  { id: "67890", nome: "Sandra Dias",     cnh: "D", validadeCnh: "2027-10-20", turno: "T1", disponivel: true },
  { id: "45678", nome: "Mariana Lopes",   cnh: "E", validadeCnh: "2028-03-15", turno: "T2", disponivel: true },
  { id: "56789", nome: "Carlos Almeida",  cnh: "D", validadeCnh: "2026-12-01", turno: "T2", disponivel: false },
  { id: "78901", nome: "Fernanda Rocha",  cnh: "C", validadeCnh: "2029-06-30", turno: "T3", disponivel: true },
  { id: "89012", nome: "Ricardo Nunes",   cnh: "D", validadeCnh: "2027-08-10", turno: "T1", disponivel: true },
  { id: "90123", nome: "Patrícia Gomes",  cnh: "E", validadeCnh: "2028-11-25", turno: "T3", disponivel: false },
];
/* ===================== FIM DO PLACEHOLDER ===================== */

const ITENS_POR_PAGINA = 5;

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState<Motorista[]>(MOTORISTAS_PLACEHOLDER); // ⚠️ placeholder
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [motoristaParaExcluir, setMotoristaParaExcluir] = useState<Motorista | null>(null);

  // pesquisa por nome ou ID
  const termo = busca.trim().toLowerCase();
  const filtrados = motoristas.filter(
    (m) => m.nome.toLowerCase().includes(termo) || m.id.includes(termo)
  );

  // paginação (Math.min evita ficar numa página que deixou de existir após excluir)
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / ITENS_POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const visiveis = filtrados.slice(inicio, inicio + ITENS_POR_PAGINA);

  function confirmarExclusao() {
    if (!motoristaParaExcluir) return;
    // ⚠️ placeholder: aqui hoje só removemos da lista local.
    // Com a API: await api.delete(`/motoristas/${motoristaParaExcluir.id}`)
    setMotoristas((atual) => atual.filter((m) => m.id !== motoristaParaExcluir.id));
    setMotoristaParaExcluir(null);
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

        {visiveis.length === 0 ? (
          <p className="motoristas-vazio">Nenhum motorista encontrado.</p>
        ) : (
          <ul className="motoristas-lista">
            {visiveis.map((m) => (
              <li key={m.id}>
                <CardMotorista
                  motorista={m}
                  onEditar={(mot) => console.log("Editar (ainda sem função):", mot.id)}
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
          mensagem={`Você está prestes a excluir ${motoristaParaExcluir.nome} (ID ${motoristaParaExcluir.id}). Essa ação não pode ser desfeita.`}
          textoConfirmar="Excluir"
          onConfirmar={confirmarExclusao}
          onCancelar={() => setMotoristaParaExcluir(null)}
        />
      )}
    </div>
  );
}