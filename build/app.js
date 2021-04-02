"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var logging_1 = __importDefault(require("./vendor/logging"));
var database_1 = __importDefault(require("./config/database"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var path_1 = __importDefault(require("path"));
var http_errors_1 = __importDefault(require("http-errors"));
// api version
var routers_1 = __importDefault(require("./resources/v1/routers"));
var routers_2 = __importDefault(require("./resources/v2/routers"));
var routers_3 = __importDefault(require("./routers"));
var user_1 = __importDefault(require("./routers/user"));
var department_1 = __importDefault(require("./routers/department"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var apiversion_1 = __importDefault(require("./vendor/apiversion"));
// const moduleURL = new URL(import.meta.url);
// global.__dirname = path.dirname(moduleURL.pathname.substring(1));
// Setup config
var NAMESPACE = "Server";
// Setup connect mongodb
mongoose_1.default
    .connect(database_1.default.mongo.url, database_1.default.mongo.options)
    .then(function (result) { return logging_1.default.info(NAMESPACE, "Connected to MongoDB!"); })
    .catch(function (error) { return logging_1.default.error(NAMESPACE, error.message, error); });
// Setup express
var app = express_1.default();
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "pug");
// logger morgan
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Use cookie
app.use(cookie_parser_1.default());
// setup folder contain assets
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// upload file
app.use(express_fileupload_1.default({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
// --START--    App routers
apiversion_1.default(app, {
    v1: routers_1.default,
    v2: routers_2.default,
});
app.use("/", routers_3.default);
app.use("/", user_1.default);
app.use("/department", department_1.default);
// --END--      App routers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    // res.render('error')
    res.json({ error: err });
});
// Setup server
var port = process.env.PORT || 3000;
app.set("port", port);
exports.default = app;
