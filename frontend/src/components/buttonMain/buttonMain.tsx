import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./buttonMain.css";

interface ButtonMainProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ButtonMain({ children, type = "button", ...rest }: ButtonMainProps) {
  return (
    <button type={type} className="button-main" {...rest}>
      {children}
    </button>
  );
}