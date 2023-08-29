import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const appConfig = {
  APP_NAME: configService.getOrThrow('APP_NAME'),
  ENV: configService.getOrThrow('ENV'),
  DEBUG: configService.getOrThrow('DEBUG'),
  PORT: configService.getOrThrow<number>('PORT'),

  BCRYPT_SALT: configService.getOrThrow('BCRYPT_SALT'),
  JWT_SECRET: configService.getOrThrow('JWT_SECRET'),
  JWT_EXPIRES_IN: configService.getOrThrow('JWT_EXPIRES_IN'),
};
