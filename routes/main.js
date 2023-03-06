import express from "express";
const router = express.Router({ mergeParams: true });
import repoController from "../controllers/repo.js";
import userController from "../controllers/users.js";
import { requireAuth } from "../middleware/requireAuth.js";

router.get("/", repoController.getIndex);
router.get("/verifytoken", requireAuth, userController.verifyToken);
router.post("/login", userController.login);
router.post("/signup", userController.signUp);

export default router;
