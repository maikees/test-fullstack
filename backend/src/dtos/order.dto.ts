export class CreateOrderDto {
  readonly date!: Date;
  readonly productIds!: string[];
  readonly total!: number;
}

export class UpdateOrderDto {
  readonly date?: Date;
  readonly productIds?: string[];
  readonly total?: number;
}
