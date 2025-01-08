"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ProductController = void 0;
var common_1 = require("@nestjs/common");
var ProductController = /** @class */ (function () {
    function ProductController(productService) {
        this.productService = productService;
    }
    ProductController.prototype.create = function (createProductDto) {
        return this.productService.create(createProductDto);
    };
    ProductController.prototype.findAll = function () {
        return this.productService.findAll();
    };
    ProductController.prototype.findOne = function (id) {
        return this.productService.findOne(id);
    };
    ProductController.prototype.update = function (id, updateProductDto) {
        return this.productService.update(id, updateProductDto);
    };
    ProductController.prototype.remove = function (id) {
        return this.productService.remove(id);
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], ProductController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], ProductController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], ProductController.prototype, "findOne");
    __decorate([
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], ProductController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], ProductController.prototype, "remove");
    ProductController = __decorate([
        (0, common_1.Controller)('products')
    ], ProductController);
    return ProductController;
}());
exports.ProductController = ProductController;
