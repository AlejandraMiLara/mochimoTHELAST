import type { PaymentProof } from '../../services/payment.service';

interface ProofCardProps {
  proof: PaymentProof;
  isFreelancer: boolean;
  onApprove?: () => void;
  onRequestRevision?: () => void;
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  REVISION: 'bg-red-100 text-red-800'
};

const statusLabels = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobado',
  REVISION: 'Requiere Revisión'
};

export default function ProofCard({ proof, isFreelancer, onApprove, onRequestRevision }: ProofCardProps) {
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Comprobante de Pago</h3>
          <p className="text-sm text-gray-500 mt-1">
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
            className="w-full max-h-96 object-contain rounded-lg border border-gray-200 hover:border-blue-500 transition cursor-pointer"
          />
        </a>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Click en la imagen para ver en tamaño completo
        </p>
      </div>

      {proof.status === 'REVISION' && proof.revisionReason && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold text-red-800 mb-1">Razón de Revisión:</p>
          <p className="text-sm text-red-700">{proof.revisionReason}</p>
        </div>
      )}

      <div className="flex gap-3">
        {isFreelancer && proof.status === 'PENDING' && (
          <>
            <button
              onClick={onApprove}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Aprobar Pago
            </button>
            <button
              onClick={onRequestRevision}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
            >
              Solicitar Revisión
            </button>
          </>
        )}

        {proof.status === 'APPROVED' && (
          <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-green-800 font-medium">✓ Pago Aprobado</p>
          </div>
        )}
      </div>
    </div>
  );
}