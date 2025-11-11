// src/components/ProjectCard.tsx
"use client";

import type { Project } from "../../pages/project/project.types";
import { Link } from "react-router-dom";

interface ProjectCardProps extends Project {
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
  progress?: number;
  showActions?: boolean;
}

export default function ProjectCard({
  id,
  name,
  description,
  status,
  progress = 0,
  paymentMode,
  invitationCode,
  onEdit,
  onDelete,
  showActions = true, // Por defecto true para mantener compatibilidad
}: ProjectCardProps) {
  const statusColors: Record<string, string> = {
    INPROGRESS: "badge-success",
    PENDING: "badge-warning",
    REVIEW: "badge-warning",
    APPROVED: "badge-success",
    PAYMENT: "badge-info",
    COMPLETED: "badge-info",
    CONTRACT_REVIEW: "badge-warning",
    CONTRACT_APPROVED: "badge-success",
  };

  const statusText: Record<string, string> = {
    INPROGRESS: "En progreso",
    PENDING: "Pendiente",
    REVIEW: "En revision",
    APPROVED: "Aprobado",
    PAYMENT: "Pendiente de pago",
    COMPLETED: "Completado",
    CONTRACT_REVIEW: "Contrato en revision",
    CONTRACT_APPROVED: "Contrato aprobado",
  };

  const cardBgColors: Record<string, string> = {
    INPROGRESS: "bg-base-100",
    PENDING: "bg-base-200",
    REVIEW: "bg-base-200",
    APPROVED: "bg-base-100",
    PAYMENT: "bg-base-200",
    COMPLETED: "bg-base-300",
    CONTRACT_REVIEW: "bg-base-200",
    CONTRACT_APPROVED: "bg-base-100",
  };

  const paymentModeText = {
    HALFHUP: "Mitad Adelantado",
    FULLADVANCE: "Todo Adelantado",
    FULLCOMPLETE: "Al Completar",
    UPFRONT: "Todo Adelantado",
    ONFINISH: "Al Completar",
  };

  const paymentModeColors = {
    HALFHUP: "badge-warning",
    FULLADVANCE: "badge-success",
    FULLCOMPLETE: "badge-info",
    UPFRONT: "badge-success",
    ONFINISH: "badge-info",
  };

  return (
    <div
      className={`card ${cardBgColors[status]} shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300`}
    >
      <div className="card-body">
        <div className="justify-between">
          <h2 className="card-title text-base-content">{name}</h2>
          <span className={`badge ${statusColors[status]} badge-sm`}>
            {statusText[status] ?? status}
          </span>
        </div>

        <p className="text-base-content/70 text-sm">{description}</p>

        {/* Modo de Pago */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-base-content/60 font-medium">
            Modo de Pago:
          </span>
          <span className={`badge ${paymentModeColors[paymentMode]} badge-sm`}>
            {paymentModeText[paymentMode]}
          </span>
        </div>

        {/* Codigo de Invitacion */}
        <div className="mt-2 p-2 bg-base-300/50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-xs text-base-content/60 font-medium">
              Codigo de Invitacion:
            </span>
            <code className="text-xs font-mono bg-base-100 px-2 py-1 rounded text-cyan-400">
              {invitationCode}
            </code>
          </div>
        </div>

        {/* Progreso */}
        {progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-base-content/60 mb-1">
              <span>Progreso</span>
              <span>{progress}%</span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={progress}
              max="100"
            ></progress>
          </div>
        )}

        {/* Botones de accion - solo se muestran si showActions es true */}
        {showActions && (onEdit || onDelete) && (
          <div className="card-actions justify-end mt-4 flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() =>
                  onEdit({
                    id,
                    name,
                    description,
                    imageUrl: undefined,
                    paymentMode,
                    status,
                    invitationCode,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    ownerId: "",
                    isPublic: false,
                  })
                }
                className="btn btn-primary text-white btn-sm"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(id)}
                className="btn btn-error btn-sm text-white"
              >
                Eliminar
              </button>
            )}

            <Link
              to="/requirements"
              className="btn btn-primary btn-sm text-white"
            >
              Requisitos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
