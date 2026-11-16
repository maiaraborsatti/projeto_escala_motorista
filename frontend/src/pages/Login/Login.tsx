import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { User } from "lucide-react";
import { ApiError, api } from "../../services/api";
import { ButtonMain } from "../../components/buttonMain/buttonMain";
import "./login.css";

interface LoginResponse {
  sucesso: true;
  token: string;
  usuario: {
    usuario_id: number;
    nome: string;
    email: string;
    perfil: string;
    motorista_chapa: string | null;
  };
}

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await api.post<LoginResponse>("/auth/login", {
        email,
        senha,
      });

      localStorage.setItem("token", resposta.token);
      localStorage.setItem("usuario", JSON.stringify(resposta.usuario));

      navigate("/menu");
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          setErro("E-mail ou senha inválidos.");
        } else if (error.status === 403) {
          setErro("Usuário bloqueado. Entre em contato com o administrador.");
        } else {
          setErro(error.message);
        }
      } else {
        setErro("Ocorreu um erro inesperado ao realizar o login.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <User className="login-icon" size={120} strokeWidth={0} fill="#d9d9d9" />

        <form onSubmit={handleLogin}>
          <div className="login-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
            />
          </div>

          <div className="login-options">
            <label className="login-remember">
              <input type="checkbox" />
              Lembre de mim
            </label>
            <a href="#" className="login-link">Esqueci a senha</a>
          </div>

          {erro && <p role="alert">{erro}</p>}

          <ButtonMain type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </ButtonMain>
        </form>

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