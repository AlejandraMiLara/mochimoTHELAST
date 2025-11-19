import api from './api';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export interface PaymentProof {
  id: string;
  imageUrl: string;
  status: 'PENDING' | 'APPROVED' | 'REVISION';
  revisionReason?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface ReviewProofDto {
  action: 'APPROVE' | 'REQUEST_REVISION';
  reason?: string;
}

export const paymentService = {
  async uploadProof(projectId: string, file: File): Promise<PaymentProof> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/projects/${projectId}/upload-proof`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getProofsForProject(projectId: string): Promise<PaymentProof[]> {
    const response = await api.get(`/projects/${projectId}/proofs`);
    return response.data;
  },

  async reviewProof(proofId: string, data: ReviewProofDto): Promise<{ message: string }> {
    const response = await api.post(`/proofs/${proofId}/review`, data);
    return response.data;
  }
};
