import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../models/order.model';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel(createOrderDto);
    return newOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('productIds').exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).populate('productIds').exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel
        .findByIdAndUpdate(id, updateOrderDto, { new: true })
        .populate('productIds')
        .exec();
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
