import { Router } from 'express';
import projetosRoute from '../modules/projetos/projetos.routes.js'

const router = Router();

// Verifica se a API está funcionando.
router.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'API Rota 360 funcionando'
    });
});

router.use("/projetos", projetosRoute);


export default router;