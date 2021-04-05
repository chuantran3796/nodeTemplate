import express from "express";
import controller from "../controllers/StoryController";
import JWTMiddleware from "../middleware/JWTMiddleware";

const router = express.Router();

router.get("/story", JWTMiddleware, controller.get);
router.get("/story/:_id", JWTMiddleware, controller.getOne);
router.post("/story/:_id", JWTMiddleware, controller.create);
router.put("/story/:_id", JWTMiddleware, controller.update);
router.delete("/story/:_id", JWTMiddleware, controller.delete);

export default router;
