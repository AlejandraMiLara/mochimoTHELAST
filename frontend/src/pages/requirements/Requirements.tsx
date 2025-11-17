"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashBoardLayout";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../../hooks/projects/useProjects";
import { useRequirements } from "../../hooks/Requirements/useRequirements";
import RequirementsHeader from "../../components/requirements/RequirementsHeader";
import RequirementsTable from "../../components/requirements/RequirementsTable";
import RequirementsStats from "../../components/requirements/RequirementStats";
import RequirementModal from "../../components/requirements/RequirementModal";
import ReviewModal from "../../components/requirements/ReviewModal";

export default function Requirements() {
  const { user } = useAuth();
  const { projectId: projectIdParam } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [selectedProjectId, setSelectedProjectId] = useState(
    projectIdParam || ""
  );
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ description: "" });

  const {
    project,
    requirements,
    loading,
    error,
    isFreelancer,
    isClient,
    canEditRequirements,
    canSubmitForReview,
    canReview,
    createRequirement,
    updateRequirement,
    deleteRequirement,
    submitForReview,
    reviewRequirements,
  } = useRequirements(selectedProjectId || null);

  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
    refetch: refetchProjects,
  } = useProjects(user?.userId || "");

  useEffect(() => {
    if (projectIdParam) {
      setSelectedProjectId(projectIdParam);
    } else {
      setSelectedProjectId("");
    }
  }, [projectIdParam]);

  if (!user) return null;

  const handleProjectSelect = (value: string) => {
    setSelectedProjectId(value);
    if (value) {
      navigate("/requirements/" + value);
    } else {
      navigate("/requirements");
    }
  };

  const handleCreate = async () => {
    try {
      await createRequirement(formData.description);
      setShowModal(false);
      resetForm();
    } catch {}
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateRequirement(id, formData.description);
      setEditingId(null);
      setShowModal(false);
      resetForm();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este requisito?")) return;
    try {
      await deleteRequirement(id);
    } catch {}
  };

  const handleSubmitForReview = async () => {
    if (!confirm("¿Enviar requisitos a revisión del cliente?")) return;
    try {
      await submitForReview();
    } catch {}
  };

  const handleReview = async (
    action: "APPROVE" | "REVISION",
    reason?: string
  ) => {
    try {
      await reviewRequirements(action, reason);
      setShowReviewModal(false);
    } catch {}
  };

  const resetForm = () => setFormData({ description: "" });

  const openEditModal = (req: any) => {
    setEditingId(req.id);
    setFormData({ description: req.description });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingId(null);
    resetForm();
    setShowModal(true);
  };

  const showRequirementsError = Boolean(error && selectedProjectId);

  return (
    <DashboardLayout>
      <div className="mb-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Requisitos
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Crea, envía y aprueba requisitos para mantener alineado el proyecto.
          </p>
        </header>

        <div className="bg-base-200 border border-blue-200 text-white px-4 py-3 rounded">
          <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-semibold">
                Los requisitos se revisan antes de avanzar
              </p>
              <p className="text-sm">
                Una vez enviados a revisión, el cliente puede aprobarlos o
                solicitar cambios. Solo así podrás avanzar a contratos y tareas.
              </p>
            </div>
          </div>
        </div>

        {projectsError && (
          <div className="alert alert-error">
            <span>{projectsError}</span>
            <button className="btn btn-sm" onClick={refetchProjects}>
              Reintentar
            </button>
          </div>
        )}

        <div className="bg-base-200 rounded-lg shadow-md p-6">
          <label className="block text-sm font-medium text-white mb-2">
            Selecciona un proyecto
          </label>
          <select
            className="select select-bordered w-full max-w-xl bg-gray-900/50 text-gray-100"
            value={selectedProjectId}
            onChange={(e) => handleProjectSelect(e.target.value)}
            disabled={projectsLoading}
          >
            <option value="">
              {projectsLoading
                ? "Cargando proyectos..."
                : "Selecciona un proyecto"}
            </option>
            {projects.map((proj) => (
              <option key={proj.id} value={proj.id}>
                {proj.name}
              </option>
            ))}
          </select>
        </div>

        {!selectedProjectId ? (
          <div className="bg-base-200 rounded-lg shadow-md p-12 text-center border border-dashed border-gray-500">
            <div className="flex flex-col items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 19a9 9 0 1114 0H5z"
                />
              </svg>
              <h3 className="text-xl font-semibold">Selecciona un proyecto</h3>
              <p className="text-sm text-base-content/70 mt-2">
                Elige un proyecto arriba para gestionar sus requisitos.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {showRequirementsError && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            {loading ? (
              <div className="bg-base-200 rounded-lg shadow-md p-12 text-center">
                <div className="loading loading-spinner loading-lg text-cyan-500"></div>
                <p className="text-white mt-4">Cargando requisitos...</p>
              </div>
            ) : (
              <>
                {project && (
                  <RequirementsHeader
                    project={project}
                    isFreelancer={isFreelancer}
                    isClient={isClient}
                    canEditRequirements={canEditRequirements}
                    canSubmitForReview={canSubmitForReview}
                    canReview={canReview}
                    onCreateClick={openCreateModal}
                    onSubmitClick={handleSubmitForReview}
                    onReviewClick={() => setShowReviewModal(true)}
                  />
                )}

                <RequirementsTable
                  requirements={requirements}
                  isFreelancer={isFreelancer}
                  canEditRequirements={canEditRequirements}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />

                {project && (
                  <RequirementsStats
                    requirements={requirements}
                    project={project}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>

      {showModal && isFreelancer && (
        <RequirementModal
          isOpen={showModal}
          isEditing={!!editingId}
          description={formData.description}
          onClose={() => {
            setShowModal(false);
            resetForm();
          }}
          onSave={() => (editingId ? handleUpdate(editingId) : handleCreate())}
          onChange={(value) => setFormData({ description: value })}
        />
      )}

      {showReviewModal && isClient && (
        <ReviewModal
          isOpen={showReviewModal}
          requirements={requirements}
          onClose={() => setShowReviewModal(false)}
          onReview={handleReview}
        />
      )}
    </DashboardLayout>
  );
}
