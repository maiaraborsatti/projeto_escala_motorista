import { executarEmTransacao } from "../../database/transacao.js";
import * as projetosRepository from "./projetos.repository.js";
import type {
    DadosProjeto,
    DadosAtualizacaoProjeto,
    Projeto,
    StatusProjeto,
} from "./projetos.tipos.js";

export async function criarProjeto(dados: DadosProjeto): Promise<{ nome: string }> {
    return executarEmTransacao(async (conexao) => {
        if (await projetosRepository.existeNome(dados.nome, conexao)) {
            throw new Error("Projeto já existente com esse nome.");
        }

        await projetosRepository.inserir(dados.nome, "Ativo", conexao);

        return { nome: dados.nome };
    });
}

export async function listarProjetos(status?: StatusProjeto): Promise<Projeto[]> {
    // Leitura simples: sem transação, o repository usa o pool
    return projetosRepository.listar(status);
}

export async function atualizarProjeto(id: number, dados: DadosAtualizacaoProjeto): Promise<Projeto> {
    return executarEmTransacao(async (conexao) => {
        const atual = await projetosRepository.buscarPorId(id, conexao, true);
        if (!atual) {
            throw new Error("Projeto não encontrado.");
        }

        const nome = dados.nome ?? atual.nome;
        const status = dados.status ?? atual.status;

        if (nome !== atual.nome && (await projetosRepository.existeNome(nome, conexao, id))) {
            throw new Error("Já existe um projeto com esse nome.");
        }

        await projetosRepository.atualizar(id, nome, status, conexao);

        return { id, nome, status };
    });
}

export async function excluirProjeto(id: number): Promise<void> {
    return executarEmTransacao(async (conexao) => {
        const projeto = await projetosRepository.buscarPorId(id, conexao, true);
        if (!projeto) {
            throw new Error("Projeto não encontrado.");
        }

        // TODO: quando existir a tabela de escalas, impedir a exclusão se o projeto
        // já esteve em alguma escala (jaEstiveEmEscala no repository + throw aqui).

        await projetosRepository.excluir(id, conexao);
    });
}