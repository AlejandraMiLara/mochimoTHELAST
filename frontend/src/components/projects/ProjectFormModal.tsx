// src/components/ProjectFormModal.tsx
"use client";
import type {
  ProjectFormData,
  ProjectStatus,
  PaymentMode,
} from "../../pages/project/project.types";
import {
  PROJECT_STATUS_CONFIG,
  PAYMENT_MODE_CONFIG,
} from "../../pages/project/project.constants";

interface ProjectFormModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: ProjectFormData;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (data: Partial<ProjectFormData>) => void;
}

export default function ProjectFormModal({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSubmit,
  onChange,
}: ProjectFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-200 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-white mb-6">
          {isEditing ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h3>

        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Nombre del Proyecto *
            </label>
            <input
              type="text"
              placeholder="Nombre del proyecto"
              className="w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
            />
          </div>

          {/* Descripcion */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Descripcion *
            </label>
            <textarea
              placeholder="Descripcion detallada del proyecto"
              className="w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              rows={4}
              value={formData.description}
              onChange={(e) => onChange({ description: e.target.value })}
            ></textarea>
          </div>

          {/* URL de Imagen */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              URL de Imagen (opcional)
            </label>
            <input
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              className="w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={formData.imageUrl || ""}
              onChange={(e) => onChange({ imageUrl: e.target.value })}
            />
          </div>

          {/* Grid de 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Modo de Pago */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Modo de Pago *
              </label>
              <select
                className="w-full px-4 py-3 border border-white rounded-lg bg-base-200 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={formData.paymentMode}
                onChange={(e) =>
                  onChange({ paymentMode: e.target.value as PaymentMode })
                }
              >
                {Object.entries(PAYMENT_MODE_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label} - {config.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Estado *
              </label>
              <select
                className="w-full px-4 py-3 border border-white rounded-lg bg-base-200 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={formData.status}
                onChange={(e) =>
                  onChange({ status: e.target.value as ProjectStatus })
                }
              >
                {Object.entries(PROJECT_STATUS_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label} - {config.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Visibilidad */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublic"
              className="checkbox checkbox-primary"
              checked={formData.isPublic}
              onChange={(e) => onChange({ isPublic: e.target.checked })}
            />
            <label
              htmlFor="isPublic"
              className="text-sm font-medium text-white cursor-pointer"
            >
              Proyecto público (visible para todos los usuarios)
            </label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 font-bold border border-gray-300 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 px-4 py-2 font-bold bg-cyan-400 text-white rounded-lg hover:bg-cyan-500 transition"
          >
            {isEditing ? "Guardar Cambios" : "Crear Proyecto"}
          </button>
        </div>
      </div>
    </div>
  );
}
