import type { PoolConnection } from 'mysql2/promise';
import { pool } from './pool.js';

// <T> é um genérico: a função devolve o mesmo tipo que o `trabalho` retornar.
// `trabalho` recebe a conexão da transação. TUDO que rodar dentro dele
// precisa usar ESSA conexão; queries pelo `pool` ficam fora da transação.
export async function executarEmTransacao<T>(trabalho: (conexao: PoolConnection) => Promise<T>): Promise<T> {
    // Reserva UMA conexão do pool só para esta transação.
    const conexao = await pool.getConnection();

    try {
        // A partir daqui, nada é definitivo até o commit.
        await conexao.beginTransaction();

        // Roda o código do chamador com a conexão reservada.
        const resultado = await trabalho(conexao);

        // Deu tudo certo: torna as alterações definitivas.
        await conexao.commit();

        return resultado;
    } catch (erro) {
        try {
            // Algo falhou: desfaz tudo desde o beginTransaction.
            await conexao.rollback();
        } catch {
            // Se o rollback falhar (ex.: conexão caiu), ignoramos para não esconder o erro original
        }

        // Relança o erro original para o middleware tratar.
        throw erro;
    } finally {
        // SEMPRE devolve a conexão ao pool, com sucesso ou erro.
        conexao.release();
    }
}