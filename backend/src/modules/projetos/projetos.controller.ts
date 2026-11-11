import type { Request, Response, NextFunction } from "express";
import { criarProjeto, listarProjetos, atualizarProjeto } from "./projetos.service.js";
import type { StatusProjeto, DadosAtualizacaoProjeto } from "./projetos.tipos.js";

const STATUS_VALIDOS: StatusProjeto[] = ["Ativo", "Inativo"];

function statusValido(valor: unknown): valor is StatusProjeto {
    return typeof valor === "string" && STATUS_VALIDOS.includes(valor as StatusProjeto);
}

export async function criarProjetoController(req: Request, res: Response, next: NextFunction) {
    try {
        const { nome } = req.body;

        if (typeof nome !== "string" || nome.trim() === "") {
            res.status(400).json({ erro: "O campo 'nome' é obrigatório." });
            return;
        }

        const resultado = await criarProjeto({ nome: nome.trim() });
        res.status(201).json(resultado);
    } catch (erro) {
        next(erro);
    }
}

export async function listarProjetosController(req: Request, res: Response, next: NextFunction) {
    try {
        const { status } = req.query;

        if (status !== undefined && !statusValido(status)) {
            res.status(400).json({ erro: "O 'status' deve ser 'Ativo' ou 'Inativo'." });
            return;
        }

        const projetos = await listarProjetos(status);
        res.status(200).json(projetos);
    } catch (erro) {
        next(erro);
    }
}

export async function atualizarProjetoController(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({ erro: "O 'id' deve ser um número inteiro positivo." });
            return;
        }

        const { nome, status } = req.body;
        const dados: DadosAtualizacaoProjeto = {};

        if (nome !== undefined) {
            if (typeof nome !== "string" || nome.trim() === "") {
                res.status(400).json({ erro: "O 'nome' deve ser um texto não vazio." });
                return;
            }
            dados.nome = nome.trim();
        }

        if (status !== undefined) {
            if (!statusValido(status)) {
                res.status(400).json({ erro: "O 'status' deve ser 'Ativo' ou 'Inativo'." });
                return;
            }
            dados.status = status;
        }

        if (Object.keys(dados).length === 0) {
            res.status(400).json({ erro: "Envie ao menos 'nome' ou 'status'." });
            return;
        }

        const projeto = await atualizarProjeto(id, dados);
        res.status(200).json(projeto);
    } catch (erro) {
        next(erro);
    }
}