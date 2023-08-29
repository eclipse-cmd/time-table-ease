import { appConfig } from '@/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { SchoolController } from './controllers/school.controller';
import { Course, Department, Faculty, School, SchoolAdmin } from './entities';
import { SchoolService } from './school.service';
import { JwtStrategy } from './strategies/auth.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: appConfig.JWT_SECRET,
      signOptions: { expiresIn: appConfig.JWT_EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([School, SchoolAdmin, Course, Faculty, Department]),
  ],
  controllers: [SchoolController, AuthController],
  providers: [SchoolService, JwtStrategy],
})
export class SchoolModule {}
