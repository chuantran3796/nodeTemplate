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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var helper_1 = require("./helper");
var AbstractRestController = /** @class */ (function () {
    function AbstractRestController(model) {
        var _this = this;
        this.getOne = function (req, res, next) {
            var _id = req.params._id;
            var select = req.query.select;
            var exec = _this.model.findOne({ _id: _id });
            if (select) {
                exec.select(select.toString().replace(/,/g, " "));
            }
            exec
                .then(function (result) {
                return res.status(200).json({
                    data: result,
                });
            })
                .catch(function (error) {
                return res.status(500).json({
                    message: error.message,
                    error: error,
                });
            });
        };
        this.get = function (req, res, next) {
            var _a = req.query, _b = _a.sort, sort = _b === void 0 ? { _id: "desc" } : _b, _c = _a.limit, limit = _c === void 0 ? "15" : _c, _d = _a.page, page = _d === void 0 ? "1" : _d, select = _a.select;
            var exec = _this.model.find();
            if (select) {
                exec.select(select.toString().replace(/,/g, " "));
            }
            page = parseInt(page);
            limit = parseInt(limit);
            if (page > 1) {
                exec.skip(limit * (page - 1));
            }
            exec.limit(limit);
            var paginate = {
                currentPage: page,
                perPage: limit,
            };
            Promise.all([exec.exec(), _this.model.count]).then(function (_a) {
                var data = _a[0], count = _a[1];
                return res.status(200).json({
                    data: data,
                    paginate: __assign(__assign({}, paginate), { total: count }),
                });
            });
        };
        this.post = function (req, res, next) {
            var data = new _this.model(__assign(__assign({}, req.body), { _id: new mongoose_1.default.Types.ObjectId() }));
            return data
                .save()
                .then(function (result) {
                return res.status(201).json({
                    data: result,
                });
            })
                .catch(function (error) {
                return res.status(500).json({
                    message: error.message,
                    error: error,
                });
            });
        };
        this.put = function (req, res, next) {
            var _id = req.params._id;
            _this.model
                .updateOne({ _id: _id }, {
                $set: helper_1.objExclude(req.body, { createdAt: 1, updatedAt: 1 }),
            }, { runValidators: true })
                .then(function (result) {
                res.status(200).json({
                    data: result,
                });
            })
                .catch(function (error) {
                return res.status(500).json({
                    message: error.message,
                    error: error,
                });
            });
        };
        this.delete = function (req, res, next) {
            var _id = req.params._id;
            _this.model
                .deleteOne({ _id: _id })
                .then(function (result) {
                res.status(200).json({
                    data: result,
                });
            })
                .catch(function (error) {
                return res.status(500).json({
                    message: error.message,
                    error: error,
                });
            });
        };
        this.model = model;
    }
    return AbstractRestController;
}());
exports.default = AbstractRestController;
