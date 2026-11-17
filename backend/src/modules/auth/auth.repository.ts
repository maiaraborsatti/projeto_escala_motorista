import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../../database/pool.js';

// Representa os dados do usuário necessários para autenticação.
export interface UsuarioAuth extends RowDataPacket {
    usuario_id: number;
    email: string;
    senha_hash: string;
    nome: string;
    perfil: string;
    motorista_chapa: string | null;
    tentativas_login: number;
    bloqueado: boolean;
}

// Busca um usuário pelo e-mail, incluindo seu perfil para definição de acesso.
export async function buscarPorEmail(
    email: string
): Promise<UsuarioAuth | null> {
    const [usuarios] = await pool.execute<UsuarioAuth[]>(
        `SELECT
            u.usuario_id,
            u.email,
            u.senha_hash,
            u.nome,
            p.perfil,
            u.motorista_chapa,
            u.tentativas_login,
            u.bloqueado
        FROM usuario u
        INNER JOIN perfil p ON p.perfil_id = u.perfil_id
        WHERE u.email = ?
        LIMIT 1`,
        [email]
    );

    return usuarios[0] ?? null;
}

// Incrementa as tentativas e bloqueia a conta ao atingir três falhas.
export async function registrarTentativaInvalida(
    usuarioId: number
): Promise<boolean> {
    await pool.execute<ResultSetHeader>(
        `UPDATE usuario
         SET
            bloqueado = IF(tentativas_login >= 2, TRUE, bloqueado),
            tentativas_login = LEAST(tentativas_login + 1, 3)
         WHERE usuario_id = ?
           AND bloqueado = FALSE`,
        [usuarioId]
    );

    const [usuarios] = await pool.execute<RowDataPacket[]>(
        `SELECT bloqueado
         FROM usuario
         WHERE usuario_id = ?
         LIMIT 1`,
        [usuarioId]
    );

    return Boolean(usuarios[0]?.bloqueado);
}

// Zera as tentativas após um login bem-sucedido.
export async function resetarTentativas(
    usuarioId: number
): Promise<void> {
    await pool.execute(
        `UPDATE usuario
         SET tentativas_login = 0
         WHERE usuario_id = ?`,
        [usuarioId]
    );
}

// Registra eventos relacionados à autenticação.
export async function registrarAuditoria(
    acaoTipo: string,
    descricao: string,
    usuarioId: number | null = null
): Promise<void> {
    await pool.execute(
        `INSERT INTO log_auditoria
            (acao_tipo, descricao_detalhada, usuario_id)
         VALUES (?, ?, ?)`,
        [acaoTipo, descricao, usuarioId]
    );
}