import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { WixService } from '../wix/wix.service.products';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly wixService: WixService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    const savedProduct = await this.productsRepository.save(product);
    
    // Sync with Wix
    await this.wixService.createProduct(savedProduct);

    return savedProduct;
  }

  async findAll() {
    return this.productsRepository.find();
  }

  async findOne(id: number) {
    return this.productsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productsRepository.update(id, updateProductDto);
    const updatedProduct = await this.productsRepository.findOne({ where: { id } });
    
    // Sync with Wix
    await this.wixService.updateProduct(id.toString(), updatedProduct);

    return updatedProduct;
  }

  async remove(id: number) {
    await this.productsRepository.delete(id);
    
    // Sync with Wix
    await this.wixService.deleteProduct(id.toString());

    return { message: 'Product deleted successfully' };
  }
}