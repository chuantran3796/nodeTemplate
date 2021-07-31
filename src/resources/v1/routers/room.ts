import express from "express";
import controller from "../controllers/RoomController";

const router = express.Router();

router.post("/", controller.createRoom);
router.get("/", controller.getRoom);

export default router;
