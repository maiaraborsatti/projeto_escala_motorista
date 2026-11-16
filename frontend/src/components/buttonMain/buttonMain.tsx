// buttonMain.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./buttonMain.css";

interface ButtonMainProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ButtonMain({ children, type = "button", className = "", ...rest }: ButtonMainProps) {
  return (
    <button type={type} className={`button-main ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}