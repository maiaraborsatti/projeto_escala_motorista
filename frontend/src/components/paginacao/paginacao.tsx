// paginacao.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./paginacao.css";

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onMudarPagina: (pagina: number) => void;
}

export function Paginacao({ paginaAtual, totalPaginas, onMudarPagina }: PaginacaoProps) {
  if (totalPaginas <= 1) return null; // com uma página só, nem aparece

  return (
    <nav className="paginacao" aria-label="Paginação">
      <button
        type="button"
        className="paginacao__botao"
        aria-label="Página anterior"
        disabled={paginaAtual === 1}
        onClick={() => onMudarPagina(paginaAtual - 1)}
      >
        <ChevronLeft size={20} />
        <span className="paginacao__texto">Anterior</span>
      </button>

      <span className="paginacao__info">
        Página {paginaAtual} de {totalPaginas}
      </span>

      <button
        type="button"
        className="paginacao__botao"
        aria-label="Próxima página"
        disabled={paginaAtual === totalPaginas}
        onClick={() => onMudarPagina(paginaAtual + 1)}
      >
        <span className="paginacao__texto">Próxima</span>
        <ChevronRight size={20} />
      </button>
    </nav>
  );
}