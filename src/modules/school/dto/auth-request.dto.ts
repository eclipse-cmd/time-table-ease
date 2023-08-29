import { Request } from 'express';
import { SchoolAdmin } from '../entities';

export type AdminAuthRequest = Request & {
  admin: SchoolAdmin;
};
