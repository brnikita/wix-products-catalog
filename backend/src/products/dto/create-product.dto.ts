import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsNumber()
  @IsOptional()
  inventory?: number;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsArray()
  @IsOptional()
  media?: { src: string; title?: string }[];

  @IsString()
  @IsOptional()
  productType?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  ribbon?: string;

  @IsArray()
  @IsOptional()
  variants?: {
    options: { [key: string]: string };
    sku?: string;
    price?: number;
    inventory?: number;
  }[];
}