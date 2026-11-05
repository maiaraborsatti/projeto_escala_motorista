
import { ArrowLeft, LogOut } from "lucide-react";


interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="header">

      <div className="header-left">

        <button className="back-button">
          <ArrowLeft size={22} />
        </button>

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
