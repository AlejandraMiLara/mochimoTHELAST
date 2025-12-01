import { useState, useEffect } from "react";
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
  const { projects, loading: projectsLoading } = useProjects(user?.id || "");
  const {
    createContract,
    submitContract,
    getContractForProject,
    reviewContract,
    updateContract,
    loading,
  } = useContracts();

  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [contract, setContract] = useState<Contract | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isFreelancer = String(user?.role) === "FREELANCER";

  // Filtrar proyectos según el rol
  const availableProjects = projects.filter((p) => {
    if (isFreelancer) {
      return (
        p.status === "APPROVED" ||
        p.status === "CONTRACT_REVIEW" ||
        p.status === "CONTRACT_APPROVED" ||
        p.status === "INPROGRESS" ||
        p.status === "PAYMENT" ||
        p.status === "COMPLETED"
      );
    } else {
      return (
        p.status === "CONTRACT_REVIEW" ||
        p.status === "CONTRACT_APPROVED" ||
        p.status === "INPROGRESS" ||
        p.status === "PAYMENT" ||
        p.status === "COMPLETED"
      );
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
      if (!err.message.includes("404")) {
        setError(err.message);
      }
    }
  };

  const handleCreateContract = async (data: any) => {
    try {
      setError(null);
      if (isEditing && contract) {
        const updatedContract = await updateContract(contract.id, data);
        setContract(updatedContract);
        setSuccess("Contrato actualizado exitosamente");
      } else {
        const newContract = await createContract(data);
        setContract(newContract);
        setSuccess("Contrato creado exitosamente");
      }
      setShowCreateForm(false);
      setIsEditing(false);
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
      setSuccess("Contrato enviado al cliente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleApproveContract = async () => {
    if (!contract) return;
    try {
      setError(null);
      await reviewContract(contract.id, { action: "APPROVE" });
      await loadContract();
      setSuccess("Contrato aprobado exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRequestRevision = async (reason: string) => {
    if (!contract) return;
    try {
      setError(null);
      await reviewContract(contract.id, { action: "REQUEST_REVISION", reason });
      await loadContract();
      setSuccess("Solicitud de revisión enviada");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEditContract = () => {
    console.log("Editando contrato:", contract);
    console.log(
      "Estado antes - isEditing:",
      isEditing,
      "showCreateForm:",
      showCreateForm
    );
    setIsEditing(true);
    setShowCreateForm(true);
    console.log("Estado después - isEditing: true, showCreateForm: true");
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Contratos</h2>
        <p className="text-slate-400 mt-1">
          {isFreelancer
            ? "Gestiona tus contratos como freelancer"
            : "Gestiona tus contratos como cliente"}
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

      <div className="bg-base-200 rounded-lg shadow-md p-6 mb-6 text-white">
        <label className="block text-sm font-medium text-white mb-2">
          Selecciona un Proyecto
        </label>
        <select
          value={selectedProjectId}
          onChange={(e) => {
            setSelectedProjectId(e.target.value);
            setShowCreateForm(false);
            setIsEditing(false);
            setContract(null);
          }}
          className="select select-bordered w-full max-w-md px-4 py-3 border border-white rounded-lg bg-base-200 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          disabled={projectsLoading}
        >
          <option value="">Selecciona un proyecto</option>
          {availableProjects.map((project) => (
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
              onEdit={handleEditContract}
            />
          ) : isFreelancer && !showCreateForm && !contract ? (
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
                  className="lucide lucide-file-spreadsheet-icon lucide-file-spreadsheet"
                >
                  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                  <path d="M8 13h2" />
                  <path d="M14 13h2" />
                  <path d="M8 17h2" />
                  <path d="M14 17h2" />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                No hay contrato para este proyecto
              </h3>
              <p className="text-slate-600 mb-6">
                Crea un contrato para comenzar con el proyecto
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-cyan-400 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Crear Contrato
              </button>
            </div>
          ) : null}

          {showCreateForm && (
            <CreateContractForm
              projectId={selectedProjectId}
              onSubmit={handleCreateContract}
              onCancel={() => {
                setShowCreateForm(false);
                setIsEditing(false);
              }}
              initialData={
                isEditing && contract
                  ? {
                      price: contract.price,
                      includesIva: contract.includesIva,
                      content: contract.content,
                    }
                  : undefined
              }
              isEditing={isEditing}
            />
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
              className="lucide lucide-folder-icon lucide-folder"
            >
              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Selecciona un Proyecto
          </h3>
          <p className="text-slate-600">
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
