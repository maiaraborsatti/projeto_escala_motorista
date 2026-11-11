import type { RowDataPacket } from 'mysql2';
import { conexaoMigrations } from './lib/connection.ts';
import { rodarMigration } from './lib/migrate.ts';

interface Tabela extends RowDataPacket {
    TABLE_NAME: string;
}

const conexao = await conexaoMigrations();

try {
    console.log('Iniciando reset do banco de dados...');

    // Desativa temporariamente as verificações de chaves estrangeiras.
    await conexao.query('SET FOREIGN_KEY_CHECKS = 0');

    // Busca todas as tabelas do banco selecionado.
    const [tabelas] = await conexao.query<Tabela[]>(
        `SELECT TABLE_NAME
         FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_TYPE = 'BASE TABLE'`
    );

    // Exclui todas as tabelas encontradas.
    for (const tabela of tabelas) {
        const nome = tabela.TABLE_NAME.replace(/`/g, '``');

        await conexao.query(`DROP TABLE IF EXISTS \`${nome}\``);

        console.log(`Tabela excluída: ${nome}`);
    }

    // Reativa as verificações de chaves estrangeiras.
    await conexao.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Banco limpo. Executando migrations...');

    // Recria todas as tabelas.
    await rodarMigration(conexao);

    console.log('Reset concluído com sucesso!');

} catch (erro) {
    console.error('Erro ao resetar o banco:', erro);
    process.exitCode = 1;

} finally {
    await conexao.end();
}