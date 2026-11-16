// barraUsuario.tsx
import { CircleUserRound, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import "./barraUsuario.css";

interface BarraUsuarioProps {
  nome: string;
}

export function BarraUsuario({ nome }: BarraUsuarioProps) {
  const navigate = useNavigate();

  return (
    <header className="barra-usuario">
      <div className="barra-usuario__perfil">
        <CircleUserRound size={48} strokeWidth={1.5} aria-hidden="true" />
        <p className="barra-usuario__saudacao">
          Boas-vindas, <strong>{nome}</strong>
        </p>
      </div>

      {/* por enquanto o logout só leva ao login; depois é aqui que a sessão será encerrada */}
      <button type="button" className="barra-usuario__logout" onClick={() => navigate("/login")}>
        <LogOut size={22} />
        Logout
      </button>
    </header>
  );
}