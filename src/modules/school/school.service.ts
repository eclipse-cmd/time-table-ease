import { BaseService } from '@/base.service';
import { verifyHash } from '@/core/helpers/hashing';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginSchoolAdminDto } from './dto/auth-school.dto';
import { CreateSchoolAdminDto, CreateSchoolDto } from './dto/create-school.dto';
import { School, SchoolAdmin } from './entities';

@Injectable()
export class SchoolService extends BaseService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(School) private readonly schoolRepository: Repository<School>,
    @InjectRepository(SchoolAdmin) private readonly schoolAdminRepository: Repository<SchoolAdmin>,
  ) {
    super();
  }

  async registerSchool(createSchoolDto: CreateSchoolDto) {
    try {
      const school = this.schoolRepository.create(createSchoolDto);
      return await this.schoolRepository.save(school);
    } catch (error) {
      throw this.Error(error);
    }
  }

  async registerSchoolAdmin(createSchoolAdminDto: CreateSchoolAdminDto) {
    try {
      const admin = this.schoolAdminRepository.create(createSchoolAdminDto);
      return await this.schoolAdminRepository.save(admin);
    } catch (error) {
      throw this.Error(error);
    }
  }

  async loginSchoolAdmin({ email, password }: LoginSchoolAdminDto) {
    try {
      const admin = await this.schoolAdminRepository.findOne({ where: { email: email } });
      if (!admin) throw new NotAcceptableException('Incorrect login credentials given');

      const verify = await verifyHash(password, admin.password);

      if (!verify) throw new NotAcceptableException('Incorrect login credentials given');
      delete admin.password;

      const token = this.jwtService.sign({ ...admin });

      return { admin, token };
    } catch (error) {
      throw this.Error(error);
    }
  }
}
