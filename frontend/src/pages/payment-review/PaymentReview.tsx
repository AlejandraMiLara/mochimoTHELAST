import { useState, useEffect } from 'react';
import DashboardLayout from "../../layouts/DashBoardLayout";
import { useAuth } from "../../hooks/useAuth";
import { usePayments } from "../../hooks/usePayments";
import { useProjects } from "../../hooks/projects/useProjects";
import type { PaymentProof } from "../../services/payment.service";
import ProofReviewCard from "../../components/payment-review/ProofReviewCard";
import RevisionModal from "../../components/payment-review/RevisionModal";

export default function PaymentReview() {
  const { user } = useAuth();
  const { projects, loading: projectsLoading } = useProjects(user?.id || '');
  const { getProofsForProject, reviewProof, loading } = usePayments();
  
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [proofs, setProofs] = useState<PaymentProof[]>([]);
  const [selectedProofId, setSelectedProofId] = useState<string>('');
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const pendingProofs = proofs.filter(p => p.status === 'PENDING');
  const reviewedProofs = proofs.filter(p => p.status !== 'PENDING');

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Revisión de Pagos</h2>
        <p className="text-gray-600 mt-1">
          Revisa y aprueba los comprobantes de pago de tus clientes
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
          {loading ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Cargando comprobantes...</p>
            </div>
          ) : (
            <>
              {pendingProofs.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">Comprobantes Pendientes</h3>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      {pendingProofs.length}
                    </span>
                  </div>
                  {pendingProofs.map(proof => (
                    <ProofReviewCard
                      key={proof.id}
                      proof={proof}
                      onApprove={() => handleApproveProof(proof.id)}
                      onRequestRevision={() => openRevisionModal(proof.id)}
                    />
                  ))}
                </div>
              )}

              {reviewedProofs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Historial de Comprobantes</h3>
                  {reviewedProofs.map(proof => (
                    <ProofReviewCard
                      key={proof.id}
                      proof={proof}
                    />
                  ))}
                </div>
              )}

              {proofs.length === 0 && (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No hay comprobantes
                  </h3>
                  <p className="text-gray-600">
                    El cliente aún no ha subido comprobantes de pago para este proyecto
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {!selectedProjectId && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Selecciona un Proyecto
          </h3>
          <p className="text-gray-600">
            Elige un proyecto de la lista para revisar sus comprobantes de pago
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
