import type { RequestHandler } from 'express';

import { loginSchema } from './auth.schema.js';
import { autenticar } from './auth.service.js';

// Recebe e processa a requisição de login.
export const loginController: RequestHandler = async (req, res) => {
    // Valida os dados recebidos.
    const resultadoValidacao = loginSchema.safeParse(req.body);

    if (!resultadoValidacao.success) {
        res.status(400).json({
            status: 'error',
            message: 'Dados de login inválidos.',
            errors: resultadoValidacao.error.issues.map(problema => ({
                campo: problema.path.join('.'),
                mensagem: problema.message,
            })),
        });
        return;
    }

    // Executa a autenticação.
    const resultado = await autenticar(resultadoValidacao.data);

    if (!resultado.sucesso) {
        if (resultado.motivo === 'USUARIO_BLOQUEADO') {
            res.status(403).json({
                status: 'error',
                message: 'Conta bloqueada. Procure um administrador.',
            });
            return;
        }

        res.status(401).json({
            status: 'error',
            message: 'E-mail ou senha inválidos.',
        });
        return;
    }

    // Retorna o token e os dados públicos do usuário.
    res.status(200).json({
        status: 'success',
        message: 'Login realizado com sucesso.',
        token: resultado.token,
        usuario: resultado.usuario,
    });
};