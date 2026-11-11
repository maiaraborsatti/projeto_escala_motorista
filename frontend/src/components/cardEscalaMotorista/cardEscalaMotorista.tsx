
import {
  ArrowRight,
  Car,
  CircleUserRound,
  Map as IconeMapa,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { Escala } from "../../types/escala";

import "./cardEscalaMotorista.css";

// Informações de cada parte do card
interface PecaProps {
  rotulo: string;
  Icone: LucideIcon;
  principal: string;
  secundario: string;
}

// Componente responsável por exibir uma informação
function Peca({ rotulo, Icone, principal, secundario }: PecaProps) {
  return (
    <div className="card-escala-motorista__peca">
      <div className="card-escala-motorista__icone" aria-hidden="true">
        <Icone size={40} strokeWidth={1.5} />
      </div>

      <div className="card-escala-motorista__texto">
        <span className="card-escala-motorista__rotulo">{rotulo}</span>
        <strong className="card-escala-motorista__principal">
          {principal}
        </strong>
        <span className="card-escala-motorista__secundario">
          {secundario}
        </span>
      </div>
    </div>
  );
}

// Propriedades recebidas pelo card
interface CardEscalaMotoristaProps {
  escala: Escala;
}

// Card de consulta do motorista
export function CardEscalaMotorista({
  escala,
}: CardEscalaMotoristaProps) {
  const {
    turno,
    veiculoPlaca,
    veiculoModelo,
    rotaId,
    rotaNome,
  } = escala;

  return (
    <article className="card-escala-motorista">
      <div className="card-escala-motorista__turno">
        {turno}
      </div>

      <div className="card-escala-motorista__pecas">
        <Peca
          rotulo="Motorista"
          Icone={CircleUserRound}
          principal={escala.motoristaNome ?? escala.motoristaChapa}
          secundario={`Chapa ${escala.motoristaChapa}`}
        />

        <ArrowRight
          className="card-escala-motorista__ligacao"
          size={24}
          aria-hidden="true"
        />

        <Peca
          rotulo="Veículo"
          Icone={Car}
          principal={veiculoModelo ?? veiculoPlaca}
          secundario={veiculoModelo ? `Placa ${veiculoPlaca}` : ""}
        />

        <ArrowRight
          className="card-escala-motorista__ligacao"
          size={24}
          aria-hidden="true"
        />

        <Peca
          rotulo="Rota"
          Icone={IconeMapa}
          principal={rotaNome ?? `Rota ${rotaId}`}
          secundario={rotaNome ? `ID ${rotaId}` : ""}
        />
      </div>
    </article>
  );
}
