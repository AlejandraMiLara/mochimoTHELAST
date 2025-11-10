import type {
  Requirement,
  Project,
} from "../../hooks/Requirements/useRequirements";

interface RequirementsStatsProps {
  requirements: Requirement[];
  project: Project;
}

const projectStatusText: Record<string, string> = {
  PENDING: "Pendiente",
  REVIEW: "En Revisión",
  APPROVED: "Aprobado",
  INPROGRESS: "En Progreso",
  COMPLETED: "Completado",
};

export default function RequirementsStats({
  requirements,
  project,
}: RequirementsStatsProps) {
  return (
    <div className="bg-base-100 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-sm">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total de Requisitos</div>
          <div className="stat-value text-primary">{requirements.length}</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Estado del Proyecto</div>
          <div className="stat-value text-sm text-primary stat-title">
            {projectStatusText[project.status]}
          </div>
        </div>
      </div>
    </div>
  );
}
