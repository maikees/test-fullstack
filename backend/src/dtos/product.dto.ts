export class CreateProductDto {
  name!: string;
  description!: string;
  price!: number;
  categoryIds!: string[];
  imageUrl!: string;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  categoryIds?: string[];
  imageUrl?: string;
}
