import { User } from "lucide-react";
import { ButtonMain } from "../../components/buttonMain/buttonMain";
import "./login.css";

export default function Login() {
  return (
    <main className="login-page">
      <section className="login-card">
        <User className="login-icon" size={120} strokeWidth={0} fill="#d9d9d9" />

        <div className="login-field">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="e-mail" />
        </div>

        <div className="login-field">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" placeholder="senha" />
        </div>

        <div className="login-options">
          <label className="login-remember">
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#" className="login-link">Esqueci a senha</a>
        </div>

        <ButtonMain>Entrar</ButtonMain>

        <p className="login-register">
          <a href="#" className="login-link">
            Não possui cadastro?
            <br />
            Entre em contato com o ADM da sua empresa
          </a>
        </p>
      </section>
    </main>
  );
}