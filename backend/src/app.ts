import express from 'express';
import router from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.js';

const app = express();

// Permite receber requisições com corpo JSON.
app.use(express.json());

// Registra as rotas da API com o prefixo /api.
app.use('/api', router);

// Tratamento de erros
app.use(errorHandler);

export default app;