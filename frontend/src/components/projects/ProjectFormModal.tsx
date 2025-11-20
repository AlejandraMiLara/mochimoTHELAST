"use client";
import { useState, useRef, useEffect } from "react";
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
  onSubmit: (file?: File) => void;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPreviewUrl(formData.imageUrl || null);
      setSelectedFile(null);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [isOpen, formData.imageUrl]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen es muy pesada (Máx 5MB)");
        return;
      }
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-200 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
        <h3 className="text-2xl font-bold text-white mb-6">
          {isEditing ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Proyecto *
            </label>
            <input
              type="text"
              placeholder="Nombre del proyecto"
              className="input input-bordered w-full bg-gray-900/50 text-white focus:ring-2 focus:ring-cyan-500"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descripción *
            </label>
            <textarea
              placeholder="Descripción detallada del proyecto"
              className="textarea textarea-bordered w-full bg-gray-900/50 text-white h-32 focus:ring-2 focus:ring-cyan-500"
              value={formData.description}
              onChange={(e) => onChange({ description: e.target.value })}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Imagen de Portada (Opcional)
            </label>
            
            <div className="flex items-center gap-4">
              {previewUrl ? (
                <div className="relative group">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-600">
                     <img 
                       src={previewUrl} 
                       alt="Preview" 
                       className="w-full h-full object-cover"
                     />
                  </div>
                  <button
                    onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                        onChange({ imageUrl: "" });
                        if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error text-white scale-0 group-hover:scale-100 transition-transform"
                  >✕</button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg bg-base-300 flex items-center justify-center border border-dashed border-gray-600">
                    <span className="text-xs text-gray-500">Sin foto</span>
                </div>
              )}
              
              <div className="flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-info w-full bg-gray-900/50 text-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">Sube una imagen para la portada (Max 5MB)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Modo de Pago *
              </label>
              <select
                className="select select-bordered w-full bg-gray-900/50 text-white focus:ring-2 focus:ring-cyan-500"
                value={formData.paymentMode}
                onChange={(e) =>
                  onChange({ paymentMode: e.target.value as PaymentMode })
                }
              >
                {Object.entries(PAYMENT_MODE_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estado *
              </label>
              <select
                className="select select-bordered w-full bg-gray-900/50 text-white focus:ring-2 focus:ring-cyan-500"
                value={formData.status}
                onChange={(e) =>
                  onChange({ status: e.target.value as ProjectStatus })
                }
              >
                {Object.entries(PROJECT_STATUS_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) => onChange({ isPublic: e.target.checked })}
                className="checkbox checkbox-primary"
              />
              <span className="label-text text-gray-300">Proyecto público (visible en portafolio)</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 btn btn-ghost border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSubmit(selectedFile || undefined)}
            className="flex-1 btn btn-primary bg-cyan-600 border-none hover:bg-cyan-500 text-white"
          >
            {isEditing ? "Guardar Cambios" : "Crear Proyecto"}
          </button>
        </div>
      </div>
    </div>
  );
}