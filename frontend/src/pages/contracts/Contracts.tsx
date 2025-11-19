import { useState, useEffect } from 'react';
import DashboardLayout from "../../layouts/DashBoardLayout";
import { useAuth } from "../../hooks/useAuth";
import { useContracts } from "../../hooks/useContracts";
import type { Contract } from "../../services/contract.service";
import ContractCard from "../../components/contracts/ContractCard";
import CreateContractForm from "../../components/contracts/CreateContractForm";
import RevisionModal from "../../components/contracts/RevisionModal";
import { useProjects } from "../../hooks/projects/useProjects";

interface Project {
  id: string;
  name: string;
  status: string;
}

export default function Contracts() {
  const { user } = useAuth();
  const { projects, loading: projectsLoading } = useProjects(user?.id || '');
  const { createContract, submitContract, getContractForProject, reviewContract, loading } = useContracts();
  
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [contract, setContract] = useState<Contract | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isFreelancer = String(user?.role) === "FREELANCER";

  // Filtrar proyectos según el rol
  const availableProjects = projects.filter(p => {
    if (isFreelancer) {
      return p.status === 'APPROVED' || p.status === 'CONTRACT_REVIEW' || p.status === 'CONTRACT_APPROVED' || p.status === 'INPROGRESS' || p.status === 'PAYMENT' || p.status === 'COMPLETED';
    } else {
      return p.status === 'CONTRACT_REVIEW' || p.status === 'CONTRACT_APPROVED' || p.status === 'INPROGRESS' || p.status === 'PAYMENT' || p.status === 'COMPLETED';
    }
  });

  useEffect(() => {
    if (selectedProjectId) {
      loadContract();
    }
  }, [selectedProjectId]);

  const loadContract = async () => {
    try {
      setError(null);
      const data = await getContractForProject(selectedProjectId);
      setContract(data);
    } catch (err: any) {
      setContract(null);
      if (!err.message.includes('404')) {
        setError(err.message);
      }
    }
  };

  const handleCreateContract = async (data: any) => {
    try {
      setError(null);
      const newContract = await createContract(data);
      setContract(newContract);
      setShowCreateForm(false);
      setSuccess('Contrato creado exitosamente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmitContract = async () => {
    if (!contract) return;
    try {
      setError(null);
      await submitContract(contract.id);
      await loadContract();
      setSuccess('Contrato enviado al cliente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleApproveContract = async () => {
    if (!contract) return;
    try {
      setError(null);
      await reviewContract(contract.id, { action: 'APPROVE' });
      await loadContract();
      setSuccess('Contrato aprobado exitosamente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRequestRevision = async (reason: string) => {
    if (!contract) return;
    try {
      setError(null);
      await reviewContract(contract.id, { action: 'REQUEST_REVISION', reason });
      await loadContract();
      setSuccess('Solicitud de revisión enviada');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Contratos</h2>
        <p className="text-gray-600 mt-1">
          {isFreelancer 
            ? "Gestiona tus contratos como freelancer" 
            : "Gestiona tus contratos como cliente"
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
            setShowCreateForm(false);
            setContract(null);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={projectsLoading}
        >
          <option value="">-- Selecciona un proyecto --</option>
          {availableProjects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProjectId && (
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Cargando contrato...</p>
            </div>
          ) : contract ? (
            <ContractCard
              contract={contract}
              isFreelancer={isFreelancer}
              onSubmit={handleSubmitContract}
              onApprove={handleApproveContract}
              onRequestRevision={() => setShowRevisionModal(true)}
            />
          ) : isFreelancer && !showCreateForm ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hay contrato para este proyecto
              </h3>
              <p className="text-gray-600 mb-6">
                Crea un contrato para comenzar con el proyecto
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Crear Contrato
              </button>
            </div>
          ) : showCreateForm ? (
            <CreateContractForm
              projectId={selectedProjectId}
              onSubmit={handleCreateContract}
              onCancel={() => setShowCreateForm(false)}
            />
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Esperando Contrato
              </h3>
              <p className="text-gray-600">
                El freelancer aún no ha creado el contrato para este proyecto
              </p>
            </div>
          )}
        </div>
      )}

      {!selectedProjectId && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Selecciona un Proyecto
          </h3>
          <p className="text-gray-600">
            Elige un proyecto de la lista para ver o gestionar su contrato
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
