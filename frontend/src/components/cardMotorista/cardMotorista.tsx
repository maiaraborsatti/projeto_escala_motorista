// cardMotorista.tsx
import { CircleUserRound, SquarePen, Trash2 } from "lucide-react";
import { STATUS_DISPONIVEL, type Motorista } from "../../types/motorista";
import "./cardMotorista.css";

interface CardMotoristaProps {
  motorista: Motorista;
  onEditar?: (motorista: Motorista) => void;
  onExcluir?: (motorista: Motorista) => void;
}

// "2027-10-20" -> "20/10/2027" (sem usar Date, para evitar bug de fuso horário)
// slice(0, 10) também aceita "2027-10-20T03:00:00.000Z"
function formatarData(iso: string) {
  const [ano, mes, dia] = iso.slice(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
}

// CNH vencida = validade anterior a hoje (o texto fica vermelho, como no Figma)
function cnhVencida(iso: string) {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return iso.slice(0, 10) < `${hoje.getFullYear()}-${mes}-${dia}`;
}

export function CardMotorista({ motorista, onEditar, onExcluir }: CardMotoristaProps) {
  const { chapa, nome, fotoUrl, cnhClasse, cnhValidade, turno, statusDisponibilidade } = motorista;

  // ⚠️ suposição: confirmar com o back os valores reais do status
  const disponivel = statusDisponibilidade === STATUS_DISPONIVEL;

  return (
    <article className="card-motorista">
      {fotoUrl ? (
        <img className="card-motorista__foto" src={fotoUrl} alt={`Foto de ${nome}`} />
      ) : (
        <CircleUserRound className="card-motorista__avatar" size={64} strokeWidth={1.75} />
      )}

      <div className="card-motorista__info">
        <h3 className="card-motorista__nome">{nome}</h3>
        <p>ID {chapa} | CNH: {cnhClasse}</p>
        <p className={cnhVencida(cnhValidade) ? "card-motorista__validade--vencida" : undefined}>
          Validade: {formatarData(cnhValidade)}
        </p>
        {turno && <p>Turno: {turno}</p>}
      </div>

      <div className="card-motorista__lado">
        <span
          className={`card-motorista__status ${
            disponivel ? "card-motorista__status--disponivel" : "card-motorista__status--indisponivel"
          }`}
        >
          {disponivel ? "Disponível hoje" : "Indisponível hoje"}
        </span>

        <div className="card-motorista__acoes">
          <button
            type="button"
            className="card-motorista__botao card-motorista__botao--editar"
            aria-label={`Editar ${nome}`}
            onClick={() => onEditar?.(motorista)}
          >
            <SquarePen size={24} />
          </button>
          <button
            type="button"
            className="card-motorista__botao card-motorista__botao--excluir"
            aria-label={`Excluir ${nome}`}
            onClick={() => onExcluir?.(motorista)}
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>
    </article>
  );
}