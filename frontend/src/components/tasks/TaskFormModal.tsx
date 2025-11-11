// src/components/TaskFormModal.tsx
"use client";
import type { TaskFormData, TaskStatus } from "../../pages/tasks/task.types";
import { TASK_STATUS_CONFIG } from "../../pages/tasks/task.constants";

interface TaskFormModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: TaskFormData;
  projects: Array<{ id: string; name: string }>;
  requirements: Array<{ id: string; description: string; projectId: string }>;
  requirementsLoading?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (data: Partial<TaskFormData>) => void;
}

export default function TaskFormModal({
  isOpen,
  isEditing,
  formData,
  projects,
  requirements,
  requirementsLoading = false,
  onClose,
  onSubmit,
  onChange,
}: TaskFormModalProps) {
  if (!isOpen) return null;

  // Filtrar requerimientos según el proyecto seleccionado
  const filteredRequirements = formData.projectId
    ? requirements.filter((req) => req.projectId === formData.projectId)
    : [];

  const hasRequirements = filteredRequirements.length > 0;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-200 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-white mb-6">
          {isEditing ? "Editar Tarea" : "Nueva Tarea"}
        </h3>

        <div className="space-y-4">
          {/* Proyecto */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Proyecto *
            </label>
            <select
              className="select select-bordered w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={formData.projectId}
              onChange={(e) => {
                onChange({
                  projectId: e.target.value,
                  // Reset requirement cuando cambia el proyecto
                  requirementId: "",
                });
              }}
              disabled={isEditing} // No permitir cambiar proyecto al editar
            >
              <option className="bg-base-200" value="">
                Selecciona un proyecto
              </option>
              {projects.map((project) => (
                <option
                  className="bg-base-200"
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </option>
              ))}
            </select>
            {isEditing && (
              <p className="text-xs text-slate-400 mt-1">
                No se puede cambiar el proyecto de una tarea existente
              </p>
            )}
          </div>

          {/* Requerimiento */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Requerimiento *
            </label>
            <select
              className="select select-bordered w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50"
              value={formData.requirementId}
              onChange={(e) => onChange({ requirementId: e.target.value })}
              disabled={!formData.projectId || isEditing || requirementsLoading}
            >
              <option className="bg-base-200" value="">
                {requirementsLoading
                  ? "Cargando requerimientos..."
                  : hasRequirements
                  ? "Selecciona un requerimiento"
                  : "No hay requerimientos disponibles"}
              </option>
              {filteredRequirements.map((req) => (
                <option className="bg-base-200" key={req.id} value={req.id}>
                  {req.description}
                </option>
              ))}
            </select>
            {!formData.projectId && (
              <p className="text-xs text-slate-400 mt-1">
                Primero selecciona un proyecto
              </p>
            )}
            {formData.projectId && !requirementsLoading && !hasRequirements && (
              <p className="text-xs text-yellow-400 mt-1">
                Este proyecto no tiene requerimientos. Crea uno primero.
              </p>
            )}
            {isEditing && (
              <p className="text-xs text-slate-400 mt-1">
                No se puede cambiar el requerimiento de una tarea existente
              </p>
            )}
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Estado *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(TASK_STATUS_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => onChange({ status: key as TaskStatus })}
                  className={`btn ${
                    formData.status === key ? "btn-primary" : "btn-outline"
                  } text-white`}
                >
                  <span
                    className={`badge ${config.color} badge-sm mr-2`}
                  ></span>
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          {/* URL de Imagen */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              URL de Imagen (opcional)
            </label>
            <input
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              className="input input-bordered w-full text-gray-100 bg-gray-900/50"
              value={formData.imageUrl || ""}
              onChange={(e) => onChange({ imageUrl: e.target.value })}
            />
            {formData.imageUrl && (
              <div className="mt-2">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 btn btn-ghost bg-cyan-200 text-cyan-700"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            disabled={
              !formData.projectId ||
              !formData.requirementId ||
              requirementsLoading
            }
            className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? "Guardar Cambios" : "Crear Tarea"}
          </button>
        </div>
      </div>
    </div>
  );
}
