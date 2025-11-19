import { useState } from 'react';

interface RevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => Promise<void>;
}

export default function RevisionModal({ isOpen, onClose, onSubmit }: RevisionModalProps) {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(reason);
      setReason('');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Solicitar Revisión del Comprobante</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Razón de la revisión
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows={5}
              placeholder="Ejemplo: La cantidad no coincide con el contrato, la imagen está borrosa, falta información..."
              required
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">
              <strong>Nota:</strong> El cliente recibirá esta razón y deberá subir un nuevo comprobante.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || !reason.trim()}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
