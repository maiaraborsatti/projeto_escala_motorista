import app from './app.js';

const PORT = Number(process.env.API_PORT) || 3000;

// Permite que o servidor receba conexões externas ao container Docker.
const HOST = '0.0.0.0';

// Inicia o servidor HTTP.
app.listen(PORT, HOST, () => {
    console.log(`Servidor Rota 360 ouvindo na porta ${PORT}`);
});