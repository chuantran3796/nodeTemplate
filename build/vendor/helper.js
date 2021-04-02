"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objExclude = void 0;
function objExclude(obj, field) {
    if (field === void 0) { field = {}; }
    for (var i in obj) {
        if (i in field) {
            delete obj[i];
        }
    }
    return obj;
}
exports.objExclude = objExclude;
