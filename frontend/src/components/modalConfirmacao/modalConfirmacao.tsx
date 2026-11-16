// modalConfirmacao.tsx
import { useEffect } from "react";
import "./modalConfirmacao.css";

interface ModalConfirmacaoProps {
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ModalConfirmacao({
  titulo,
  mensagem,
  textoConfirmar = "Excluir",
  textoCancelar = "Cancelar",
  onConfirmar,
  onCancelar,
}: ModalConfirmacaoProps) {
  // fecha com a tecla Esc
  useEffect(() => {
    function aoApertarTecla(e: KeyboardEvent) {
      if (e.key === "Escape") onCancelar();
    }
    document.addEventListener("keydown", aoApertarTecla);
    return () => document.removeEventListener("keydown", aoApertarTecla);
  }, [onCancelar]);

  return (
    <div className="modal-fundo" onClick={onCancelar}>
      <div
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        aria-describedby="modal-mensagem"
        onClick={(e) => e.stopPropagation()} // clicar dentro não fecha
      >
        <h2 id="modal-titulo" className="modal__titulo">{titulo}</h2>
        <p id="modal-mensagem" className="modal__mensagem">{mensagem}</p>

        <div className="modal__acoes">
          <button
            type="button"
            autoFocus
            className="modal__botao modal__botao--cancelar"
            onClick={onCancelar}
          >
            {textoCancelar}
          </button>
          <button
            type="button"
            className="modal__botao modal__botao--perigo"
            onClick={onConfirmar}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}