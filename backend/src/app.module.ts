import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './models/product.model';
import { CategorySchema } from './models/category.model';
import { OrderSchema } from './models/order.model';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Order', schema: OrderSchema },
    ]),
  ],
  controllers: [
    ProductController,
    CategoryController,
    OrderController,
  ],
  providers: [
    ProductService,
    CategoryService,
    OrderService,
  ],
})
export class AppModule {}
