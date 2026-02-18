import { Router } from "express";
import UserController from "./user.controller.js";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.registerUser);
router.put("/:id", UserController.modifyUser);
router.delete("/:id", UserController.removeUser);

export default router;