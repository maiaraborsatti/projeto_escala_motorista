import type { RowDataPacket } from "mysql2/promise";

export type StatusProjeto = "Ativo" | "Inativo";

// Linha da tabela (o que o SELECT devolve)
export interface ProjetoLinha extends RowDataPacket {
    id: number;
    nome: string;
    status: StatusProjeto;
}

// Como o projeto sai da API
export interface Projeto {
    id: number;
    nome: string;
    status: StatusProjeto;
}

// POST /api/projetos (body)
export interface DadosProjeto {
    nome: string;
}

// GET /api/projetos?status=Ativo (query)
export interface FiltroProjetos {
    status?: StatusProjeto;
}

// PUT /api/projetos/:id (body): edição de dados e alternância de status
export interface DadosAtualizacaoProjeto {
    nome?: string;
    status?: StatusProjeto;
}