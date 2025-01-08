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
exports.CategoryController = void 0;
var common_1 = require("@nestjs/common");
var CategoryController = /** @class */ (function () {
    function CategoryController(categoryService) {
        this.categoryService = categoryService;
    }
    CategoryController.prototype.create = function (createCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    };
    CategoryController.prototype.findAll = function () {
        return this.categoryService.findAll();
    };
    CategoryController.prototype.findOne = function (id) {
        return this.categoryService.findOne(id);
    };
    CategoryController.prototype.update = function (id, updateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    };
    CategoryController.prototype.remove = function (id) {
        return this.categoryService.remove(id);
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], CategoryController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], CategoryController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], CategoryController.prototype, "findOne");
    __decorate([
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], CategoryController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], CategoryController.prototype, "remove");
    CategoryController = __decorate([
        (0, common_1.Controller)('categories')
    ], CategoryController);
    return CategoryController;
}());
exports.CategoryController = CategoryController;
