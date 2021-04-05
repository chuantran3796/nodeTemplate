import express from "express";
import controller from "../controllers/NotificationController";
import JWTMiddleware from "../middleware/JWTMiddleware";

const router = express.Router();

router.get("/playlist", JWTMiddleware, controller.get);
router.get("/playlist/:_id", JWTMiddleware, controller.getOne);

export default router;
