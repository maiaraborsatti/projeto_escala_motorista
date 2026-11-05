import express from 'express';

const app = express();

// Permite receber requisições com corpo JSON.
app.use(express.json());

export default app;