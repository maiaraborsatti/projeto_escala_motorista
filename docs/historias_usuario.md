# 🧑‍💻 Histórias de Usuário

## 1. Histórias de Gerenciamento e Cadastro

### 🧑‍✈️ HU-001 — Cadastrar Motorista
* **Como** Líder,
* **Eu quero** cadastrar motoristas com dados completos, incluindo CNH e foto,
* **Para** garantir que a escala seja planejada com informações atualizadas e válidas.

#### Critérios de Aceitação
* O sistema deve validar campos obrigatórios (Chapa, CNH, Validade).
* A foto deve ser carregada via upload e exibida no perfil.
* Se a validade da CNH for **menor que 30 dias**, deve ser exibido um alerta visual.
* A **Disponibilidade** deve ser calculada automaticamente (considerando férias/ausências).
* **Relacionado ao RF:** RF-001

### 🚗 HU-002 — Cadastrar Veículo
* **Como** Líder,
* **Eu quero** registrar veículos com placa, VIN, tipo de rota e projeto associado,
* **Para** garantir que só veículos válidos e corretamente vinculados sejam alocados nas escalas.

#### Critérios de Aceitação
* Placa deve seguir padrão Mercosul.
* VIN deve conter **17 caracteres** alfanuméricos.
* O veículo deve ser exibido na listagem imediatamente após o cadastro.
* Deve ser possível vincular apenas projetos **Ativos** (RF-004).
* **Relacionado ao RF:** RF-002, RF-004

### 🗺️ HU-003 — Cadastrar Rota
* **Como** Líder,
* **Eu quero** cadastrar rotas com nome, tipo e distância,
* **Para** organizar corretamente as rotas disponíveis para planejamento.

#### Critérios de Aceitação
* Distância deve ser numérica e positiva (em **km**).
* A Rota é cadastrada com status **"Ativa"** por padrão.
* Rotas com status **"Inativo"** não podem ser usadas na geração de escala.
* **Relacionado ao RF:** RF-003

### 🗓️ HU-004 — Registrar Férias/Ausências
* **Como** Líder,
* **Eu quero** cadastrar períodos de férias e ausências programadas dos motoristas,
* **Para** evitar que eles apareçam como disponíveis ou sejam alocados nas escalas.

#### Critérios de Aceitação
* Não permitir o cadastro de períodos que se **sobreponham** a outros já registrados.
* Impedir que motoristas com ausência registrada sejam alocados nas escalas (RF-007).
* **Relacionado ao RF:** RF-005, RF-007

## 2. Histórias de Escala e Otimização

### 📅 HU-005 — Criar Escala Manual
* **Como** Líder,
* **Eu quero** selecionar motorista, veículo e rota para montar escalas individuais,
* **Para** cobrir necessidades pontuais ou ajustes de emergência.

#### Critérios de Aceitação
* Só permitir a seleção de motoristas e veículos com **status de disponibilidade** ativo.
* Bloquear a seleção se a CNH do motorista estiver vencida.
* **Relacionado ao RF:** RF-007

### 🤖 HU-006 — Gerar Escala Automática
* **Como** Líder,
* **Eu quero** gerar a escala automática diária ou semanal,
* **Para** reduzir o esforço manual e garantir a otimização com regras de variação.

#### Critérios de Aceitação
* O sistema deve aplicar a regra de **não repetir rota/veículo** do dia anterior para o mesmo motorista.
* Respeitar indisponibilidade por férias e CNH válida.
* A execução da geração semanal deve ser concluída em até **10 segundos**.
* **Relacionado ao RF:** RF-007

## 3. Histórias de Segurança, Auditoria e UX

### 🔐 HU-007 — Gerenciar Usuários e Perfis
* **Como** Administrador,
* **Eu quero** gerenciar usuários e atribuir perfis (Motorista, Líder, Admin),
* **Para** garantir que cada usuário tenha acesso apenas às funcionalidades de sua responsabilidade (Segurança).
* **Relacionado ao RF:** RF-006, RNF-001

### 🔐 HU-008 — Acessar o Sistema (Login)
* **Como** Usuário do Sistema,
* **Eu quero** realizar login com meu email e senha,
* **Para** ter acesso às minhas funções e ter minha identidade rastreada.

#### Critérios de Aceitação
* A senha deve ser armazenada de forma criptografada.
* O sistema deve **bloquear o acesso** após 3 tentativas inválidas (RNF-001).
* O nome/email do usuário logado deve ser exibido na tela principal.
* **Relacionado ao RF:** RF-006, RNF-001

### 📊 HU-009 — Gerar Relatórios
* **Como** Líder,
* **Eu quero** exportar relatórios de escala, filtrando por data e turno,
* **Para** facilitar a auditoria e a comunicação da escala nos formatos **PDF e XLSX**.
* **Relacionado ao RF:** RF-008

### 📝 HU-010 — Consultar Logs de Auditoria
* **Como** Administrador,
* **Eu quero** visualizar o histórico de ações do sistema (login, cadastro, exclusão),
* **Para** garantir rastreabilidade completa e inalterável dos dados.

#### Critérios de Aceitação
* O log deve registrar: Data, Hora, Minuto, Segundo, Ação e Usuário que realizou a ação.
* **Relacionado ao RF:** RF-008

### 🧭 HU-011 — Visualizar Escala e Rotas
* **Como** Motorista ou Líder,
* **Eu quero** visualizar a escala com a rota correspondente no mapa,
* **Para** ter uma compreensão visual do trajeto e confirmar a quilometragem.
* **Relacionado ao RF:** RF-009

### 📱 HU-012 — Acessar Interface Responsiva
* **Como** usuário do sistema,
* **Eu quero** usar o aplicativo em desktop e mobile (Firefox/Edge),
* **Para** acessar as funcionalidades de forma consistente e com usabilidade (UX).
* **Relacionado ao RF:** RNF-002, RNF-003