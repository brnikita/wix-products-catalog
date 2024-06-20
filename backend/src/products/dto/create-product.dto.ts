import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsNumber()
  sku: number;

  @IsString()
  picture: string;

  @IsNumber()
  price: number;

  @IsNumber()
  inventory: number;

  @IsString()
  description: string;
}