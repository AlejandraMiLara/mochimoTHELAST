// src/hooks/requirements/useRequirements.ts
import { useState, useEffect, useCallback } from "react";
import {
  requirementService,
  type RequirementResponse,
} from "../../services/requirement.service";

interface UseRequirementsResult {
  requirements: RequirementResponse[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRequirements(
  userId: string,
  projectId: string | null
): UseRequirementsResult {
  const [requirements, setRequirements] = useState<RequirementResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequirements = useCallback(async () => {
    if (!projectId) {
      setRequirements([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await requirementService.getRequirementsByProject(projectId);
      setRequirements(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar requerimientos";
      setError(errorMessage);
      console.error("Error fetching requirements:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchRequirements();
  }, [fetchRequirements]);

  return {
    requirements,
    loading,
    error,
    refetch: fetchRequirements,
  };
}
