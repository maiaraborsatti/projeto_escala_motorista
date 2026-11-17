import { Router } from "express";
import { criarProjetoController, listarProjetosController, atualizarProjetoController, excluirProjetoController } from "./projetos.controller.js";

const router = Router();

router.post("/", criarProjetoController);
router.get("/", listarProjetosController);
router.put("/:id", atualizarProjetoController);
router.delete("/:id", excluirProjetoController);

export default router;