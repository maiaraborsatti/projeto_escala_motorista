import { rodarMigration } from "./lib/migrate.ts";
import { conexaoMigrations } from "./lib/connection.ts";

const conexao = await conexaoMigrations();

try {
    await rodarMigration(conexao);
} catch (erro) {
    console.error('Erro nas migrations ', erro);
    process.exitCode = 1;
} finally {
   await conexao.end();
}

