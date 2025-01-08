"use strict";
exports.__esModule = true;
exports.OrderSchema = void 0;
var mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    productIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true }],
    total: { type: Number, required: true }
});
