"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var md5_1 = __importDefault(require("md5"));
var Token_1 = __importDefault(require("../models/Token"));
var User_1 = __importDefault(require("../models/User"));
exports.default = {
    login: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, user, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password;
                    return [4 /*yield*/, User_1.default.findOne({
                            username: username,
                            password: md5_1.default(password),
                        })];
                case 1:
                    user = _e.sent();
                    if (!user) return [3 /*break*/, 3];
                    _c = (_b = res).json;
                    _d = {
                        username: username
                    };
                    return [4 /*yield*/, Token_1.default.createToken(user)];
                case 2: return [2 /*return*/, _c.apply(_b, [(_d.token = _e.sent(),
                            _d)])];
                case 3: return [2 /*return*/, res.status(500).json({
                        message: "Username or Password not exits!",
                    })];
            }
        });
    }); },
    register: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, user, register;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password;
                    return [4 /*yield*/, User_1.default.findOne({ username: username })];
                case 1:
                    user = _b.sent();
                    if (user) {
                        return [2 /*return*/, res.status(500).json({
                                message: "User have exits!",
                            })];
                    }
                    register = new User_1.default(__assign(__assign({}, req.body), { username: username, password: md5_1.default(password) }));
                    return [2 /*return*/, register
                            .save()
                            .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                            var user, _a, _b;
                            var _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        user = JSON.parse(JSON.stringify(result));
                                        delete user.password;
                                        delete user.id;
                                        delete user.__v;
                                        delete user.createdAt;
                                        delete user.updatedAt;
                                        _b = (_a = res).json;
                                        _c = {
                                            user: user
                                        };
                                        return [4 /*yield*/, Token_1.default.createToken(user)];
                                    case 1: return [2 /*return*/, _b.apply(_a, [(_c.token = _d.sent(),
                                                _c)])];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            return res.status(500).json({
                                message: error.message,
                                error: error,
                            });
                        })];
            }
        });
    }); },
    refreshToken: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var refreshToken, token, _a, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    refreshToken = req.body.refreshToken;
                    if (refreshToken == null) {
                        return [2 /*return*/, res.status(403).json({
                                error: 1,
                                error_code: "REFRESH_TOKEN_REQUIRED",
                                message: "refreshToken is required",
                            })];
                    }
                    return [4 /*yield*/, Token_1.default.findOne({ refreshToken: refreshToken })];
                case 1:
                    token = _d.sent();
                    if (!token) {
                        return [2 /*return*/, res.status(403).json({
                                error: 1,
                                error_code: "REFRESH_TOKEN_NOT_EXISTS",
                                message: "refreshToken not exists",
                            })];
                    }
                    _b = (_a = res).json;
                    _c = {};
                    return [4 /*yield*/, Token_1.default.refreshToken(refreshToken, res)];
                case 2: return [2 /*return*/, _b.apply(_a, [(_c.accessToken = _d.sent(),
                            _c)])];
            }
        });
    }); },
    updateInfo: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var name, user;
        return __generator(this, function (_a) {
            name = req.body.name;
            user = req.user;
            User_1.default.findOneAndUpdate({ _id: user._id }, { $set: { name: name } }, { runValidators: true, new: true })
                .then(function (result) { return res.json(result); })
                .catch(function (error) {
                return res.status(500).json({ message: error.message, error: error });
            });
            return [2 /*return*/];
        });
    }); },
};
