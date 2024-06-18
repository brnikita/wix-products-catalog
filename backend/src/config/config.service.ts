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
    } else {
      // Fallback to process env variables when .env file is not found
      this.envConfig = process.env as { [key: string]: string };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}