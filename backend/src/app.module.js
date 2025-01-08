"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var product_model_1 = require("./models/product.model");
var category_model_1 = require("./models/category.model");
var order_model_1 = require("./models/order.model");
var product_service_1 = require("./services/product.service");
var product_controller_1 = require("./controllers/product.controller");
var category_service_1 = require("./services/category.service");
var category_controller_1 = require("./controllers/category.controller");
var order_service_1 = require("./services/order.service");
var order_controller_1 = require("./controllers/order.controller");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'),
                mongoose_1.MongooseModule.forFeature([
                    { name: 'Product', schema: product_model_1.ProductSchema },
                    { name: 'Category', schema: category_model_1.CategorySchema },
                    { name: 'Order', schema: order_model_1.OrderSchema },
                ]),
            ],
            controllers: [
                product_controller_1.ProductController,
                category_controller_1.CategoryController,
                order_controller_1.OrderController,
            ],
            providers: [
                product_service_1.ProductService,
                category_service_1.CategoryService,
                order_service_1.OrderService,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
