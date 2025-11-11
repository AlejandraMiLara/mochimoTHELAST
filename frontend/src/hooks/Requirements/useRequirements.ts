import { useState, useEffect } from "react";
import { useAuth } from "../useAuth";
import { requirementService, type RequirementResponse, type ProjectResponse } from "../../services/requirement.service";

export type RequirementStatus = "PENDING" | "SUBMITTED" | "APPROVED" | "REVISION";
export type ProjectStatus = "PENDING" | "REVIEW" | "APPROVED" | "INPROGRESS" | "COMPLETED";

export interface Requirement {
  id: string;
  description: string;
  status: RequirementStatus;
  revisionReason?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
}

export function useRequirements(projectId: string) {
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFreelancer = user ? String(user.role) === "FREELANCER" : false;
  const isClient = user ? String(user.role) === "CLIENT" : false;

  const canEditRequirements = isFreelancer && project?.status === "PENDING";
  const canSubmitForReview = isFreelancer && project?.status === "PENDING" && requirements.length > 0;
  const canReview = isClient && project?.status === "REVIEW";

  const loadProject = async () => {
    try {
      const projectData = await requirementService.getProject(projectId);
      setProject(projectData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar proyecto');
    }
  };

  const loadRequirements = async () => {
    try {
      const requirementsData = await requirementService.getRequirements(projectId);
      setRequirements(requirementsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar requisitos');
    }
  };

  const loadData = async () => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([loadProject(), loadRequirements()]);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  const createRequirement = async (description: string) => {
    if (!canEditRequirements) return;

    try {
      const newRequirement = await requirementService.createRequirement(projectId, description);
      setRequirements([...requirements, newRequirement]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear requisito');
    }
  };

  const updateRequirement = async (id: string, description: string) => {
    if (!canEditRequirements) return;

    try {
      const updatedRequirement = await requirementService.updateRequirement(id, description);
      setRequirements(requirements.map(r => r.id === id ? updatedRequirement : r));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar requisito');
    }
  };

  const deleteRequirement = async (id: string) => {
    if (!canEditRequirements) return;

    try {
      await requirementService.deleteRequirement(id);
      setRequirements(requirements.filter(r => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar requisito');
    }
  };

  const submitForReview = async () => {
    if (!canSubmitForReview) return;

    try {
      const updatedProject = await requirementService.submitForReview(projectId);
      setProject(updatedProject);
      await loadRequirements();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar a revisión');
    }
  };

  const reviewRequirements = async (action: "APPROVE" | "REVISION", reason?: string) => {
    if (!canReview) return;

    try {
      const updatedProject = await requirementService.reviewRequirements(projectId, action, reason);
      setProject(updatedProject);
      await loadRequirements();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al revisar requisitos');
    }
  };

  return {
    project,
    requirements,
    loading,
    error,
    isFreelancer,
    isClient,
    canEditRequirements,
    canSubmitForReview,
    canReview,
    createRequirement,
    updateRequirement,
    deleteRequirement,
    submitForReview,
    reviewRequirements,
    loadData,
  };
}