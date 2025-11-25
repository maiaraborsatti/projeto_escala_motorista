# 📘 Casos de Uso – Sistema de Gerenciamento de Escala de Motoristas

## 📌 Visão Geral

Este documento descreve os casos de uso do sistema de **Gerenciamento de Escala de Motoristas**, responsável pelo controle de motoristas, veículos, rotas, escalas, segurança de acesso e geração de relatórios.

---

## 👥 Atores do Sistema

| Ator           | Descrição |
|----------------|------------|
| **Motorista**  | Consulta suas próprias escalas. |
| **Líder**      | Cadastra, edita e gerencia motoristas, veículos, rotas e projetos. |
| **Administrador do Sistema** | Gerencia usuários, permissões e manutenção do sistema. |

---

# 🧩 Caso de Uso 1 – Cadastro de Motoristas

**ID:** CU-001  
**Título:** Cadastro de Motoristas  
**Ator Principal:** Líder, Administrador  
**Prioridade:** Must Have  

## Descrição
Permite o cadastro completo de motoristas, incluindo dados pessoais, CNH, foto e controle de disponibilidade.

## Pré-condições
- Usuário autenticado com perfil Líder ou Administrador
- Sistema ativo

## Fluxo Principal
1. Usuário acessa a tela de cadastro
2. Preenche nome, chapa, e-mail, CNH, categoria, validade
3. Define tipo de câmbio (manual/automático/ambos)
4. Define períodos de férias/ausências
5. Sistema valida campos obrigatórios
6. Sistema verifica validade da CNH
7. Sistema calcula disponibilidade
8. Sistema salva e exibe sucesso

## Fluxos Alternativos
- Campos obrigatórios vazios → Exibir mensagem de erro  
- CNH próxima do vencimento → Exibir alerta

## Pós-condições
- Motorista registrado e disponível para escalas

---

# 🧩 Caso de Uso 2 – Cadastro de Veículos

**ID:** CU-002  
**Título:** Cadastro de Veículos  
**Ator Principal:** Líder, Administrador  
**Prioridade:** Must Have  

## Descrição
Permite cadastrar veículos vinculados a projetos e tipos de rota.

## Fluxo Principal
1. Acessar cadastro de veículos
2. Preencher placa, VIN, marca, modelo
3. Selecionar projeto e tipo de rota
4. Sistema valida formato da placa (padrão Mercosul)
5. Sistema valida VIN (17 caracteres)
6. Salvar e exibir na listagem

## Regras de Negócio
- Apenas projetos ativos são permitidos
- Apenas tipos de rota compatíveis podem ser selecionados

---

# 🧩 Caso de Uso 3 – Cadastro de Rotas

**ID:** CU-003  
**Título:** Cadastro de Rotas  
**Ator Principal:** Líder, Administrador  
**Prioridade:** Must Have  

## Descrição
Permite o cadastro e gestão de rotas.

## Fluxo Principal
1. Informar nome da rota
2. Selecionar tipo (City / Dritell / Highway)
3. Informar distância em Km
4. Definir status (ativa/inativa)
5. Salvar rota

## Regras
- Distância deve ser numérica e positiva
- Rota inativa não pode ser alocada

---

# 🧩 Caso de Uso 4 – Geração de Escalas

**ID:** CU-004  
**Título:** Geração de Escalas  
**Ator Principal:** Líder, Administrador  
**Prioridade:** Should Have  

## Descrição
Permite criar escalas manuais ou automáticas.

## Fluxo Manual
1. Selecionar motorista disponível
2. Selecionar veículo compatível
3. Selecionar rota ativa
4. Confirmar escala

## Fluxo Automático
1. Sistema avalia histórico do dia anterior
2. Evita repetição de motorista + rota
3. Considera férias, ausências e CNH
4. Gera escala diária ou semanal

## Regras de Negócio
- Motorista com CNH vencida não pode ser alocado
- Motorista em férias não pode ser escalado

---

# 🧩 Caso de Uso 5 – Relatórios e Logs

**ID:** CU-005  
**Título:** Relatórios e Logs  
**Ator Principal:** Líder, Administrador  
**Prioridade:** Should Have  

## Descrição
Permite gerar relatórios e registrar logs de auditoria.

## Funcionalidades
- Filtro por data (diário/semanal)
- Filtro por turno
- Exportação em PDF e XLSX
- Registro de logs de:
  - Login
  - Logout
  - Inclusão
  - Alteração
  - Exclusão

---

# 🧩 Caso de Uso 6 – Controle de Acesso

**ID:** CU-006  
**Título:** Controle de Acesso e Segurança  
**Ator Principal:** Todos  
**Prioridade:** Must Have  

## Descrição
Controla acesso por perfil.

## Regras
| Perfil | Permissões |
|--------|------------|
| Motorista | Apenas consulta |
| Líder | Gerenciamento parcial |
| Administrador | Gerenciamento total |

## Funcionalidades
- Login por e-mail e senha
- Senhas criptografadas
- Logout seguro
- Bloqueio de acesso indevido

---

# 🧩 Caso de Uso 7 – Interface Responsiva

**ID:** CU-007  
**Título:** Interface Responsiva  
**Ator Principal:** Todos  
**Prioridade:** Should Have  

## Descrição
Adapta o sistema para desktop e mobile.

## Requisitos
- Compatível com Firefox e Edge
- Layout adaptável
- Sem rolagem horizontal indevida
- Botões adaptados para toque

---

# 📌 Tabela de Priorização

| ID     | Requisito                     | Prioridade  |
|--------|--------------------------------|-------------|
| RF-001 | Cadastro de Motoristas        | Must Have   |
| RF-002 | Cadastro de Veículos          | Must Have   |
| RF-003 | Cadastro de Rotas             | Must Have   |
| RF-004 | Geração de Escalas            | Should Have |
| RF-005 | Relatórios e Logs             | Should Have |
| RNF-001| Segurança de Acesso           | Must Have   |
| RNF-002| Interface Responsiva          | Should Have |

---

## ✅ Fim do Documento
