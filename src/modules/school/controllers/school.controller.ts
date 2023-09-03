import { SuccessResponse } from '@/core';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AdminAuthRequest } from '../dto/auth-request.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { SchoolService } from '../school.service';

@Controller('school')
@ApiBearerAuth()
@ApiTags('School & Admin Endpoints')
@UseGuards(JwtAuthGuard)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get('admin/auth')
  async me(@Req() { user }: AdminAuthRequest, @Res() res: Response) {
    return SuccessResponse(res, { data: user });
  }
}
