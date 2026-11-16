// cardRota.tsx
import { Map as IconeMapa, SquarePen, Trash2 } from "lucide-react";
import type { Rota } from "../../types/rota";
import "./cardRota.css";

interface CardRotaProps {
  rota: Rota;
  onEditar?: (rota: Rota) => void;
  onExcluir?: (rota: Rota) => void;
}

// 12.5 -> "12,50 km"
function formatarDistancia(km: number) {
  const numero = km.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${numero} km`;
}

export function CardRota({ rota, onEditar, onExcluir }: CardRotaProps) {
  const { rotaId, nome, tipo, distanciaKm, status } = rota;
  const ativa = status === "Ativo";

  return (
    <article className="card-rota">
      <div className="card-rota__icone" aria-hidden="true">
        <IconeMapa size={72} strokeWidth={1.5} />
      </div>

      <div className="card-rota__info">
        <h3 className="card-rota__nome">{nome}</h3>
        <p>ID {rotaId} | Tipo: {tipo}</p>
        <p>Distância: {formatarDistancia(distanciaKm)}</p>
      </div>

      <div className="card-rota__lado">
        <span
          className={`card-rota__status ${
            ativa ? "card-rota__status--ativa" : "card-rota__status--inativa"
          }`}
        >
          {ativa ? "Ativa" : "Inativa"}
        </span>

        <div className="card-rota__acoes">
          <button
            type="button"
            className="card-rota__botao card-rota__botao--editar"
            aria-label={`Editar ${nome}`}
            onClick={() => onEditar?.(rota)}
          >
            <SquarePen size={24} />
          </button>
          <button
            type="button"
            className="card-rota__botao card-rota__botao--excluir"
            aria-label={`Excluir ${nome}`}
            onClick={() => onExcluir?.(rota)}
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>
    </article>
  );
}