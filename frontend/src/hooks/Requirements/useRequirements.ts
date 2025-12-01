import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../useAuth";
import api from "../../services/api";
import {
  requirementService,
  type RequirementResponse,
} from "../../services/requirement.service";

export type Requirement = RequirementResponse;

export type ProjectStatus =
  | "PENDING"
  | "REVIEW"
  | "APPROVED"
  | "INPROGRESS"
  | "PAYMENT"
  | "COMPLETED"
  | "CONTRACT_REVIEW"
  | "CONTRACT_APPROVED";

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status: ProjectStatus;
  ownerId: string;
}

const getErrorMessage = (err: unknown): string => {
  if (err && typeof err === "object" && "response" in err) {
    const response = (err as any).response;
    return (
      response?.data?.message ||
      response?.statusText ||
      "Error al procesar la solicitud"
    );
  }
  return err instanceof Error ? err.message : "Error inesperado";
};

interface UseRequirementsResult {
  project: Project | null;
  requirements: Requirement[];
  loading: boolean;
  error: string | null;
  isFreelancer: boolean;
  isClient: boolean;
  canEditRequirements: boolean;
  canSubmitForReview: boolean;
  canReview: boolean;
  createRequirement: (description: string) => Promise<void>;
  updateRequirement: (id: string, description: string) => Promise<void>;
  deleteRequirement: (id: string) => Promise<void>;
  submitForReview: () => Promise<void>;
  reviewRequirements: (
    action: "APPROVE" | "REVISION",
    reason?: string
  ) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useRequirements(
  projectId?: string | null
): UseRequirementsResult {
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!projectId) {
      setProject(null);
      setRequirements([]);
      setLoading(false);
      setError("No se ha seleccionado un proyecto");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [projectResponse, requirementsData] = await Promise.all([
        api.get<Project>(`/projects/${projectId}`),
        requirementService.getRequirementsByProject(projectId),
      ]);
      setProject(projectResponse.data);
      setRequirements(requirementsData);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      console.error("Error cargando requisitos:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isFreelancer = user?.role === "FREELANCER";
  const isClient = user?.role === "CLIENT";

  const { canEditRequirements, canSubmitForReview, canReview } = useMemo(() => {
    const editableStatuses: ProjectStatus[] = ["PENDING", "CONTRACT_REVIEW"];
    const submitStatuses: Array<ProjectStatus> = ["PENDING", "CONTRACT_REVIEW"];
    const pendingOrRevision = requirements.some((req) =>
      ["PENDING", "REVISION"].includes(req.status)
    );

    return {
      canEditRequirements:
        Boolean(project) &&
        isFreelancer &&
        editableStatuses.includes(project!.status),
      canSubmitForReview:
        Boolean(projectId) &&
        isFreelancer &&
        Boolean(project) &&
        submitStatuses.includes(project!.status) &&
        pendingOrRevision,
      canReview: Boolean(project) && isClient && project!.status === "REVIEW",
    };
  }, [project, requirements, isFreelancer, isClient, projectId]);

  const runAction = useCallback(
    async (action: () => Promise<void>) => {
      if (!projectId) return;
      try {
        setError(null);
        await action();
        await fetchData();
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        console.error("Error en acción de requerimientos:", err);
        throw err;
      }
    },
    [projectId, fetchData]
  );

  const createRequirement = useCallback(
    async (description: string) => {
      if (!projectId) return;
      const trimmed = description.trim();
      if (!trimmed) return;
      await runAction(async () => {
        await requirementService.createRequirement(projectId, trimmed);
      });
    },
    [projectId, runAction]
  );

  const updateRequirement = useCallback(
    async (id: string, description: string) => {
      const trimmed = description.trim();
      if (!trimmed) return;
      await runAction(async () => {
        await requirementService.updateRequirement(id, trimmed);
      });
    },
    [runAction]
  );

  const deleteRequirement = useCallback(
    async (id: string) => {
      await runAction(async () => {
        await requirementService.deleteRequirement(id);
      });
    },
    [runAction]
  );

  const submitForReview = useCallback(async () => {
    if (!projectId) return;
    await runAction(async () => {
      await requirementService.submitForReview(projectId);
    });
  }, [projectId, runAction]);

  const reviewRequirements = useCallback(
    async (action: "APPROVE" | "REVISION", reason?: string) => {
      if (!projectId) return;
      const backendAction =
        action === "REVISION" ? "REQUEST_REVISION" : "APPROVE";
      await runAction(async () => {
        await requirementService.reviewRequirements(
          projectId,
          backendAction,
          reason
        );
      });
    },
    [projectId, runAction]
  );

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
    refetch: fetchData,
  };
}
