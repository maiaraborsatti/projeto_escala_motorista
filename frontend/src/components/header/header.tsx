
import { useState } from "react";
import { ArrowLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { ModalConfirmacao } from "../modalConfirmacao/modalConfirmacao";
import "./header.css";

interface HeaderProps {
  title: string;
  mostrarVoltar?: boolean;
  rotaVoltar?: string;
}

function Header({ title, mostrarVoltar = true, rotaVoltar ="/menu" }: HeaderProps) {
  const navigate = useNavigate();
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/login");
  }

  return (
    <>
      <header className="header">
        <div className="header-left">

          {mostrarVoltar && (
            <button
              className="back-button"
              onClick={() => navigate(rotaVoltar)}
            >
              <ArrowLeft size={22} />
            </button>
          )}

          <h1>{title}</h1>

        </div>

        <button
          className="logout-button"
          onClick={() => setMostrarConfirmacao(true)}
        >
          <LogOut size={22} />
          Logout
        </button>
      </header>

      {mostrarConfirmacao && (
        <ModalConfirmacao
          titulo="Deseja sair?"
          mensagem="Tem certeza que deseja encerrar sua sessão?"
          textoConfirmar="Sair"
          textoCancelar="Cancelar"
          onConfirmar={handleLogout}
          onCancelar={() => setMostrarConfirmacao(false)}
        />
      )}
    </>
  );
}

export default Header;
