import { Construction } from "lucide-react";
import { useNavigate } from "react-router";
import { ButtonMain } from "../buttonMain/buttonMain";
import "./emConstrucao.css";

interface EmConstrucaoProps {
  titulo: string;
}

export default function EmConstrucao({ titulo }: EmConstrucaoProps) {
  const navigate = useNavigate();

  return (
    <main className="em-construcao">
      <section className="em-construcao-card">
        <Construction
          className="em-construcao-icon"
          size={96}
          strokeWidth={1.5}
        />

        <h1 className="em-construcao-titulo">{titulo}</h1>

        <p className="em-construcao-texto">
          Esta página está em construção.
          <br />
          Em breve ela estará disponível por aqui.
        </p>

        <ButtonMain type="button" onClick={() => navigate("/menu")}>
          Voltar ao menu
        </ButtonMain>
      </section>
    </main>
  );
}