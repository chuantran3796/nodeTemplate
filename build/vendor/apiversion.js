"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function apiversion(app, routers) {
    for (var i in routers) {
        for (var j in routers[i]) {
            app.use("/" + i + "/" + j, routers[i][j]);
        }
    }
}
exports.default = apiversion;
