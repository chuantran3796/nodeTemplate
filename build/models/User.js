"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("User", exports.UserSchema);
