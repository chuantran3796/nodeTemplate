import express from "express";
import controller from "../controllers/PlaylistController";
import JWTMiddleware from "../middleware/JWTMiddleware";

const router = express.Router();

router.get("/playlist", JWTMiddleware, controller.get);
router.post("/playlist/:_id", JWTMiddleware, controller.create);
router.put("/playlist/:_id", JWTMiddleware, controller.update);
router.delete("/playlist/:_id", JWTMiddleware, controller.delete);

export default router;
