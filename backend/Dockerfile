FROM node:24.15.0-bookworm-slim

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro
COPY package*.json ./

# Instala as dependências conforme o package-lock.json
RUN npm ci

# Copia o restante dos arquivos do backend
COPY . .

# Porta utilizada pela API
EXPOSE 3000

# Inicia o backend em modo de desenvolvimento
CMD ["npm", "run", "dev"]