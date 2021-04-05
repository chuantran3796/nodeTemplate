import express from "express";
import controller from "../controllers/RoleController";
import JWTMiddleware from "../middleware/JWTMiddleware";

const router = express.Router();

router.get("/role", JWTMiddleware, controller.get);
router.get("/role/:_id", JWTMiddleware, controller.getOne);
router.post("/role/:_id", JWTMiddleware, controller.create);
router.put("/role/:_id", JWTMiddleware, controller.update);
router.delete("/role/:_id", JWTMiddleware, controller.delete);

export default router;
