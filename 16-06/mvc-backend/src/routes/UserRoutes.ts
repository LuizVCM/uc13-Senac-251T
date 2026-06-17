import { Router } from "express";
import { UsuarioController } from "../controllers/UserController";

const router = Router()
 const controller = new UsuarioController()

router.get("/usuarios", (req, res) => controller.listUsuarios(req, res))
router.get("/usuarios/:id", (req, res) => controller.getUsuario(req, res))
router.post("/usuarios", (req, res) => controller.createUsuario(req, res))
router.put("/usuarios/:id", (req, res) => controller.updateUsuario(req, res))
router.delete("/usuarios/:id", (req, res) => controller.deleteUsuario(req, res))

export default router