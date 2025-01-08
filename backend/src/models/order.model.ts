import { Schema, Document } from 'mongoose';

export const OrderSchema = new Schema({
  date: { type: Date, required: true },
  productIds: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  total: { type: Number, required: true },
});

export interface Order extends Document {
  id: string;
  date: Date;
  productIds: string[];
  total: number;
}
