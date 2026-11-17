import { Router } from 'express';
<<<<<<< HEAD
import projetosRoute from '../modules/projetos/projetos.routes.js'
=======
import authRoutes from '../modules/auth/auth.routes.js';
>>>>>>> master

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
router.use("/projetos", projetosRoute);

export default router;