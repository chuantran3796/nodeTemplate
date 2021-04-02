"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var DepartmentController_1 = __importDefault(require("controllers/DepartmentController"));
var JWTMiddleware_1 = __importDefault(require("middleware/JWTMiddleware"));
var router = express_1.default.Router();
router.get('/', DepartmentController_1.default.get);
router.get('/:_id', DepartmentController_1.default.getOne);
router.post('/', JWTMiddleware_1.default, DepartmentController_1.default.post);
router.put('/:_id', JWTMiddleware_1.default, DepartmentController_1.default.put);
router.delete('/:_id', JWTMiddleware_1.default, DepartmentController_1.default.delete);
exports.default = router;
