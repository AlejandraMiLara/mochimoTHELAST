// src/services/requirement.service.ts
import api from "./api";

export interface RequirementResponse {
  id: string;
  description: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export const requirementService = {
  // Obtener todos los requerimientos de un proyecto
  getRequirementsByProject: async (
    projectId: string
  ): Promise<RequirementResponse[]> => {
    const response = await api.get(`/projects/${projectId}/requirements`);
    return response.data;
  },
};
