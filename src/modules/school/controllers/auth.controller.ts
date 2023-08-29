import { SuccessResponse } from '@/core';
import { JoiValidationPipe } from '@/pipes/joi.validation.pipe';
import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginSchoolAdminDto } from '../dto/auth-school.dto';
import { SchoolService } from '../school.service';
import { LoginSchoolAdminValidation } from '../validations/auth.validation';

@ApiTags('Authentication')
@Controller('school')
export class AuthController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post('admin/login')
  @UsePipes(new JoiValidationPipe(LoginSchoolAdminValidation))
  async loginAdmin(@Body() loginSchoolAdminDto: LoginSchoolAdminDto, @Res() res: Response) {
    const data = await this.schoolService.loginSchoolAdmin(loginSchoolAdminDto);

    return SuccessResponse(res, { message: 'Login successful', data });
  }
}

/*
  run this to insert test school admin data

  INSERT INTO public.school_admin(
  fullname, email, password, "schoolId")
  VALUES ('tableAdmin', 'admin@lautech.edu.ng', '$2b$10$5LivUswL.abLGwiKmPm7Fur4pI7QxfUL6nMpptj9NCeXUmScastjC', '5cf386e5-b468-48af-9905-f2dcb2c497e2');
*/
