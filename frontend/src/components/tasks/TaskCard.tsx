// src/components/TaskCard.tsx
"use client";
import type { Task } from "../../pages/tasks/task.types";
import { TASK_STATUS_CONFIG } from "../../pages/tasks/task.constants";

interface TaskCardProps extends Task {
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: Task["status"]) => void;
}

export default function TaskCard({
  id,
  status,
  imageUrl,
  createdAt,
  project,
  requirement,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const statusConfig = TASK_STATUS_CONFIG[status];

  return (
    <li className="list-row hover:bg-base-200 transition-colors">
      {/* Estado Badge */}
      <div className="flex items-center justify-center">
        <span className={`badge ${statusConfig.color} badge-lg font-semibold`}>
          {statusConfig.label}
        </span>
      </div>

      {/* Imagen (si existe) */}
      {imageUrl ? (
        <div>
          <img
            className="size-14 rounded-box object-cover"
            src={imageUrl}
            alt="Task"
          />
        </div>
      ) : (
        <div className="size-14 rounded-box bg-slate-200 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-400"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      )}

      {/* Contenido principal */}
      <div className="list-col-grow">
        <div className="font-semibold text-white">
          {requirement?.description || "Sin descripcion"}
        </div>
        <div className="flex items-center gap-3 mt-1">
          {/* Proyecto */}
          {project && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan-500"
              >
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
              </svg>
              <span className="text-xs font-medium text-slate-600">
                {project.name}
              </span>
            </div>
          )}
          {/* Fecha */}
          <span className="text-xs text-slate-500">
            {new Date(createdAt).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Cambio de estado */}
      {onStatusChange && (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-sm btn-ghost">
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
              <path d="M12 3v6l4-4-4-4" />
              <path d="M12 21v-6l-4 4 4 4" />
              <path d="M3 12h6l-4-4-4 4" />
              <path d="M21 12h-6l4-4 4 4" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {Object.entries(TASK_STATUS_CONFIG).map(([key, config]) => (
              <li key={key}>
                <button
                  onClick={() => onStatusChange(id, key as Task["status"])}
                  className={status === key ? "active" : ""}
                >
                  <span className={`badge ${config.color} badge-sm`}></span>
                  {config.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Boton Editar */}
      {onEdit && (
        <button
          onClick={() =>
            onEdit({
              id,
              status,
              imageUrl,
              createdAt,
              updatedAt: createdAt,
              projectId: project?.id || "",
              requirementId: requirement?.id || "",
              project,
              requirement,
            })
          }
          className="btn btn-square btn-ghost btn-sm"
          title="Editar"
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
        </button>
      )}

      {/* Boton Eliminar */}
      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="btn btn-square btn-ghost btn-sm text-error hover:bg-error hover:text-white"
          title="Eliminar"
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
      )}
    </li>
  );
}
