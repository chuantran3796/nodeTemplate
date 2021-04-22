import express from "express";
import controller from "../controllers/FireBaseNotification";

const router = express.Router();

router.post("/notification", controller.send);

export default router;
