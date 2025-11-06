export const UserRole = {
  FREELANCER: 'FREELANCER',
  CLIENT: 'CLIENT',
} as const;

type UserRoleValues = typeof UserRole[keyof typeof UserRole];

export type UserRole = UserRoleValues;

export interface AuthUser {
  userId: string;
  email: string;
  role: UserRole;
}