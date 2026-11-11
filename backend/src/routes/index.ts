import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';

const router = Router();

// Verifica se a API está funcionando.
router.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'API Rota 360 funcionando'
    });
});

// Rotas de autenticação.
router.use('/auth', authRoutes);

export default router;