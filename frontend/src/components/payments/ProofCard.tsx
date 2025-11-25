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
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="flex flex-col items-center justify-center h-48 bg-gray-100 rounded-lg border border-gray-200">
                    <svg class="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-gray-500 text-sm">Error al cargar la imagen</p>
                    <a href="${proof.imageUrl}" target="_blank" class="text-blue-500 hover:text-blue-700 text-sm mt-1">Ver imagen original</a>
                  </div>
                `;
              }
            }}
            onLoad={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'block';
            }}
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