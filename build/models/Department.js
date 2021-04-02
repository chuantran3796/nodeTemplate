"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var DeparmentSchema = new Schema({
    name: String,
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Department', DeparmentSchema);
