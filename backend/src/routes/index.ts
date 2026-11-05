import { Router } from 'express';

const router = Router();

// Verifica se a API está funcionando.
router.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'API Rota 360 funcionando'
    });
});

export default router;