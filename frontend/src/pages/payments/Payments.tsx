import { useState, useEffect } from 'react';
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
  const { projects, loading: projectsLoading } = useProjects(user?.id || '');
  const { uploadProof, getProofsForProject, reviewProof, loading } = usePayments();
  
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [proofs, setProofs] = useState<PaymentProof[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedProofId, setSelectedProofId] = useState<string>('');
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isClient = String(user?.role) === "CLIENT";

  // Filtrar proyectos que están en estado PAYMENT
  const availableProjects = projects.filter(p => 
    p.status === 'PAYMENT' || p.status === 'INPROGRESS' || p.status === 'COMPLETED'
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
      setSuccess('Comprobante subido exitosamente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleApproveProof = async (proofId: string) => {
    try {
      setError(null);
      await reviewProof(proofId, { action: 'APPROVE' });
      await loadProofs();
      setSuccess('Comprobante aprobado exitosamente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRequestRevision = async (reason: string) => {
    try {
      setError(null);
      await reviewProof(selectedProofId, { action: 'REQUEST_REVISION', reason });
      await loadProofs();
      setShowRevisionModal(false);
      setSuccess('Solicitud de revisión enviada');
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
            : "Revisa y aprueba los comprobantes de pago"
          }
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

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona un Proyecto
        </label>
        <select
          value={selectedProjectId}
          onChange={(e) => {
            setSelectedProjectId(e.target.value);
            setShowUploadForm(false);
            setProofs([]);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={projectsLoading}
        >
          <option value="">-- Selecciona un proyecto --</option>
          {availableProjects.map(project => (
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
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
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
              <h3 className="text-lg font-semibold text-gray-900">Comprobantes de Pago</h3>
              {proofs.map(proof => (
                <ProofCard
                  key={proof.id}
                  proof={proof}
                  isFreelancer={!isClient}
                  onApprove={() => handleApproveProof(proof.id)}
                  onRequestRevision={() => openRevisionModal(proof.id)}
                />
              ))}
            </div>
          ) : !showUploadForm && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hay comprobantes
              </h3>
              <p className="text-gray-600">
                {isClient 
                  ? "Aún no has subido ningún comprobante de pago para este proyecto"
                  : "El cliente aún no ha subido comprobantes de pago"
                }
              </p>
            </div>
          )}
        </div>
      )}

      {!selectedProjectId && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">💳</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Selecciona un Proyecto
          </h3>
          <p className="text-gray-600">
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
