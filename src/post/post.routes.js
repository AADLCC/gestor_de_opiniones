import { Router } from "express";
import * as PostController from "./post.controller.js";

const router = Router();

router.get("/", PostController.getPosts);
router.post("/", PostController.createPost);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

export default router;