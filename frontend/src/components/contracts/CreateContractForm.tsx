import { useState } from "react";
import type { CreateContractDto } from "../../services/contract.service";

interface CreateContractFormProps {
  projectId: string;
  onSubmit: (data: CreateContractDto) => Promise<void>;
  onCancel: () => void;
  initialData?: {
    price: number;
    includesIva: boolean;
    content?: string;
  };
  isEditing?: boolean;
}

export default function CreateContractForm({
  projectId,
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: CreateContractFormProps) {
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [includesIva, setIncludesIva] = useState(initialData?.includesIva || false);
  const [content, setContent] = useState(initialData?.content || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        projectId,
        price: parseFloat(price),
        includesIva,
        content: content.trim() || undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-white mb-4">
        {isEditing ? 'Editar Contrato' : 'Crear Nuevo Contrato'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Precio Total del Proyecto
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
              $
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-8 pr-4 py-2 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="includesIva"
            checked={includesIva}
            onChange={(e) => setIncludesIva(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="includesIva" className="ml-2 text-sm text-white">
            El precio incluye IVA
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Contenido del Contrato (Opcional)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={8}
            placeholder="Deja vacío para generar automáticamente o escribe tu propio contenido..."
          />
        </div>

        <div className="bg-base-200 border border-base-200 rounded-lg p-4">
          <p className="text-sm text-white">
            <strong>Nota:</strong> El contrato se generará automáticamente con
            la información del proyecto, el freelancer y el cliente. Podrás
            revisarlo antes de enviarlo.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading || !price}
            className="flex-1 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (isEditing ? "Actualizando..." : "Creando...") : (isEditing ? "Actualizar Contrato" : "Crear Contrato")}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
