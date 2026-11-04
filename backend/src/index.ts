
import express from 'express';

const app = express();

const PORT = Number(process.env.API_PORT) || 3000;
// Permite que o servidor receba conexões externas ao container Docker.
const HOST = '0.0.0.0';

// Permite receber requisições com corpo JSON
app.use(express.json());

// Inicia o servidor HTTP
app.listen(PORT, HOST, () => {
    console.log(`Servidor Rota 360 ouvindo na porta ${PORT}`);
});
