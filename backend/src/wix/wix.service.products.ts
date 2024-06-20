import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '../config/config.service';
import { WixOAuthService } from './wix-oauth.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WixService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private wixOAuthService: WixOAuthService
  ) {}

  private async getHeaders() {
    const accessToken = await this.wixOAuthService.getAccessToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    };
  }

  async createProduct(productData: any) {
    try {
      const productsURL = `${this.configService.get('WIX_API_URL')}products`;
      const headers = await this.getHeaders();
      const response = await lastValueFrom(this.httpService.post(productsURL, productData, { headers }));
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to create product in Wix', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProduct(productId: string, productData: any) {
    try {
      const productsURL = `${this.configService.get('WIX_API_URL')}products/${productId}`;
      const headers = await this.getHeaders();
      const response = await lastValueFrom(this.httpService.patch(productsURL, productData, { headers }));
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to update product in Wix', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProduct(productId: string) {
    try {
      const productsURL = `${this.configService.get('WIX_API_URL')}products/${productId}`;
      const headers = await this.getHeaders();
      const response = await lastValueFrom(this.httpService.delete(productsURL, { headers }));
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to delete product from Wix', HttpStatus.BAD_REQUEST);
    }
  }
}