# Documento de Requisitos – Sistema de Gerenciamento de Escala de Motoristas

## 1. Contexto do Caso
A empresa realiza o planejamento de escalas de motoristas, veículos e rotas de forma manual, o que gera retrabalho, erros e falta de padronização. Além disso, informações sensíveis são armazenadas sem controle de acesso, dificultando auditoria e rastreabilidade.

O sistema proposto visa digitalizar e automatizar esse processo, garantindo segurança, eficiência e redução de erros.

---

## 2. Situação Atual
* Planejamento manual das escalas, rotas e turnos.
* Dificuldade de garantir regras de negócio (evitar repetição de rotas, férias, CNH vencida).
* Controle descentralizado de dados de motoristas e veículos.
* Relatórios (PDF, XLSX, DOCX) são gerados manualmente.
* Vulnerabilidade na segurança da informação, informações sensíveis são armazenadas de forma descentralizada ou em arquivos locais.

---

## 3. Objetivos da Informatização
* Aumentar a eficiência e a agilidade no planejamento de escalas e rotas.
* Cadastrar e organizar motoristas, veículos, rotas e projetos.
* Evitar erros como: motorista com CNH vencida, motorista repetindo rota em dias consecutivos, veículo usado de forma incorreta.
* Gerar relatórios e manter logs para auditoria.
* Adotar arquitetura moderna (SPA) e responsiva.
* Garantir segurança através de controle de acesso por perfis.

---

## 4. Papéis e Atores do Sistema
### **Motorista**
* Consulta apenas sua própria escala.

### **Líder**
* Cadastra, edita e exclui (com restrição) motoristas, veículos, rotas e projetos. A exclusão de algum cadastro (motorista, rota, projeto e carros) será permitida apenas se nunca esteve incluído em uma escala (esteja ela finalizada ou não).
* Visualiza todas as escalas.

### **Administrador do Sistema**
* Tudo que o Líder faz + gerenciar permissões e usuários.
* Acessa logs completos.
* Realizar backups.
* Manter o sistema operacional.

---

# 5. Requisitos Funcionais

## **RF-001: Cadastro de Motoristas**
O sistema deve permitir o cadastro de motoristas com foto, identificação funcional (chapa),dados pessoais, informações da CNH (número, classe e validade),se pode dirigir carro manual, automático ou ambos, períodos de férias/ausências e calcular automaticamente o status de disponibilidade do dia.

### Critérios de Aceitação
1. Somente salva se os campos obrigatórios estiverem preenchidos.
2. A foto deve ser carregada via upload, sendo exibida no perfil do motorista após o cadastro..
3. CNH com menos de 30 dias para vencer exibe alerta.
4. Disponibilidade diária calculada automaticamente (férias, ausências, escala vigente).

### Critérios de Qualidade
* Usabilidade: Interface intuitiva e clara.
* Segurança: Proteção e criptografia de dados da CNH.
* Performance: Salvamento concluído em até 2s.

---

## **RF-002: Cadastro de Veículos**
O sistema deve permitir cadastrar veículos com placa padrão Mercosul, VIN (número do chassi), marca, modelo, tipo de rota e projeto associado.

### Critérios de Aceitação
1. Campos obrigatórios devem estar preenchidos.
2. VIN validado (17 caracteres).
3. Placa validada.
4. Exibição imediata na listagem.
5. Seleção de projeto e tipo de rota compatível.

### Critérios de Qualidade
* Usabilidade: Interface clara e direta.
* Performance: Salvamento concluído em até 2 segundos.
* Consistência: Garante que apenas projetos ativos sejam vinculados.

---

## **RF-003: Cadastro de Rotas**
Cadastrar rotas com nome, tipo (City, Dritell, Highway), distância em km e status ativo/inativo.

### Critérios de Aceitação
1. Campos nome e distância obrigatórios.
2. Distância numérica e positiva.
3. Rota começa como ativa.
4. Rotas inativas não podem ser usadas em escalas.

### Critérios de Qualidade
* Usabilidade: Interface simples para cadastro.
* Consistência: Tipos de rota predefinidos.
* Performance: Consulta e salvamento rápidos.

---

## **RF-004: Cadastro de Projetos**
Cadastrar projetos ativos, que serão vinculados a veículos.

### Critérios de Aceitação
1. Projeto deve ter nome único.
2. Status ativo/inativo.
3. Veículos só podem vincular projetos ativos.

### Critérios de Qualidade
* Consistência: Nome do projeto deve ser único.
* Usabilidade: Fácil alternância de status Ativo/Inativo.
* Performance: Salvamento em tempo aceitável (máx. 2s).

---

## **RF-005: Gerenciamento de Férias e Ausências**
Permitir registrar períodos de férias e ausências programadas para motoristas.

### Critérios de Aceitação
1. O período não pode se sobrepor a outro já cadastrado.
2. Impede alocação em escalas no período.
3. Atualiza o status diário do motorista.

### Critérios de Qualidade
* Confiabilidade: O registro de ausência deve ser à prova de falhas na geração de escala.
* Usabilidade: Seleção de datas clara e intuitiva.

---

## **RF-006: Gerenciamento de Usuários e Perfis**
Gerenciar usuários do sistema, com perfis Motorista, Líder e Administrador.

### Critérios de Aceitação
1. Permitir criar usuários com nome, email, senha e perfil.
2. Apenas Administrador pode alterar perfis.
3. Exibir funcionalidades conforme permissões.

### Critérios de Qualidade
* Segurança: Restrição de acesso para alteração de perfil (apenas Administrador).
* Usabilidade: Gestão de usuários simplificada.
* Rastreabilidade: Toda alteração de perfil gera um log (RF-008).

---

## **RF-007: Geração de Escalas (Manual e Automática)**
Permitir criar escalas selecionando motorista, veículo, rota, turno e data.

### Critérios de Aceitação
*Manual*
1. Permitir apenas motoristas e veículos disponíveis.

*Automática*
1. Deve evitar alocar motorista na mesma rota do dia anterior.
2. Deve evitar alocar veículo repetido no mesmo cenário.
3. Considerar CNH válida, férias e ausências.
4. Geração semanal em até 10 segundos.

### Critérios de Qualidade
* Performance: Tempo de geração automática inferior a 10s.
* Otimização: O algoritmo deve aplicar a regra de variação de veículos e rotas com sucesso.
* Confiabilidade: O bloqueio de indisponibilidade (CNH, Férias) deve funcionar 100%.

---

## **RF-008: Relatórios e Logs**
Gerar relatórios de escalas em PDF, Excel e manter logs detalhados.

### Critérios de Aceitação
1. Logs devem registrar: login, logout, cadastros, edições, exclusões, tentativas falhas.
2. Ações devem registrar data, hora, minuto e segundo.
3. Relatórios filtráveis por período e turno.
4. Exportação para PDF e XLSX.

### Critérios de Qualidade
* Segurança: Acesso aos logs restrito ao Administrador.
* Performance: Geração de relatório semanal em até 10s.
* Confiabilidade: Logs imutáveis e precisos.

---

## **RF-009: Tela de Mapas / Visualização de Rotas**
Exibir visualmente as rotas cadastradas.

### Critérios de Aceitação
1. Mapa deve mostrar trajeto e quilometragem.
2. Usuário pode visualizar rota associada à escala.

### Critérios de Qualidade
* Usabilidade: Visualização clara do trajeto e distância.
* Performance: Carregamento rápido do mapa e da rota.

---

# 6. Requisitos Não Funcionais

## **RNF-001: Segurança de Acesso**
Controle de acesso baseado em papéis, senhas criptografadas, prevenção a SQL Injection.

### Adições
* Bloqueio de conta após 3 tentativas de login inválidas.
* Logout deve invalidar sessão.

### Critérios de Qualidade
* Resiliência: Garantir a proteção contra ataques de força bruta.
* Conformidade: Senhas devem ser armazenadas com algoritmo de hash seguro.

---

## **RNF-002: Interface Responsiva**
Interface deve se adaptar para desktop e mobile, compatível com Firefox e Edge.

### Critérios de Qualidade
* Compatibilidade: Funcionalidade completa nos navegadores Firefox e Edge.
* Usabilidade: Layout fluído em resoluções de tela comuns (mobile e desktop).

---

## **RNF-003: Arquitetura SPA**
Toda navegação ocorre sem recarregar a página, garantindo experiência rápida.

### Critérios de Aceitação
1. Carregamento único da aplicação.
2. Navegação dinâmica entre telas.

### Critérios de Qualidade
* Performance: Navegação instantânea após o carregamento inicial.
* Manutenibilidade: Código modularizado e com baixo acoplamento.

---

# 7. Tabela de Priorização
| ID | Requisito | Prioridade | Justificativa |
|----|-----------|------------|---------------|
| RF-001 | Cadastro de Motoristas | Must Have | Base para escalas |
| RF-002 | Cadastro de Veículos | Must Have | Necessário para alocação |
| RF-003 | Cadastro de Rotas | Must Have | Necessário para planejamento |
| RF-004 | Cadastro de Projetos | Must Have | Vinculação de veículos |
| RF-005 | Férias e Ausências | Must Have | Regras de disponibilidade |
| RF-006 | Usuários e Perfis | Must Have | Segurança e acesso |
| RF-007 | Geração de Escalas | Should Have | Diferencial, mas sistema funciona manualmente |
| RF-008 | Relatórios e Logs | Should Have | Auditoria e rastreabilidade |
| RF-009 | Tela de Mapas | Could Have | Melhora a visualização |
| RNF-001 | Segurança | Must Have | Requisito crítico |
| RNF-002 | Responsividade | Should Have | Melhora usabilidade |
| RNF-003 | SPA | Must Have | Arquitetura do sistema |