import type { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../../database/pool.js";
import type { ProjetoLinha, StatusProjeto } from "./projetos.tipos.js";
import type { Conexao } from "../../database/tipos.js";

export async function listar(status?: StatusProjeto, db: Conexao = pool): Promise<ProjetoLinha[]> {
    if (status) {
        const [linhas] = await db.execute<ProjetoLinha[]>(
            "SELECT projeto_id, nome, status FROM projeto WHERE status = ?",
            [status]
        );
        return linhas;
    }

    const [linhas] = await db.execute<ProjetoLinha[]>(
        "SELECT projeto_id, nome, status FROM projeto"
    );
    return linhas;
}

export async function buscarPorId(
    id: number,
    db: Conexao = pool,
    travar = false
): Promise<ProjetoLinha | undefined> {
    const sql = "SELECT projeto_id, nome, status FROM projeto WHERE projeto_id = ?" + (travar ? " FOR UPDATE" : "");
    const [linhas] = await db.execute<ProjetoLinha[]>(sql, [id]);
    return linhas[0];
}

export async function existeNome(nome: string, db: Conexao = pool, ignorarId?: number): Promise<boolean> {
    if (ignorarId !== undefined) {
        const [linhas] = await db.execute<RowDataPacket[]>(
            "SELECT projeto_id FROM projeto WHERE nome = ? AND projeto_id <> ?",
            [nome, ignorarId]
        );
        return linhas.length > 0;
    }

    const [linhas] = await db.execute<RowDataPacket[]>(
        "SELECT projeto_id FROM projeto WHERE nome = ?",
        [nome]
    );
    return linhas.length > 0;
}

export async function inserir(nome: string, status: StatusProjeto, db: Conexao = pool): Promise<number> {
    const [resultado] = await db.execute<ResultSetHeader>(
        "INSERT INTO projeto (nome, status) VALUES (?, ?)",
        [nome, status]
    );
    return resultado.insertId;
}

export async function atualizar(
    id: number,
    nome: string,
    status: StatusProjeto,
    db: Conexao = pool
): Promise<void> {
    await db.execute<ResultSetHeader>(
        "UPDATE projeto SET nome = ?, status = ? WHERE projeto_id = ?",
        [nome, status, id]
    );
}
