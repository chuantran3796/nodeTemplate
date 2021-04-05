import express from "express";
import controller from "../controllers/AlbumController";
import JWTMiddleware from "../middleware/JWTMiddleware";

const router = express.Router();

router.get("/album", JWTMiddleware, controller.get);
router.get("/album/:_id", JWTMiddleware, controller.getOne);
router.post("/album/:_id", JWTMiddleware, controller.create);
router.put("/album/:_id", JWTMiddleware, controller.update);
router.delete("/album/:_id", JWTMiddleware, controller.delete);

export default router;
