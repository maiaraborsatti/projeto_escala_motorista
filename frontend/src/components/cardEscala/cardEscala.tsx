// cardEscala.tsx
import { ArrowRight, Car, CircleUserRound, Map as IconeMapa, SquarePen, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Escala } from "../../types/escala";
import "./cardEscala.css";

interface PecaProps {
  rotulo: string;
  Icone: LucideIcon;
  principal: string;
  secundario: string;
}

// um dos três elementos da escala (motorista, veículo ou rota)
function Peca({ rotulo, Icone, principal, secundario }: PecaProps) {
  return (
    <div className="card-escala__peca">
      <div className="card-escala__icone" aria-hidden="true">
        <Icone size={40} strokeWidth={1.5} />
      </div>
      <div className="card-escala__texto">
        <span className="card-escala__rotulo">{rotulo}</span>
        <strong className="card-escala__principal">{principal}</strong>
        <span className="card-escala__secundario">{secundario}</span>
      </div>
    </div>
  );
}

interface CardEscalaProps {
  escala: Escala;
  onEditar?: (escala: Escala) => void;
  onExcluir?: (escala: Escala) => void;
}

export function CardEscala({ escala, onEditar, onExcluir }: CardEscalaProps) {
  const {
    turno,
    motoristaChapa, motoristaNome,
    veiculoPlaca, veiculoModelo,
    rotaId, rotaNome,
  } = escala;

  return (
    <article className="card-escala">
      <div className="card-escala__turno" aria-label={`Turno ${turno}`}>
        {turno}
      </div>

      <div className="card-escala__pecas">
        <Peca
          rotulo="Motorista"
          Icone={CircleUserRound}
          principal={motoristaNome ?? motoristaChapa}
          secundario={motoristaNome ? `Chapa ${motoristaChapa}` : ""}
        />
        <ArrowRight className="card-escala__ligacao" size={24} aria-hidden="true" />
        <Peca
          rotulo="Veículo"
          Icone={Car}
          principal={veiculoModelo ?? veiculoPlaca}
          secundario={veiculoModelo ? `Placa ${veiculoPlaca}` : ""}
        />
        <ArrowRight className="card-escala__ligacao" size={24} aria-hidden="true" />
        <Peca
          rotulo="Rota"
          Icone={IconeMapa}
          principal={rotaNome ?? `Rota ${rotaId}`}
          secundario={rotaNome ? `ID ${rotaId}` : ""}
        />
      </div>

      <div className="card-escala__acoes">
        <button
          type="button"
          className="card-escala__botao card-escala__botao--editar"
          aria-label="Editar escala"
          onClick={() => onEditar?.(escala)}
        >
          <SquarePen size={24} />
        </button>
        <button
          type="button"
          className="card-escala__botao card-escala__botao--excluir"
          aria-label="Excluir escala"
          onClick={() => onExcluir?.(escala)}
        >
          <Trash2 size={24} />
        </button>
      </div>
    </article>
  );
}