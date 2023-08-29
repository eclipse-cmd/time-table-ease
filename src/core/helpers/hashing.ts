import * as bcrypt from 'bcrypt';

import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const hashResource = async (password: string) => {
  const saltOrRounds = Number(configService.get('BCRYPT_SALT'));
  return await bcrypt.hash(password, saltOrRounds);
};

export const hashResourceSync = (password: string) => {
  const saltOrRounds = Number(configService.get('BCRYPT_SALT'));
  return bcrypt.hashSync(password, saltOrRounds);
};

export const verifyHash = async (password: string, hashedResource: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedResource);
};
