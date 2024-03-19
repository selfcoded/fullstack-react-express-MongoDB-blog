import express from "express";
import {
  authAdmin,
  authAdminLogin,
  usersController,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/auth/admin", authAdmin);
router.post("/auth/admin/login", authAdminLogin);
router.get("/users", usersController);

export default router;
