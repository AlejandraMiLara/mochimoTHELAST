import type { Project } from "../../hooks/Requirements/useRequirements";

interface RequirementsHeaderProps {
  project: Project;
  isFreelancer: boolean;
  isClient: boolean;
  canEditRequirements: boolean;
  canSubmitForReview: boolean;
  canReview: boolean;
  onCreateClick: () => void;
  onSubmitClick: () => void;
  onReviewClick: () => void;
}

export default function RequirementsHeader({
  project,
  isFreelancer,
  // isClient,
  canEditRequirements,
  canSubmitForReview,
  canReview,
  onCreateClick,
  onSubmitClick,
  onReviewClick,
}: RequirementsHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Requisitos del Proyecto
          </h2>
          <p className="text-sm text-gray-600 mt-1">{project.name}</p>
        </div>
      </div>

      {isFreelancer && (
        <div className="flex gap-3">
          {canEditRequirements && (
            <button
              onClick={onCreateClick}
              className="btn btn-primary bg-cyan-400 hover:bg-cyan-500 border-cyan-400 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-file-plus-corner-icon lucide-file-plus-corner"
              >
                <path d="M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35" />
                <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                <path d="M14 19h6" />
                <path d="M17 16v6" />
              </svg>
              Nuevo Requisito
            </button>
          )}
          {canSubmitForReview && (
            <button
              onClick={onSubmitClick}
              className="btn btn-success btn-sm font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-archive-restore-icon lucide-archive-restore"
              >
                <rect width="20" height="5" x="2" y="3" rx="1" />
                <path d="M4 8v11a2 2 0 0 0 2 2h2" />
                <path d="M20 8v11a2 2 0 0 1-2 2h-2" />
                <path d="m9 15 3-3 3 3" />
                <path d="M12 12v9" />
              </svg>
              Enviar a Revisión
            </button>
          )}
        </div>
      )}

      {canReview && (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Los requisitos están listos para tu revisión</span>
          <button onClick={onReviewClick} className="btn btn-sm">
            Revisar
          </button>
        </div>
      )}
    </div>
  );
}
