import type { Request, RequestHandler } from 'express';

// Reutiliza os perfis definidos na tipagem do Express.
type Perfil = NonNullable<Request['usuario']>['perfil'];

// Verifica se o usuário autenticado possui um dos perfis permitidos.
export function exigirPerfil(
    ...perfisPermitidos: Perfil[]
): RequestHandler {
    return (req, res, next) => {

        // Verifica se o usuário passou pela autenticação.
        if (!req.usuario) {
            res.status(401).json({
                status: 'error',
                message: 'Usuário não autenticado.',
            });
            return;
        }

        // Verifica se o perfil possui autorização para acessar a rota.
        if (!perfisPermitidos.includes(req.usuario.perfil)) {
            res.status(403).json({
                status: 'error',
                message: 'Você não tem permissão para acessar este recurso.',
            });
            return;
        }

        next();
    };
}