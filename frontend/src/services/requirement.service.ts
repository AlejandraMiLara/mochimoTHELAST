// src/services/requirement.service.ts
import api from "./api";

export type RequirementStatus =
  | "PENDING"
  | "SUBMITTED"
  | "APPROVED"
  | "REVISION";

export interface RequirementResponse {
  id: string;
  description: string;
  status: RequirementStatus;
  revisionReason?: string | null;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

const unwrap = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  const { data } = await request;
  return data;
};

export const requirementService = {
  getRequirementsByProject: (projectId: string) =>
    unwrap<RequirementResponse[]>(
      api.get(`/projects/${projectId}/requirements`)
    ),

  createRequirement: (projectId: string, description: string) =>
    unwrap<RequirementResponse>(
      api.post(`/requirements`, { projectId, description })
    ),

  updateRequirement: (requirementId: string, description: string) =>
    unwrap<RequirementResponse>(
      api.patch(`/requirements/${requirementId}`, { description })
    ),

  deleteRequirement: (requirementId: string) =>
    unwrap<{ message: string }>(api.delete(`/requirements/${requirementId}`)),

  submitForReview: (projectId: string) =>
    unwrap<{ status: string }>(
      api.post(`/projects/${projectId}/requirements/submit`)
    ),

  reviewRequirements: (
    projectId: string,
    action: "APPROVE" | "REQUEST_REVISION",
    reason?: string
  ) =>
    unwrap<{ status: string }>(
      api.post(`/projects/${projectId}/requirements/review`, {
        action,
        reason,
      })
    ),
};
