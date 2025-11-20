import api from "./api";
import type { AuthUser } from "../types";

export interface ProfileDetails {
  bio?: string | null;
  avatarUrl?: string | null;
}

export interface PaymentDataPayload {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
}

export const getMyProfile = async (): Promise<AuthUser> => {
  const response = await api.get<AuthUser>('/profile/me');
  return response.data;
};

export const updateMyProfile = async (data: ProfileDetails) => {
  const response = await api.put<ProfileDetails>('/profile/me', data);
  return response.data;
};

export const getMyPaymentData = async () => {
  const response = await api.get<PaymentDataPayload>('/profile/payment');
  return response.data;
};

export const updateMyPaymentData = async (data: PaymentDataPayload) => {
  const response = await api.put<PaymentDataPayload>('/profile/payment', data);
  return response.data;
};

export const getFreelancerPaymentData = async (projectId: string) => {
  const response = await api.get<PaymentDataPayload>(
    `/profile/project-payment/${projectId}`
  );
  return response.data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post('/profile/avatar', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};