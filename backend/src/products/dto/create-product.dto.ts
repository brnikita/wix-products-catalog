import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  picture: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsNumber()
  inventory: number;

  @IsString()
  description: string;
}