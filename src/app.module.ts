import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { datasourceOptions } from './db/data-source';
import { SchoolModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        ENV: Joi.string().valid('dev', 'production', 'staging').default('dev'),
        DEBUG: Joi.boolean().default(true),
        PORT: Joi.number().default(2000),
        DB_HOST: Joi.string().required().default('localhost'),
        DB_PORT: Joi.number().required().default(5432),
        DB_NAME: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        BCRYPT_SALT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
      validationOptions: { abortEarly: true },
    }),
    TypeOrmModule.forRoot(datasourceOptions),
    SchoolModule,
  ],
})
export class AppModule {}
