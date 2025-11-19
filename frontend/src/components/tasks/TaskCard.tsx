"use client";
import type { TaskResponse } from "../../services/task.service";
import type { TaskStatus } from "../../pages/tasks/task.types";
import { TASK_STATUS_CONFIG } from "../../pages/tasks/task.constants";

interface TaskCardProps extends TaskResponse {
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onImageUpload?: (taskId: string, file: File) => void;
}

export default function TaskCard({
  id,
  status,
  imageUrl,
  createdAt,
  project,
  requirement,
  onStatusChange,
  onImageUpload,
}: TaskCardProps) {
  const statusConfig = TASK_STATUS_CONFIG[status];

  return (
    <li className="list-row hover:bg-base-200 transition-colors">
      <div className="flex items-center justify-center">
        <span className={`badge ${statusConfig.color} badge-lg font-semibold`}>
          {statusConfig.label}
        </span>
      </div>

      {imageUrl ? (
        <div>
          <img
            className="size-14 rounded-box object-cover"
            src={imageUrl}
            alt="Task evidence"
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

      <div className="list-col-grow">
        <div className="font-semibold text-white">
          {requirement?.description || "Sin descripción"}
        </div>
        <div className="flex items-center gap-3 mt-1">
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
          <span className="text-xs text-slate-500">
            {new Date(createdAt).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {onStatusChange && (
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-sm btn-ghost"
            title="Cambiar estado"
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
              className="lucide lucide-circle-ellipsis-icon lucide-circle-ellipsis"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M17 12h.01" />
              <path d="M12 12h.01" />
              <path d="M7 12h.01" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52 text-white"
          >
            {Object.entries(TASK_STATUS_CONFIG).map(([key, config]) => (
              <li key={key}>
                <button
                  onClick={() => onStatusChange(id, key as TaskStatus)}
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

      {onImageUpload && (
        <label
          className="btn btn-square btn-ghost btn-sm"
          title="Subir evidencia de progreso"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onImageUpload(id, file);
              }
            }}
          />
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17,8 12,3 7,8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </label>
      )}
    </li>
  );
}
