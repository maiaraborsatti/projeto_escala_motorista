// cardVeiculo.tsx
import { Car, SquarePen, Trash2 } from "lucide-react";
import type { Veiculo } from "../../types/veiculo";
import "./cardVeiculo.css";

interface CardVeiculoProps {
  veiculo: Veiculo;
  onEditar?: (veiculo: Veiculo) => void;
  onExcluir?: (veiculo: Veiculo) => void;
}

export function CardVeiculo({ veiculo, onEditar, onExcluir }: CardVeiculoProps) {
  const { placa, vin, marca, modelo, tipoRotaExigido, projetoId, projetoNome } = veiculo;

  const titulo = modelo || "Modelo não informado";
  // ⚠️ por enquanto aparece o ID do projeto; quando o back enviar o nome, ele aparece sozinho
  const projeto = projetoNome ?? projetoId;

  return (
    <article className="card-veiculo">
      <div className="card-veiculo__icone" aria-hidden="true">
        <Car size={72} strokeWidth={1.5} />
      </div>

      <div className="card-veiculo__info">
        <h3 className="card-veiculo__modelo">{titulo}</h3>
        <p>Marca: {marca || "—"}</p>
        <p>Placa: {placa} | VIN: {vin}</p>
        <p>Projeto: {projeto}</p>
        <p>Tipo de rota: {tipoRotaExigido}</p>
      </div>

      <div className="card-veiculo__acoes">
        <button
          type="button"
          className="card-veiculo__botao card-veiculo__botao--editar"
          aria-label={`Editar ${titulo}, placa ${placa}`}
          onClick={() => onEditar?.(veiculo)}
        >
          <SquarePen size={24} />
        </button>
        <button
          type="button"
          className="card-veiculo__botao card-veiculo__botao--excluir"
          aria-label={`Excluir ${titulo}, placa ${placa}`}
          onClick={() => onExcluir?.(veiculo)}
        >
          <Trash2 size={24} />
        </button>
      </div>
    </article>
  );
}