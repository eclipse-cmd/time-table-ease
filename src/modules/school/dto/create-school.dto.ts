export class CreateSchoolDto {
  name: string;
  domainName: string;
  password: string;
}

export class CreateSchoolAdminDto {
  fullname: string;
  email: string;
  password: string;
  schoolId: string;
}
