import type { PaymentProof } from '../../services/payment.service';

interface ProofReviewCardProps {
  proof: PaymentProof;
  onApprove?: () => void;
  onRequestRevision?: () => void;
}

const statusColors = {
  PENDING: 'bg-yellow-900/30 text-yellow-300 border border-yellow-700',
  APPROVED: 'bg-green-900/30 text-green-300 border border-green-700',
  REVISION: 'bg-red-900/30 text-red-300 border border-red-700'
};

const statusLabels = {
  PENDING: 'Pendiente de Revisión',
  APPROVED: 'Aprobado',
  REVISION: 'Requiere Revisión'
};

export default function ProofReviewCard({ proof, onApprove, onRequestRevision }: ProofReviewCardProps) {
  const isPending = proof.status === 'PENDING';
  
  return (
    <div className={`bg-base-200 rounded-lg shadow-md p-6 border-2 ${isPending ? 'border-yellow-700' : 'border-gray-700'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Comprobante de Pago</h3>
          <p className="text-sm text-gray-400 mt-1">
            Subido: {new Date(proof.createdAt).toLocaleDateString('es-MX', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[proof.status]}`}>
          {statusLabels[proof.status]}
        </span>
      </div>

      <div className="mb-4">
        <a 
          href={proof.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img 
            src={proof.imageUrl}
            alt="Comprobante de pago"
            className="w-full max-h-96 object-contain rounded-lg border-2 border-gray-600 hover:border-cyan-500 transition cursor-pointer"
          />
        </a>
        <p className="text-sm text-cyan-400 mt-2 text-center font-medium">
          👆 Click para ver en tamaño completo
        </p>
      </div>

      {proof.status === 'REVISION' && proof.revisionReason && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold text-red-300 mb-1">Razón de Revisión Enviada:</p>
          <p className="text-sm text-red-400">{proof.revisionReason}</p>
        </div>
      )}

      {isPending && onApprove && onRequestRevision && (
        <div className="flex gap-3">
          <button
            onClick={onApprove}
            className="flex-1 btn btn-success bg-green-600 border-none hover:bg-green-700 text-white px-4 py-3 text-lg"
          >
            ✓ Aprobar Pago
          </button>
          <button
            onClick={onRequestRevision}
            className="flex-1 btn btn-error bg-red-600 border-none hover:bg-red-700 text-white px-4 py-3 text-lg"
          >
            ✗ Solicitar Revisión
          </button>
        </div>
      )}

      {proof.status === 'APPROVED' && (
        <div className="bg-green-900/30 border-2 border-green-700 rounded-lg p-4 text-center">
          <p className="text-green-300 font-bold text-lg">✓ Pago Aprobado</p>
        </div>
      )}
    </div>
  );
}