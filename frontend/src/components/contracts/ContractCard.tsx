import type { Contract } from "../../services/contract.service";

interface ContractCardProps {
  contract: Contract;
  isFreelancer: boolean;
  onSubmit?: () => void;
  onApprove?: () => void;
  onRequestRevision?: () => void;
  onEdit?: () => void;
}

const statusColors = {
  DRAFT: "bg-gray-100 text-gray-800",
  SUBMITTED: "bg-blue-100 text-blue-800",
  APPROVED: "bg-green-100 text-green-800",
  REVISION: "bg-yellow-100 text-yellow-800",
};

const statusLabels = {
  DRAFT: "Borrador",
  SUBMITTED: "En Revisión",
  APPROVED: "Aprobado",
  REVISION: "Requiere Cambios",
};

export default function ContractCard({
  contract,
  isFreelancer,
  onSubmit,
  onApprove,
  onRequestRevision,
  onEdit,
}: ContractCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl border border-gray-200">
      <div className="card-body">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="card-title text-white">Contrato del Proyecto</h3>
            <p className="text-sm text-gray-500">
              Creado: {new Date(contract.createdAt).toLocaleDateString("es-MX")}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[contract.status]
            }`}
          >
            {statusLabels[contract.status]}
          </span>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Precio Total</p>
              <p className="text-2xl font-bold text-green-500">
                $
                {contract.price.toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">IVA</p>
              <p className="text-lg font-semibold text-red-400">
                {contract.includesIva ? "Incluido" : "No incluido"}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-lg text-black mb-2">Contenido del Contrato:</p>
            <p className="text-gray-800 whitespace-pre-line">
              {contract.content}
            </p>
          </div>
        </div>

        {/* RAZÓN DE REVISIÓN */}
        {contract.status === "REVISION" && contract.revisionReason && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-yellow-800 mb-1">
              Razón de Revisión:
            </p>
            <p className="text-sm text-yellow-700">{contract.revisionReason}</p>
          </div>
        )}

        {/* ACCIONES */}
        <div className="card-actions justify-end mt-4 w-full">
          {/* Freelancer → borrador */}
          {isFreelancer && contract.status === "DRAFT" && (
            <div className="flex w-full gap-2">
              <button onClick={onEdit} className="btn btn-secondary flex-1">
                Editar
              </button>
              <button onClick={onSubmit} className="btn btn-primary flex-1">
                Enviar a Cliente
              </button>
            </div>
          )}

          {/* Freelancer → revisión */}
          {isFreelancer && contract.status === "REVISION" && (
            <button onClick={onEdit} className="btn btn-warning w-full">
              Editar y Corregir
            </button>
          )}

          {/* Cliente revisa */}
          {!isFreelancer && contract.status === "SUBMITTED" && (
            <div className="flex w-full gap-2">
              <button onClick={onApprove} className="btn btn-success flex-1">
                Aprobar Contrato
              </button>

              <button
                onClick={onRequestRevision}
                className="btn btn-warning flex-1 text-white"
              >
                Solicitar Cambios
              </button>
            </div>
          )}

          {/* Aprobado */}
          {contract.status === "APPROVED" && (
            <div className="alert alert-success w-full">
              <span>✓ Contrato Aprobado</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
