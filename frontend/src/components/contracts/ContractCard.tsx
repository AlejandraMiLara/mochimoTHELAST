import type { Contract } from '../../services/contract.service';

interface ContractCardProps {
  contract: Contract;
  isFreelancer: boolean;
  onSubmit?: () => void;
  onApprove?: () => void;
  onRequestRevision?: () => void;
}

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  SUBMITTED: 'bg-blue-100 text-blue-800',
  APPROVED: 'bg-green-100 text-green-800',
  REVISION: 'bg-yellow-100 text-yellow-800'
};

const statusLabels = {
  DRAFT: 'Borrador',
  SUBMITTED: 'En Revisión',
  APPROVED: 'Aprobado',
  REVISION: 'Requiere Cambios'
};

export default function ContractCard({ contract, isFreelancer, onSubmit, onApprove, onRequestRevision }: ContractCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Contrato del Proyecto</h3>
          <p className="text-sm text-gray-500 mt-1">
            Creado: {new Date(contract.createdAt).toLocaleDateString('es-MX')}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[contract.status]}`}>
          {statusLabels[contract.status]}
        </span>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Precio Total</p>
            <p className="text-2xl font-bold text-gray-900">
              ${contract.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">IVA</p>
            <p className="text-lg font-semibold text-gray-900">
              {contract.includesIva ? 'Incluido' : 'No incluido'}
            </p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">Contenido del Contrato:</p>
          <p className="text-gray-800 whitespace-pre-line">{contract.content}</p>
        </div>
      </div>

      {contract.status === 'REVISION' && contract.revisionReason && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold text-yellow-800 mb-1">Razón de Revisión:</p>
          <p className="text-sm text-yellow-700">{contract.revisionReason}</p>
        </div>
      )}

      <div className="flex gap-3">
        {isFreelancer && contract.status === 'DRAFT' && (
          <button
            onClick={onSubmit}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Enviar a Cliente
          </button>
        )}

        {!isFreelancer && contract.status === 'SUBMITTED' && (
          <>
            <button
              onClick={onApprove}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Aprobar Contrato
            </button>
            <button
              onClick={onRequestRevision}
              className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition font-medium"
            >
              Solicitar Cambios
            </button>
          </>
        )}

        {contract.status === 'APPROVED' && (
          <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-green-800 font-medium">✓ Contrato Aprobado</p>
          </div>
        )}
      </div>
    </div>
  );
}
