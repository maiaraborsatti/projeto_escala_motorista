import { ArrowLeft, LogOut } from "lucide-react";
import "./header.css";

interface HeaderProps {
  title: string;
  mostrarVoltar?: boolean;
}

function Header({ title, mostrarVoltar = true }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">

        {mostrarVoltar && (
          <button className="back-button">
            <ArrowLeft size={22} />
          </button>
        )}

        <h1>{title}</h1>

      </div>

      <button className="logout-button">
        <LogOut size={22} />
        Logout
      </button>
    </header>
  );
}

export default Header;