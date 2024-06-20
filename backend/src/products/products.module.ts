import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { WixService } from '../wix/wix.service.products';
import { WixOAuthService } from '../wix/wix-oauth.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService, WixService, WixOAuthService, ConfigService],
})
export class ProductsModule {}