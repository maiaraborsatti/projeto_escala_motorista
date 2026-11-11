import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { ambiente } from '../config/env.js';

const perfisValidos = [
    'Motorista',
    'Lider',
    'Administrador',
] as const;

type Perfil = typeof perfisValidos[number];

function ehPerfilValido(perfil: unknown): perfil is Perfil {
    return (
        typeof perfil === 'string' &&
        perfisValidos.some(perfilValido => perfilValido === perfil)
    );
}

// Verifica o token JWT e identifica o usuário autenticado.
export const autenticarToken: RequestHandler = (req, res, next) => {
    const autorizacao = req.get('authorization');

    // Verifica se o cabeçalho Authorization foi enviado.
    if (!autorizacao) {
        res.status(401).json({
            status: 'error',
            message: 'Token de autenticação não informado.',
        });
        return;
    }

    // Verifica se o token está no formato Bearer.
    const partes = autorizacao.split(' ');

    if (
        partes.length !== 2 ||
        !partes[0] ||
        partes[0].toLowerCase() !== 'bearer' ||
        !partes[1]
    ) {
        res.status(401).json({
            status: 'error',
            message: 'Formato do token inválido. Utilize Bearer.',
        });
        return;
    }

    const token = partes[1];

    try {
        // Valida assinatura, algoritmo e expiração do token.
        const payload = jwt.verify(
            token,
            ambiente.auth.jwtSecret,
            { algorithms: ['HS256'] }
        );

        // Verifica se o conteúdo do token possui os dados esperados.
        if (
            typeof payload === 'string' ||
            typeof payload.sub !== 'string' ||
            !/^[1-9]\d*$/.test(payload.sub) ||
            !ehPerfilValido(payload.perfil)
        ) {
            res.status(401).json({
                status: 'error',
                message: 'Token de autenticação inválido.',
            });
            return;
        }

        // Disponibiliza os dados do usuário para as próximas etapas.
        req.usuario = {
            usuario_id: Number(payload.sub),
            perfil: payload.perfil,
        };

        next();
    } catch {
        res.status(401).json({
            status: 'error',
            message: 'Token inválido ou expirado.',
        });
    }
};