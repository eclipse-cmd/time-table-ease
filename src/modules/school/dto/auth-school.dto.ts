import { ApiProperty } from '@nestjs/swagger';

export class LoginSchoolDto {
  @ApiProperty({ example: 'school@example.com' })
  domainName: string;
  @ApiProperty({ example: 'password123' })
  password: string;
}

export class LoginSchoolAdminDto {
  @ApiProperty({ example: 'admin@lautech.edu.ng' })
  email: string;
  @ApiProperty({ example: 'password123' })
  password: string;
}
