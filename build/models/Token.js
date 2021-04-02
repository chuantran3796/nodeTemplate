"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWTMiddleware_1 = require("../middleware/JWTMiddleware");
var TOKEN_EXPIRED = process.env.TOKEN_EXPIRED || "3600000";
var REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refreshToken";
var ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "tokenScret";
var Schema = mongoose_1.default.Schema;
function generateAccessToken(data) {
    return jsonwebtoken_1.default.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXPIRED });
}
exports.TokenSchema = new Schema({
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    expiredIn: { type: Number },
    expiredAt: { type: Number },
    tokenType: {
        type: String,
        enum: ["jwt"],
        default: "jwt",
    },
}, {
    timestamps: true,
});
exports.TokenSchema.statics.createToken = function (user) {
    return __awaiter(this, void 0, void 0, function () {
        var expiredAt, accessToken, refreshToken, result, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expiredAt = new Date();
                    expiredAt.setMilliseconds(expiredAt.getMilliseconds() + parseInt(TOKEN_EXPIRED));
                    accessToken = generateAccessToken({ user: user });
                    refreshToken = jsonwebtoken_1.default.sign({ user: user }, REFRESH_TOKEN_SECRET);
                    result = new this({
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        user: user._id,
                        expiredAt: expiredAt.getTime(),
                        expiredIn: parseInt(TOKEN_EXPIRED),
                    });
                    return [4 /*yield*/, result.save()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, token];
            }
        });
    });
};
exports.TokenSchema.statics.refreshToken = function (refreshToken, res) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET, function (err, user) {
            if (err)
                return JWTMiddleware_1.jwtCacheError(err, res);
            var accessToken = generateAccessToken(user);
            return resolve(accessToken);
        });
    });
};
exports.default = mongoose_1.default.model("token", exports.TokenSchema);
