"use client";
import { useState } from "react";
import type { TaskResponse } from "../../services/task.service";
import type { TaskStatus } from "../../pages/tasks/task.types";
import { TASK_STATUS_CONFIG } from "../../pages/tasks/task.constants";

interface TaskCardProps extends TaskResponse {
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onImageUpload?: (taskId: string, file: File) => Promise<void> | void;
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

  const [isUploading, setIsUploading] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Manejador mejorado para la subida de archivos
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImageUpload) return;

    // Validaciones del archivo
    if (file.size > 5 * 1024 * 1024) {
      alert("El archivo es demasiado grande. Máximo 5MB.");
      return;
    }

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona un archivo de imagen válido.");
      return;
    }

    try {
      setIsUploading(true);
      setImageError(false);
      await onImageUpload(id, file);
    } catch (error) {
      console.error("Error subiendo imagen", error);
      setImageError(true);
      alert("Error al subir la imagen. Por favor, intenta nuevamente.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // Manejador de error en carga de imagen
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div className="card bg-base-300 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg">
        <div className="card-body p-4 sm:p-6">
          ¿
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <span
                className={`badge ${statusConfig.color} badge-lg font-semibold whitespace-nowrap`}
              >
                {statusConfig.label}
              </span>
              <span className="text-xs text-slate-400 whitespace-nowrap">
                {new Date(createdAt).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2">
              {onImageUpload && (
                <div className="flex items-center">
                  <label
                    className={`btn btn-square btn-sm ${
                      isUploading
                        ? "btn-disabled bg-base-300"
                        : "btn-ghost hover:bg-base-200"
                    } transition-colors`}
                    title={isUploading ? "Subiendo..." : "Subir evidencia"}
                  >
                    {isUploading ? (
                      <span className="loading loading-spinner loading-xs text-cyan-500"></span>
                    ) : (
                      <>
                        <input
                          type="file"
                          accept="image/*, .jpg, .jpeg, .png, .webp"
                          className="hidden"
                          disabled={isUploading}
                          onChange={handleFileChange}
                        />
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
                          className="text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17,8 12,3 7,8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </>
                    )}
                  </label>
                </div>
              )}

              {onStatusChange && (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-sm btn-ghost btn-circle hover:bg-base-200"
                    title="Cambiar estado"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-50 menu p-2 shadow-lg bg-base-300 rounded-box w-52 border border-slate-700"
                  >
                    {Object.entries(TASK_STATUS_CONFIG).map(([key, config]) => (
                      <li key={key}>
                        <button
                          onClick={() => onStatusChange(id, key as TaskStatus)}
                          className={`flex items-center gap-3 ${
                            status === key
                              ? "active font-semibold bg-base-200"
                              : ""
                          }`}
                        >
                          <span
                            className={`badge ${config.color} badge-xs`}
                          ></span>
                          {config.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="shrink-0">
              {imageUrl && !imageError ? (
                <div
                  className="tooltip tooltip-bottom cursor-zoom-in transition-transform hover:scale-105"
                  data-tip="Clic para ampliar"
                  onClick={() => setIsZoomOpen(true)}
                >
                  <img
                    className="size-20 sm:size-24 lg:size-28 rounded-box object-cover border-2 border-slate-600 hover:border-cyan-500 transition-all shadow-md"
                    src={imageUrl}
                    alt="Evidencia de la tarea"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="size-20 sm:size-24 lg:size-28 rounded-box bg-slate-700/50 flex flex-col items-center justify-center border-2 border-slate-700 border-dashed text-slate-500">
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
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className="text-xs mt-1 text-center px-1">
                    {imageError ? "Error de imagen" : "Sin imagen"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-100 text-lg sm:text-xl mb-2 wrap-break-word">
                {requirement?.description || "Sin descripción"}
              </h3>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                {project && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full border border-cyan-800/50">
                      {project.name}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
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
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Creada
                  </span>
                </div>
              </div>

              {imageError && (
                <div className="mt-3 p-2 bg-red-900/20 border border-red-800/50 rounded-box">
                  <p className="text-red-400 text-xs flex items-center gap-2">
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
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Error al cargar la imagen. Intenta subirla nuevamente.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isZoomOpen && imageUrl && !imageError && (
        <dialog className="modal modal-open bg-black/90 backdrop-blur-sm">
          <div className="modal-box max-w-7xl w-full max-h-[90vh] bg-transparent shadow-none p-2 sm:p-4 relative flex items-center justify-center">
            <button
              className="btn btn-circle btn-sm absolute right-2 top-2 z-50 bg-black/70 border-none text-white hover:bg-black hover:text-white transition-colors"
              onClick={() => setIsZoomOpen(false)}
            >
              ✕
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={imageUrl}
                alt="Evidencia en tamaño completo"
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl border border-slate-600"
              />
            </div>
          </div>

          <div
            className="modal-backdrop bg-transparent"
            onClick={() => setIsZoomOpen(false)}
          ></div>
        </dialog>
      )}
    </>
  );
}
