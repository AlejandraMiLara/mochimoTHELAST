"use client";
import { useState } from "react";
import type { TaskResponse } from "../../services/task.service";
import type { TaskStatus } from "../../pages/tasks/task.types";
import { TASK_STATUS_CONFIG } from "../../pages/tasks/task.constants";

interface TaskCardProps extends TaskResponse {
  onStatusChange?: (id: string, status: TaskStatus) => void;
  // Cambiamos el tipo de retorno a Promise para poder esperar la carga
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
  
  // Estado local para la UI
  const [isUploading, setIsUploading] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Manejador mejorado para la subida de archivos
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImageUpload) return;

    // 1. Validación rápida de tamaño (Ej: Max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("El archivo es demasiado grande. Máximo 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      // 2. Esperamos a que el backend (y Cloudinary) respondan
      await onImageUpload(id, file);
    } catch (error) {
      console.error("Error subiendo imagen", error);
      // El alert de error ya lo maneja el componente padre, 
      // pero aquí aseguramos apagar el spinner
    } finally {
      setIsUploading(false);
      // Limpiamos el input para permitir subir el mismo archivo si falló
      e.target.value = "";
    }
  };

  return (
    <>
      <li className="list-row hover:bg-base-200 transition-colors">
        <div className="flex items-center justify-center">
          <span className={`badge ${statusConfig.color} badge-lg font-semibold`}>
            {statusConfig.label}
          </span>
        </div>

        {/* SECCIÓN DE IMAGEN (MEJORADA CON ZOOM) */}
        {imageUrl ? (
          <div 
            className="tooltip tooltip-bottom cursor-zoom-in" 
            data-tip="Clic para ampliar"
            onClick={() => setIsZoomOpen(true)}
          >
            <img
              className="size-14 rounded-box object-cover border border-slate-600 hover:border-cyan-500 transition-all"
              src={imageUrl}
              alt="Evidencia"
            />
          </div>
        ) : (
          <div className="size-14 rounded-box bg-slate-700/50 flex items-center justify-center border border-slate-700 border-dashed">
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
              className="text-slate-500"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}

        {/* INFO DE LA TAREA */}
        <div className="list-col-grow">
          <div className="font-semibold text-gray-100">
            {requirement?.description || "Sin descripción"}
          </div>
          <div className="flex items-center gap-3 mt-1">
            {project && (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded">
                  {project.name}
                </span>
              </div>
            )}
            <span className="text-xs text-slate-500">
              {new Date(createdAt).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </div>
        </div>

        {/* BOTÓN DE ESTADO (DROPDOWN) */}
        {onStatusChange && (
          <div className="dropdown dropdown-end dropdown-bottom">
            <label
              tabIndex={0}
              className="btn btn-sm btn-ghost btn-circle"
              title="Cambiar estado"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
              </svg>
            </label>
            <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow-lg bg-base-300 rounded-box w-52 border border-slate-700">
              {Object.entries(TASK_STATUS_CONFIG).map(([key, config]) => (
                <li key={key}>
                  <button
                    onClick={() => onStatusChange(id, key as TaskStatus)}
                    className={status === key ? "active font-bold" : ""}
                  >
                    <span className={`badge ${config.color} badge-xs`}></span>
                    {config.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BOTÓN DE SUBIDA (MEJORADO CON SPINNER) */}
        {onImageUpload && (
          <div className="flex items-center">
            <label
              className={`btn btn-square btn-sm ${isUploading ? 'btn-disabled bg-base-300' : 'btn-ghost'}`}
              title={isUploading ? "Subiendo..." : "Subir evidencia"}
            >
              {isUploading ? (
                <span className="loading loading-spinner loading-xs text-cyan-500"></span>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={handleFileChange}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17,8 12,3 7,8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </>
              )}
            </label>
          </div>
        )}
      </li>

      {/* MODAL DE ZOOM (NUEVO) */}
      {isZoomOpen && imageUrl && (
        <dialog className="modal modal-open bg-black/80 backdrop-blur-sm">
          <div className="modal-box max-w-4xl bg-transparent shadow-none p-0 relative flex justify-center">
            <button 
              className="btn btn-circle btn-sm absolute right-2 top-2 z-10 bg-black/50 border-none text-white hover:bg-black"
              onClick={() => setIsZoomOpen(false)}
            >
              ✕
            </button>
            <img 
              src={imageUrl} 
              alt="Evidencia Full" 
              className="max-h-[85vh] w-auto rounded-lg shadow-2xl border border-slate-600"
            />
          </div>
          <div className="modal-backdrop" onClick={() => setIsZoomOpen(false)}></div>
        </dialog>
      )}
    </>
  );
}