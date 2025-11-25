import api from './api';

export interface Contract {
  id: string;
  content: string;
  price: number;
  includesIva: boolean;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REVISION';
  revisionReason?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface CreateContractDto {
  projectId: string;
  price: number;
  includesIva: boolean;
  content?: string;
}

export interface ReviewContractDto {
  action: 'APPROVE' | 'REQUEST_REVISION';
  reason?: string;
}

export const contractService = {
  async createContract(data: CreateContractDto): Promise<Contract> {
    const response = await api.post('/contracts', data);
    return response.data;
  },

  async submitContract(contractId: string): Promise<{ message: string }> {
    const response = await api.post(`/contracts/${contractId}/submit`);
    return response.data;
  },

  async getContractForProject(projectId: string): Promise<Contract> {
    const response = await api.get(`/projects/${projectId}/contract`);
    return response.data;
  },

  async reviewContract(contractId: string, data: ReviewContractDto): Promise<{ message: string }> {
    const response = await api.post(`/contracts/${contractId}/review`, data);
    return response.data;
  },

  async updateContract(contractId: string, data: CreateContractDto): Promise<Contract> {
    const response = await api.post(`/contracts/${contractId}/update`, data);
    return response.data;
  }
};
