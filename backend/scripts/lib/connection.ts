import mysql from 'mysql2/promise';
import { ambiente } from '../../src/config/env.ts';

export async function conexaoMigrations() {

    try {
        const conexao = await mysql.createConnection({
            host: ambiente.banco.host,
            user: ambiente.banco.usuario,
            password: ambiente.banco.senha,
            database: ambiente.banco.nome,
            multipleStatements: true,
            port: ambiente.banco.porta
        });

        return conexao;
    } catch (erro) {
        throw new Error('Erro ao conectar as migrations.', { cause: erro });
    }
}