"use strict";
exports.__esModule = true;
exports.CategorySchema = void 0;
var mongoose_1 = require("mongoose");
exports.CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true }
});
