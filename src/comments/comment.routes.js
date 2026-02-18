import { Router } from "express";
import CommentController from "./comment.controller.js";

const router = Router();

// Sintaxis de referencia directa a clase
router.get("/", CommentController.findAll);
router.post("/", CommentController.addOne);
router.put("/:id", CommentController.modify);
router.delete("/:id", CommentController.remove);

export default router;