import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import axios from 'axios';

@Injectable()
export class WixOAuthService {
  private apiUrl: string;
  private oauthUrl: string;
  private apiKey: string;
  private accountId: string;
  private accessToken: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = this.configService.get('WIX_API_URL');
    this.oauthUrl = this.configService.get('WIX_OAUTH_URL');
    this.apiKey = this.configService.get('WIX_API_KEY');
    this.accountId = this.configService.get('WIX_ACCOUNT_ID');
  }

  async authenticate() {
    try {
      const response = await axios.post(this.oauthUrl, {
        client_id: this.apiKey,
        account_id: this.accountId,
        grant_type: 'client_credentials'
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      this.accessToken = response.data.access_token;
      console.log('WixOAuthService: Authentication successful');
    } catch (error) {
      throw new HttpException('Failed to authenticate with Wix', HttpStatus.UNAUTHORIZED);
    }
  }

  async getAccessToken() {
    if (!this.accessToken) {
      await this.authenticate();
    }
    return this.accessToken;
  }
}