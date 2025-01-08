"use strict";
exports.__esModule = true;
exports.ProductSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    imageUrl: { type: String, required: false }
});
