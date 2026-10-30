import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import type { RowDataPacket } from "mysql2";
import type { Conexao } from "./tipos.ts";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PASTA_MIGRATIONS = join(dirname(fileURLToPath(import.meta.url)), "../../migrations");
const NOME_LOCK = 'migrations_lock';
const TIMEOUT_LOCK_SEG = 30;

async function obterLock(conexao: Conexao): Promise<void> {
    const [linhas] = await conexao.query<RowDataPacket[]>(
        'SELECT GET_LOCK(?, ?) AS ok', [NOME_LOCK, TIMEOUT_LOCK_SEG]
    );

    const primeira = linhas[0]

    if (!primeira || primeira.ok !== 1) {
        throw new Error('Não foi possível obter o lock de migrations.');
    }
}

async function liberarLock(conexao: Conexao): Promise<void> {
    await conexao.query('SELECT RELEASE_LOCK(?)', [NOME_LOCK]);
}

async function garantirTabelaControle(conexao: Conexao): Promise<void> {
    await conexao.query('CREATE TABLE IF NOT EXISTS schema_migrations (nome VARCHAR(255) NOT NULL PRIMARY KEY, checksum CHAR(64) NOT NULL, aplicado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)');
}

async function listarArquivos(): Promise<string[]> {
    const todos = await readdir(PASTA_MIGRATIONS);

    return todos.filter((arquivo) => arquivo.endsWith('.sql')).sort();
}

function calcularCheckSum(texto: string): string {
    return createHash('sha256').update(texto).digest('hex');
}

async function buscarAplicadas(conexao: Conexao): Promise<Map<string, string>> {
    const [linhas] = await conexao.query<RowDataPacket[]>('SELECT nome, checksum FROM schema_migrations');

    const aplicadas = new Map<string, string>();

    for (const linha of linhas) {
        aplicadas.set(linha.nome, linha.checksum);
    }

    return aplicadas;
}

async function aplicarMigration(conexao: Conexao, nome: string, texto: string, checksum: string): Promise<void> {
    await conexao.query(texto);

    await conexao.query('INSERT INTO schema_migrations (nome, checksum) VALUES (?, ?)', [nome, checksum]);
}

export async function rodarMigration(conexao: Conexao): Promise<void> {
    await obterLock(conexao)

    try {
        await garantirTabelaControle(conexao);
        const aplicadas = await buscarAplicadas(conexao);

        for (const nome of await listarArquivos()) {
            const texto = await readFile(join(PASTA_MIGRATIONS, nome), 'utf-8');
            const checksum = calcularCheckSum(texto.replace(/\r\n/g, '\n'));

            if (aplicadas.has(nome)) {
                if (aplicadas.get(nome) !== checksum) {
                    throw new Error(`Migrations ${nome} foi alterada depois de aplicada.`)
                }
                console.log(`Já aplicado, pulando: ${nome}`)
                continue
            }

            await aplicarMigration(conexao, nome, texto, checksum);
            console.log(`Migration Aplicada: ${nome}`);
        }

    } finally {
        await liberarLock(conexao);
    }
}