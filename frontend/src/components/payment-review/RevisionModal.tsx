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
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-200 rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-700">
        <h3 className="text-2xl font-bold text-white mb-6">Solicitar Revisión del Comprobante</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Razón de la revisión
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="textarea textarea-bordered w-full bg-gray-900/50 text-white h-32 focus:ring-2 focus:ring-cyan-500"
              placeholder="Ejemplo: La cantidad no coincide con el contrato, la imagen está borrosa, falta información..."
              required
              autoFocus
            />
          </div>

          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-300">
              <strong>Nota:</strong> El cliente recibirá esta razón y deberá subir un nuevo comprobante.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn btn-ghost border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !reason.trim()}
              className="flex-1 btn btn-error bg-red-600 border-none hover:bg-red-700 text-white disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
