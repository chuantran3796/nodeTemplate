import express from "express";
import controller from "../controllers/StatusController";
import JWTMiddleware from "../middleware/JWTMiddleware";

const router = express.Router();

router.get("/status", JWTMiddleware, controller.get);
router.get("/status/:_id", JWTMiddleware, controller.getOne);
router.post("/status/:_id", JWTMiddleware, controller.create);
router.put("/status/:_id", JWTMiddleware, controller.update);
router.delete("/status/:_id", JWTMiddleware, controller.delete);

export default router;
