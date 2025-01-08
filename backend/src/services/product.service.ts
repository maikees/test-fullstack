import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../models/product.model';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('categoryIds').exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate('categoryIds').exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, updateProductDto, { new: true })
        .populate('categoryIds')
        .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}