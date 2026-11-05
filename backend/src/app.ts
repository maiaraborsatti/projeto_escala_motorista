import express from 'express';
import router from './routes/index.js';

const app = express();

// Permite receber requisições com corpo JSON.
app.use(express.json());

// Registra as rotas da API com o prefixo /api.
app.use('/api', router);

export default app;