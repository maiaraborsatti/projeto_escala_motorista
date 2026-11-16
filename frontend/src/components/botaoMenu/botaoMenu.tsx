// botaoMenu.tsx
import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";
import "./botaoMenu.css";

interface BotaoMenuProps {
  to: string;
  texto: string;
  Icone: LucideIcon;
}

export function BotaoMenu({ to, texto, Icone }: BotaoMenuProps) {
  return (
    <Link to={to} className="botao-menu">
      <span className="botao-menu__texto">{texto}</span>
      <Icone size={36} aria-hidden="true" />
    </Link>
  );
}