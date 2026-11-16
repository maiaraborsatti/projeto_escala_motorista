// Menu.tsx
import { Car, ChartArea, FileText, Signpost, Table, Users } from "lucide-react";
import { BarraUsuario } from "../../components/barraUsuario/barraUsuario";
import { BotaoMenu } from "../../components/botaoMenu/botaoMenu";
import "./menu.css";

/* ============================================================================
   ⚠️⚠️⚠️  PLACEHOLDER  —  NOME FALSO, SÓ PARA TESTAR O VISUAL  ⚠️⚠️⚠️

   Este nome NÃO é de um usuário real. Quando a tabela de usuários e o login
   estiverem prontos, APAGUE esta constante e use o nome do usuário logado.
   ============================================================================ */
const NOME_USUARIO_PLACEHOLDER = "Usuário";
/* ===================== FIM DO PLACEHOLDER ===================== */

// Atenção: por enquanto só /motoristas e /veiculos existem.
// Os outros caminhos caem na página NotFound até as telas serem criadas.
const ITENS_MENU = [
  { to: "/motoristas", texto: "Motoristas", Icone: Users },
  { to: "/rotas", texto: "Rotas", Icone: Signpost },
  { to: "/veiculos", texto: "Veículos", Icone: Car },
  { to: "/escalas", texto: "Escalas", Icone: Table },
  { to: "/relatorios", texto: "Relatórios", Icone: ChartArea },
  { to: "/logs", texto: "Logs", Icone: FileText },
];

export default function Menu() {
  return (
    <div className="pagina">
      <BarraUsuario nome={NOME_USUARIO_PLACEHOLDER} />

      <main className="pagina__conteudo menu-conteudo">
        <nav className="menu-cartao" aria-label="Menu principal">
          {ITENS_MENU.map((item) => (
            <BotaoMenu key={item.to} to={item.to} texto={item.texto} Icone={item.Icone} />
          ))}
        </nav>
      </main>
    </div>
  );
}