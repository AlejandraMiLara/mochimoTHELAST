import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashBoardLayout";
import { useAuth } from "../../hooks/useAuth";
import { usePayments } from "../../hooks/usePayments";
import { useProjects } from "../../hooks/projects/useProjects";
import type { PaymentProof } from "../../services/payment.service";
import UploadProofForm from "../../components/payments/UploadProofForm";
import ProofCard from "../../components/payments/ProofCard";
import RevisionModal from "../../components/payments/RevisionModal";

export default function Payments() {
  const { user } = useAuth();
  const { projects, loading: projectsLoading } = useProjects(user?.id || "");
  const { uploadProof, getProofsForProject, reviewProof, loading } =
    usePayments();

  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [proofs, setProofs] = useState<PaymentProof[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedProofId, setSelectedProofId] = useState<string>("");
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isClient = String(user?.role) === "CLIENT";

  // Filtrar proyectos que están en estado PAYMENT
  const availableProjects = projects.filter(
    (p) =>
      p.status === "PAYMENT" ||
      p.status === "INPROGRESS" ||
      p.status === "COMPLETED"
  );

  useEffect(() => {
    if (selectedProjectId) {
      loadProofs();
    }
  }, [selectedProjectId]);

  const loadProofs = async () => {
    try {
      setError(null);
      const data = await getProofsForProject(selectedProjectId);
      setProofs(data);
    } catch (err: any) {
      setError(err.message);
      setProofs([]);
    }
  };

  const handleUploadProof = async (file: File) => {
    try {
      setError(null);
      await uploadProof(selectedProjectId, file);
      await loadProofs();
      setShowUploadForm(false);
      setSuccess("Comprobante subido exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleApproveProof = async (proofId: string) => {
    try {
      setError(null);
      await reviewProof(proofId, { action: "APPROVE" });
      await loadProofs();
      setSuccess("Comprobante aprobado exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRequestRevision = async (reason: string) => {
    try {
      setError(null);
      await reviewProof(selectedProofId, {
        action: "REQUEST_REVISION",
        reason,
      });
      await loadProofs();
      setShowRevisionModal(false);
      setSuccess("Solicitud de revisión enviada");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const openRevisionModal = (proofId: string) => {
    setSelectedProofId(proofId);
    setShowRevisionModal(true);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Pagos</h2>
        <p className="text-gray-600 mt-1">
          {isClient
            ? "Sube comprobantes de pago para tus proyectos"
            : "Revisa y aprueba los comprobantes de pago"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
          {success}
        </div>
      )}

      <div className="bg-base-200 rounded-lg shadow p-6 mb-6">
        <label className="block text-sm font-medium text-white mb-2">
          Selecciona un Proyecto
        </label>
        <select
          value={selectedProjectId}
          onChange={(e) => {
            setSelectedProjectId(e.target.value);
            setShowUploadForm(false);
            setProofs([]);
          }}
          className="select select-bordered w-full max-w-md px-4 py-3 border border-white rounded-lg bg-base-200 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          disabled={projectsLoading}
        >
          <option value="">Selecciona un proyecto</option>
          {availableProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name} - {project.status}
            </option>
          ))}
        </select>
      </div>

      {selectedProjectId && (
        <div className="space-y-6">
          {isClient && !showUploadForm && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowUploadForm(true)}
                className="bg-cyan-400 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition font-medium"
              >
                Subir Comprobante
              </button>
            </div>
          )}

          {showUploadForm && (
            <UploadProofForm
              onSubmit={handleUploadProof}
              onCancel={() => setShowUploadForm(false)}
              loading={loading}
            />
          )}

          {loading && !showUploadForm ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Cargando comprobantes...</p>
            </div>
          ) : proofs.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Comprobantes de Pago
              </h3>
              {proofs.map((proof) => (
                <ProofCard
                  key={proof.id}
                  proof={proof}
                  isFreelancer={!isClient}
                  onApprove={() => handleApproveProof(proof.id)}
                  onRequestRevision={() => openRevisionModal(proof.id)}
                />
              ))}
            </div>
          ) : (
            !showUploadForm && (
              <div className="bg-base-200 rounded-lg shadow p-12 text-center">
                <div className="text-6xl mb-4 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-file-exclamation-point-icon lucide-file-exclamation-point"
                  >
                    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No hay comprobantes
                </h3>
                <p className="text-slate-600">
                  {isClient
                    ? "Aún no has subido ningún comprobante de pago para este proyecto"
                    : "El cliente aún no ha subido comprobantes de pago"}
                </p>
              </div>
            )
          )}
        </div>
      )}

      {!selectedProjectId && (
        <div className="bg-base-200 rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-hand-coins-icon lucide-hand-coins"
            >
              <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
              <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
              <path d="m2 16 6 6" />
              <circle cx="16" cy="9" r="2.9" />
              <circle cx="6" cy="5" r="3" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Selecciona un Proyecto
          </h3>
          <p className="text-slate-600">
            Elige un proyecto de la lista para gestionar sus pagos
          </p>
        </div>
      )}

      <RevisionModal
        isOpen={showRevisionModal}
        onClose={() => setShowRevisionModal(false)}
        onSubmit={handleRequestRevision}
      />
    </DashboardLayout>
  );
}
