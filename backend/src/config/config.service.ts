import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const envFile = path.resolve(__dirname, '../../.env'); 
    if (fs.existsSync(envFile)) {
      this.envConfig = dotenv.parse(fs.readFileSync(envFile));
      console.log('ConfigService: .env file found and loaded', this.envConfig);
    } else {
      // Fallback to process env variables when .env file is not found
      this.envConfig = process.env as { [key: string]: string };
      console.log('ConfigService: .env file not found, using process env variables', this.envConfig);
    }
  }

  get(key: string): string {
    console.log('ConfigService.get', key, this.envConfig[key]);
    return this.envConfig[key];
  }
}