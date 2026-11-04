# Imagem base com Node.js
FROM node:24.15.0-bookworm-slim

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci

# Copia o restante dos arquivos do frontend
COPY . .

# Porta utilizada pelo Vite
EXPOSE 5173

# Inicia o servidor de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]