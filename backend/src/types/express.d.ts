export {};

declare global {
    namespace Express {
        interface Request {
            usuario?: {
                usuario_id: number;
                perfil: 'Motorista' | 'Lider' | 'Administrador';
            };
        }
    }
}