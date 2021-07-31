import express from "express";
import controller from "../controllers/MemberController";

const router = express.Router();

router.post("/", controller.createMember);
router.get("/", controller.getMember);

export default router;
