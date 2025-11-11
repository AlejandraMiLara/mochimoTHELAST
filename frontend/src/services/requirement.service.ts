import api from './api';

export type RequirementStatus = 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REVISION';
export type ProjectStatus = 'PENDING' | 'REVIEW' | 'APPROVED' | 'INPROGRESS' | 'COMPLETED';

export interface RequirementResponse {
  id: string;
  description: string;
  status: RequirementStatus;
  revisionReason?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface ProjectResponse {
  id: string;
  name: string;
  status: ProjectStatus;
}

export const requirementService = {
  getProject: async (projectId: string): Promise<ProjectResponse> => {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  },

  getRequirements: async (projectId: string): Promise<RequirementResponse[]> => {
    const response = await api.get(`/projects/${projectId}/requirements`);
    return response.data;
  },

  createRequirement: async (projectId: string, description: string): Promise<RequirementResponse> => {
    const response = await api.post('/requirements', { projectId, description });
    return response.data;
  },

  updateRequirement: async (requirementId: string, description: string): Promise<RequirementResponse> => {
    const response = await api.patch(`/requirements/${requirementId}`, { description });
    return response.data;
  },

  deleteRequirement: async (requirementId: string): Promise<void> => {
    await api.delete(`/requirements/${requirementId}`);
  },

  submitForReview: async (projectId: string): Promise<ProjectResponse> => {
    const response = await api.post(`/projects/${projectId}/requirements/submit`);
    return response.data;
  },

  reviewRequirements: async (projectId: string, action: 'APPROVE' | 'REVISION', reason?: string): Promise<ProjectResponse> => {
    const response = await api.post(`/projects/${projectId}/requirements/review`, { action, reason });
    return response.data;
  },
};