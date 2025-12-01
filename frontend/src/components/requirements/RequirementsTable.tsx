import type { Requirement } from "../../hooks/Requirements/useRequirements";

interface RequirementsTableProps {
  requirements: Requirement[];
  isFreelancer: boolean;
  canEditRequirements: boolean;
  onEdit: (req: Requirement) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<string, string> = {
  PENDING: "badge-ghost",
  SUBMITTED: "badge-warning",
  APPROVED: "badge-success",
  REVISION: "badge-error",
};

const statusText: Record<string, string> = {
  PENDING: "Pendiente",
  SUBMITTED: "Enviado",
  APPROVED: "Aprobado",
  REVISION: "Necesita Revisión",
};

export default function RequirementsTable({
  requirements,
  isFreelancer,
  canEditRequirements,
  onEdit,
  onDelete,
}: RequirementsTableProps) {
  return (
    <div className="bg-base-200 rounded-lg shadow">
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th className="w-12">#</th>
              <th>Descripción</th>
              <th className="w-32">Estado</th>
              {isFreelancer && canEditRequirements && (
                <th className="w-40">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {requirements.length === 0 ? (
              <tr>
                <td
                  colSpan={isFreelancer && canEditRequirements ? 4 : 3}
                  className="text-center py-8"
                >
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="font-medium">No hay requisitos definidos</p>
                    {isFreelancer && canEditRequirements && (
                      <p className="text-sm mt-1">
                        Comienza agregando el primer requisito
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              requirements.map((req, index) => (
                <tr key={req.id} className="hover">
                  <td className="font-bold text-sm text-white">{index + 1}</td>
                  <td>
                    <div>
                      <p className="font-medium text-base-content">
                        {req.description}
                      </p>
                      {req.revisionReason && (
                        <p className="text-xs text-error mt-1">
                          <strong>Motivo de revisión:</strong>{" "}
                          {req.revisionReason}
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${statusColors[req.status]}`}>
                      {statusText[req.status]}
                    </span>
                  </td>
                  {isFreelancer && canEditRequirements && (
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(req)}
                          className="btn btn-xs btn-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                            <path d="m15 5 4 4" />
                          </svg>
                          Editar
                        </button>
                        <button
                          onClick={() => onDelete(req.id)}
                          className="btn btn-xs btn-error"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4 p-4">
        {requirements.length === 0 ? (
          <div className="text-center py-8 bg-base-300 rounded-lg">
            <div className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="font-medium">No hay requisitos definidos</p>
              {isFreelancer && canEditRequirements && (
                <p className="text-sm mt-1">
                  Comienza agregando el primer requisito
                </p>
              )}
            </div>
          </div>
        ) : (
          requirements.map((req, index) => (
            <div
              key={req.id}
              className="bg-base-300 rounded-lg p-4 shadow border border-base-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-white bg-primary rounded-full w-8 h-8 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span
                    className={`badge ${statusColors[req.status]} badge-lg`}
                  >
                    {statusText[req.status]}
                  </span>
                </div>

                {isFreelancer && canEditRequirements && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEdit(req)}
                      className="btn btn-xs btn-primary"
                      title="Editar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(req.id)}
                      className="btn btn-xs btn-error"
                      title="Eliminar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <p className="text-sm font-medium text-base-content mb-1">
                  Descripción:
                </p>
                <p className="text-base-content/80 text-sm leading-relaxed">
                  {req.description}
                </p>
              </div>

              {req.revisionReason && (
                <div className="bg-error/10 border border-error/20 rounded p-3">
                  <p className="text-xs font-medium text-error mb-1">
                    Motivo de revisión:
                  </p>
                  <p className="text-error text-sm leading-relaxed">
                    {req.revisionReason}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
