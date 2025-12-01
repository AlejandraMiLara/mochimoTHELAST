import type { Contract } from "../../services/contract.service";

interface ContractCardProps {
  contract: Contract;
  isFreelancer: boolean;
  onSubmit?: () => void;
  onApprove?: () => void;
  onRequestRevision?: () => void;
  onEdit?: () => void;
}

const statusColors: Record<string, string> = {
  DRAFT: "badge-warning",
  SUBMITTED: "badge-info",
  APPROVED: "badge-success",
  REVISION: "badge-error",
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
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 backdrop-blur-sm">
      <div className="card-body">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="card-title text-base-content">
              Contrato del Proyecto
            </h2>
            <p className="text-sm text-base-content/70">
              Creado: {new Date(contract.createdAt).toLocaleDateString("es-MX")}
            </p>
          </div>

          <span className={`badge ${statusColors[contract.status]} badge-lg`}>
            {statusLabels[contract.status]}
          </span>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-base-200 rounded-lg p-4 border border-base-300">
            <p className="text-sm text-base-content/60 mb-1">Precio Total</p>
            <p className="text-2xl font-bold text-primary">
              $
              {contract.price.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="flex-1 bg-base-200 rounded-lg p-4 border border-base-300">
            <p className="text-sm text-base-content/60 mb-1">IVA</p>
            <p
              className={`text-lg font-semibold ${
                contract.includesIva ? "text-success" : "text-error"
              }`}
            >
              {contract.includesIva ? "Incluido" : "No incluido"}
            </p>
          </div>
        </div>

        <div className="bg-base-200 rounded-lg p-4 mb-4 border border-base-300">
          <p className="text-sm font-medium text-base-content/60 mb-2">
            Contenido del Contrato:
          </p>
          <div className="bg-base-100 rounded p-4 border border-base-300">
            <p className="text-base-content whitespace-pre-line leading-relaxed">
              {contract.content}
            </p>
          </div>
        </div>

        {contract.status === "REVISION" && contract.revisionReason && (
          <div className="bg-warning/20 border border-warning/30 rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-warning mb-1">
              Razón de Revisión:
            </p>
            <p className="text-sm text-warning-content">
              {contract.revisionReason}
            </p>
          </div>
        )}

        <div className="card-actions justify-end mt-4">
          {isFreelancer && contract.status === "DRAFT" && (
            <div className="flex gap-2 w-full">
              <button onClick={onEdit} className="btn btn-secondary flex-1">
                Editar
              </button>
              <button
                onClick={onSubmit}
                className="btn btn-primary flex-1 text-white"
              >
                Enviar a Cliente
              </button>
            </div>
          )}

          {isFreelancer && contract.status === "REVISION" && (
            <button
              onClick={onEdit}
              className="btn btn-warning w-full text-white"
            >
              Editar y Corregir
            </button>
          )}

          {!isFreelancer && contract.status === "SUBMITTED" && (
            <div className="flex gap-2 w-full">
              <button
                onClick={onApprove}
                className="btn btn-success flex-1 text-white"
              >
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
