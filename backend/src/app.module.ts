import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule, ProductsModule],
})
export class AppModule {}