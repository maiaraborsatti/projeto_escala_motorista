import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ambiente } from '../../config/env.js';
import type { LoginInput } from './auth.schema.js';

import {
    buscarPorEmail,
    registrarAuditoria,
    registrarTentativaInvalida,
    resetarTentativas,
} from './auth.repository.js';

// Resultado possível da autenticação.
type ResultadoLogin =
    | {
        sucesso: true;
        token: string;
        usuario: {
            usuario_id: number;
            nome: string;
            email: string;
            perfil: string;
            motorista_chapa: string | null;
        };
    }
    | {
        sucesso: false;
        motivo: 'CREDENCIAIS_INVALIDAS' | 'USUARIO_BLOQUEADO';
    };

// Executa as regras de negócio do login.
export async function autenticar(
    dados: LoginInput
): Promise<ResultadoLogin> {
    const usuario = await buscarPorEmail(dados.email);

    // Verifica se o e-mail está cadastrado.
    if (!usuario) {
        await registrarAuditoria(
            'LOGIN_EMAIL_DESCONHECIDO',
            `Tentativa de login com e-mail não cadastrado: ${dados.email}`
        );

        return {
            sucesso: false,
            motivo: 'CREDENCIAIS_INVALIDAS',
        };
    }

    // Verifica se a conta está bloqueada.
    if (usuario.bloqueado) {
        return {
            sucesso: false,
            motivo: 'USUARIO_BLOQUEADO',
        };
    }

    // Compara a senha informada com o hash armazenado.
    const senhaValida = await bcrypt.compare(
        dados.senha,
        usuario.senha_hash
    );

    if (!senhaValida) {
        const bloqueado = await registrarTentativaInvalida(
            usuario.usuario_id
        );

        await registrarAuditoria(
            'LOGIN_FALHA',
            'Tentativa de login com senha incorreta.',
            usuario.usuario_id
        );

        if (bloqueado) {
            await registrarAuditoria(
                'LOGIN_BLOQUEIO',
                'Conta bloqueada após três tentativas inválidas.',
                usuario.usuario_id
            );

            return {
                sucesso: false,
                motivo: 'USUARIO_BLOQUEADO',
            };
        }

        return {
            sucesso: false,
            motivo: 'CREDENCIAIS_INVALIDAS',
        };
    }

    // Reseta as tentativas após autenticação bem-sucedida.
    await resetarTentativas(usuario.usuario_id);

    // Gera o token JWT com validade de uma hora.
    const token = jwt.sign(
        {
            perfil: usuario.perfil,
        },
        ambiente.auth.jwtSecret,
        {
            subject: String(usuario.usuario_id),
            expiresIn: ambiente.auth.jwtExpiresIn,
        }
    );

    await registrarAuditoria(
        'LOGIN_SUCESSO',
        'Login realizado com sucesso.',
        usuario.usuario_id
    );

    return {
        sucesso: true,
        token,
        usuario: {
            usuario_id: usuario.usuario_id,
            nome: usuario.nome,
            email: usuario.email,
            perfil: usuario.perfil,
            motorista_chapa: usuario.motorista_chapa,
        },
    };
}