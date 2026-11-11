import { Router } from "express";
import { criarProjetoController, listarProjetosController, atualizarProjetoController } from "./projetos.controller.js";

const router = Router();

router.post("/", criarProjetoController);
router.get("/", listarProjetosController);
router.put("/:id", atualizarProjetoController);

export default router;