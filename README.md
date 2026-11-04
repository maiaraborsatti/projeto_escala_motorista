<p align="center">
  <img src="./frontend/public/logo.png" alt="Rota 360 Logo" width="220"/>
</p>

<p align="center">
  <h1 align="center">ROTA 360</h1>
  <p align="center"><b>Gestão Inteligente de Motoristas e Jornadas</b></p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/React-blue" alt="React">
  <img src="https://img.shields.io/badge/Node.js-24-green" alt="Node.js">
  <img src="https://img.shields.io/badge/Docker-enabled-blue" alt="Docker">
</p>

---

## 🚀 Sobre o Projeto

O **Rota 360** é uma solução web desenvolvida para otimizar e automatizar o planejamento de escalas de motoristas voltados a testes de rodagem de veículos. 

A plataforma centraliza o gerenciamento de frota, rotas, cadastros de colaboradores e controle rigoroso de conformidade (como validade de CNH e períodos de férias), eliminando processos manuais, reduzindo falhas operacionais e garantindo rastreabilidade através de auditoria e relatórios completos.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React** com **TypeScript**
- **Vite** (Build tool e servidor de desenvolvimento)

### **Backend**
- **Node.js** & **Express** com **TypeScript**
- **MySQL 8** (Banco de dados relacional)

### **Infraestrutura e Ferramentas**
- **Docker & Docker Compose** (Containerização e orquestração de ambiente)
- **Git & GitHub** (Controle de versão)

---

## 📁 Estrutura do Repositório

```text
rota-360/
│
├── 📁 backend/
│   ├── 📁 migrations/       # Migrações do banco de dados
│   ├── 📁 scripts/          # Scripts auxiliares e automações
│   ├── 📁 src/              # Código-fonte da API
│   ├── Dockerfile
│   └── package.json
│
├── 📁 frontend/
│   ├── 📁 public/           # Ativos estáticos (incluindo logo.png)
│   ├── 📁 src/              # Código-fonte da interface web
│   ├── Dockerfile
│   └── package.json
│
├── 📁 docs/                 # Documentação técnica e de engenharia
├── .env.example             # Template de variáveis de ambiente
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Pré-requisitos

- **Git**
- **Node.js 24** e npm (execução local).
- **MySQL 8** (execução local sem Docker).
- **Docker Desktop** e Docker Compose (execução via containers).
  
---

## ⚙️ Configuração do Ambiente

1. Clone o repositório para o seu ambiente local:
   ```bash
   git clone https://github.com/maiaraborsatti/projeto_escala_motorista.git
   cd projeto_escala_motorista
   ```

2. Na raiz do projeto, crie o seu arquivo `.env` utilizando o template de exemplo:
   ```bash
   cp .env.example .env
   ```

3. Abra o arquivo `.env` gerado e configure as variáveis de ambiente e credenciais de acesso conforme necessário:
   ```env
   # Banco de dados
   DB_ROOT_PASSWORD=sua_senha_root
   DB_NAME=escala360
   DB_USER=escala_user
   DB_PASSWORD=sua_senha_usuario
   DB_HOST=127.0.0.1
   DB_PORT=3306

   # Portas dos Serviços
   API_PORT=3000
   FRONTEND_PORT=5173
   ```

---

## 🐳 Execução via Docker (Recomendado)

O uso do Docker Compose unifica o ecossistema da aplicação (Banco de dados, Backend e Frontend) de forma isolada e sem conflitos de dependências locais.

1. **Subir os serviços em segundo plano:**
   ```bash
   docker compose up --build -d
   ```

2. **Verificar os containers em execução:**
   ```bash
   docker compose ps
   ```

3. **Monitorar logs da aplicação:**
   * Visualizar logs gerais:
     ```bash
     docker compose logs -f
     ```
   * Visualizar logs de um serviço específico:
     ```bash
     docker compose logs -f backend
     docker compose logs -f frontend
     ```

4. **Executar as migrações do banco de dados:**
   ```bash
   docker compose exec backend npm run migrate
   ```

5. **Endereços de Acesso:**
   * **Frontend:** `http://localhost:5173`
   * **Backend API:** `http://localhost:3000`
   * **MySQL:** `localhost:3306`

6. **Encerrar os serviços:**
   * Parar os containers mantendo os dados salvos:
     ```bash
     docker compose down
     ```
   * Parar e apagar completamente os volumes de dados:
     ```bash
     docker compose down -v
     ```

---

## 💻 Execução Local (Sem Docker)

Se preferir rodar a aplicação diretamente no sistema operacional, utilize o MySQL instalado em sua máquina local ou inicie apenas o banco via Docker (`docker compose up -d db`).

1. **Configurar e rodar o Backend:**
   ```bash
   cd backend
   npm ci
   npm run migrate
   npm run dev
   ```

2. **Configurar e rodar o Frontend (em outro terminal):**
   ```bash
   cd frontend
   npm ci
   npm run dev
   ```

3. Acesse a aplicação no navegador em: `http://localhost:5173`

---

## 💡 Comandos Úteis

### **Backend** *(Executar dentro da pasta `/backend`)*
| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor backend em modo de desenvolvimento |
| `npm run build` | Compila o projeto TypeScript para produção |
| `npm run typecheck` | Valida a tipagem estática do TypeScript |
| `npm run migrate` | Executa as migrações estruturais no banco de dados |

### **Frontend** *(Executar dentro da pasta `/frontend`)*
| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o ambiente de desenvolvimento Vite |
| `npm run build` | Gera o build otimizado para produção |
| `npm run lint` | Analisa a qualidade estática do código |

---

## 📄 Documentação

A documentação detalhada de modelagem de dados, diagramas de arquitetura, casos de uso e especificações funcionais encontra-se centralizada na pasta **`/docs`** do repositório.

---

## 👥 Equipe

Desenvolvido com foco em excelência em engenharia de software por:
- **[Alvaro Giovanni](https://github.com/alvaroqzdev)**
- **[Geovana Messias](https://github.com/gehlopesmessias)**
- **[Kelvin Adriel](https://github.com/KelvinAdriel)**
- **[Maiara Borsatti](https://github.com/maiaraborsatti)**
- **[Walter Pereira](https://github.com/WalADs)**
- **[William Silva](https://github.com/williamsilvajj)**

---

<p align="center">
  <b>Rota 360</b> — Organização, controle e eficiência na gestão de jornadas.
</p>