// src/hooks/requirements/useAllRequirements.ts
import { useState, useEffect } from "react";
import {
  requirementService,
  type RequirementResponse,
} from "../../services/requirement.service";

/**
 * Hook para obtener TODOS los requirements (sin filtrar por proyecto)
 * Útil para dropdowns y selecciones globales
 */
export function useAllRequirements() {
  const [requirements, setRequirements] = useState<RequirementResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔍 Cargando todos los requirements desde API...");
      const data = await requirementService.getAllRequirements();
      console.log("✅ Requirements cargados:", data.length, "items");
      console.log("📋 Datos:", data);

      setRequirements(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar requirements";
      console.error("❌ Error en useAllRequirements:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  return {
    requirements,
    loading,
    error,
    refetch: fetchRequirements,
  };
}
