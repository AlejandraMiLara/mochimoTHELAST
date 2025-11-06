import api from './api';
import type { AuthUser } from '../types';

export const getMyProfile = async (): Promise<AuthUser> => {
  const response = await api.get<AuthUser>('/profile/me');
  return response.data;
};