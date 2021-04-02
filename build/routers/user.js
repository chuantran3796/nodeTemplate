"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var JWTMiddleware_1 = __importDefault(require("../middleware/JWTMiddleware"));
var UserController_1 = __importDefault(require("../controllers/UserController"));
var router = express_1.default.Router();
router.post('/login', UserController_1.default.login);
router.post('/register', UserController_1.default.register);
router.get('/refresh-token', UserController_1.default.refreshToken);
router.post('/update-info', JWTMiddleware_1.default, UserController_1.default.updateInfo);
exports.default = router;
