# 🗺️ Matriz de Rastreabilidade de Requisitos

## 1. Introdução
Esta matriz estabelece a ligação formal entre os requisitos do sistema (RFs e RNFs), suas origens de negócio e os artefatos de Engenharia de Software e Testes criados para implementá-los e validá-los.

A rastreabilidade garante que cada requisito tenha sido considerado, projetado (modelagem) e verificado (testes).

## 2. Artefatos de Destino
Os artefatos referenciados nesta matriz estão localizados na pasta `docs/` do repositório:

| Sigla | Artefato de Destino | Localização Sugerida |
| :--- | :--- | :--- |
| **HU** | Histórias de Usuário | `historias_usuario.md` |
| **CU** | Casos de Uso | `casos_uso.md` |
| **MD** | Modelo de Dados | `modelo_dados.md` (ou Diagrama DER) |
| **BPMN** | Fluxo de Processo de Negócio | `bpmn_escala.png` |
| **Protótipo** | Design de Interface | [Link do Figma](https://www.figma.com/proto/FXp8h9jkp1max36O4aaHNM/Sem-t%C3%ADtulo?node-id=0-1&t=qb9VZSymm1uwYe3J-1) |

## 3. Matriz de Rastreabilidade Completa

| ID | Requisito (Descrição Resumida) | Origem no Negócio / Motivação | Artefatos de Design (Modelagem) | Casos de Teste (CT) Chave |
| :--- | :--- | :--- | :--- | :--- |
| **RF-001** | Cadastro de Motoristas | Necessidade de controle de CNH e Férias (evitar erros de escala). | HU-Motorista-01, CU-GerenciarMotorista, MD | CT-RF001-01: Alerta visual (CNH < 30 dias). CT-RF001-02: Cálculo automático de Disponibilidade. |
| **RF-002** | Cadastro de Veículos | Gestão de Frota, validação de dados (VIN, Placa) e vinculação a Rotas/Projetos. | HU-Veiculo-01, CU-GerenciarVeiculo, MD | CT-RF002-01: Validação de formato (Placa Mercosul e VIN 17 caracteres). |
| **RF-003** | Cadastro de Rotas | Categorização de rotas (City, Dritell, Highway) para planejamento. | HU-Rota-01, CU-GerenciarRota, MD | CT-RF003-01: Bloqueio de uso da rota Inativa em escala. CT-RF003-02: Validação de campo Distância (numérico e positivo). |
| **RF-004** | Cadastro de Projetos | Organização da frota e vínculo de veículos a projetos ativos. | HU-Projeto-01, CU-GerenciarProjeto, MD | CT-RF004-01: Unicidade do Nome. CT-RF004-02: Bloqueio de vínculo a projeto Inativo. |
| **RF-005** | Férias e Ausências | Regra de indisponibilidade (evitar conflito de agenda). | HU-Motorista-02, CU-GerenciarAusencia, MD | CT-RF005-01: Validação de sobreposição de períodos. CT-RF005-02: Bloqueio de motorista no RF-007. |
| **RF-006** | Gerenciamento de Usuários | Requisito de Segurança e Acesso por Perfis (Administrador). | HU-Admin-01, CU-GerenciarUsuario, MD | CT-RF006-01: Tentativa de alteração de perfil por usuário Líder. |
| **RF-007** | Geração de Escalas (Manual e Automática) | Principal demanda: Otimizar o planejamento e aplicar regras de negócio complexas. | HU-Lider-01/02, CU-CriarEscala, **BPMN** | CT-RF007-01: Aplicação da regra de **não repetição** de Veículo/Rota do dia anterior. CT-RF007-02: Tempo de geração automática (< 10s). |
| **RF-008** | Relatórios e Logs | Auditoria, rastreabilidade e geração de documentos de escala (PDF/XLSX). | HU-Lider-03, HU-Admin-02, CU-GerarRelatorio, CU-ConsultarLog | CT-RF008-01: Teste de filtros (Período/Turno). CT-RF008-02: Integridade dos Logs (data, hora, autor). |
| **RF-009** | Tela de Mapas / Visualização | Necessidade de visualização geográfica das rotas cadastradas. | HU-Lider-04, CU-VisualizarRotaNoMapa | CT-RF009-01: Exibição correta do trajeto e quilometragem da rota no mapa. |
| **RNF-001** | Segurança de Acesso | Requisito Crítico: Proteção de dados sensíveis e controle de acesso. | CU-Login, CU-Logout | CT-RNF001-01: Bloqueio de conta por **5 minutos** após 3 tentativas inválidas. CT-RNF001-02: Tentativa de acesso sem sessão (botão "voltar"). |
| **RNF-002** | Interface Responsiva | Experiência do usuário moderna em diversos dispositivos (mobile/desktop). | Protótipo (Figma) | CT-RNF002-01: Teste de renderização nos navegadores Firefox e Edge. CT-RNF002-02: Teste de layout emulando telas de smartphones. |
| **RNF-003** | Arquitetura SPA | Requisito de modernização arquitetural. | Arquitetura Técnica | CT-RNF003-01: Verificação de navegação entre telas sem *full page reload*. |

## 4. Rastreabilidade de Metodologia e Papéis

| ID | Artefato | Propósito | Origem / Requisito do Projeto | Artefato de Controle |
| :--- | :--- | :--- | :--- | :--- |
| **Metodologia** | Uso de Scrum/Kanban | Gerenciamento ágil do projeto e acompanhamento de Sprints. | Projeto Integrado de Engenharia de Software II (Doc .pdf). | Quadro Kanban (Trello ou GitHub Projects). |
| **Papéis** | Definição de Motorista, Líder, Admin. | Estrutura de Permissões e Segurança. | RNF-001, RF-006. | Documento de Requisitos (Item 2). |
| **Documentação** | Repositório de Documentos (`docs/`) | Manter a rastreabilidade e o ciclo de vida do software. | Requisito do Projeto Integrado (Entrega de Documentação). | README.md. |