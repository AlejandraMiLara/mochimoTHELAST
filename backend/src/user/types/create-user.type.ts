import { Role } from '@prisma/client';

export type CreateUserDto = {
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  role?: Role;
};