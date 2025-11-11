// src/pages/Requirements.tsx
"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import DashboardLayout from "../../layouts/DashBoardLayout";
import { useParams } from "react-router-dom";
import RequirementsTable from "../../components/requirements/RequirementsTable";
import RequirementModal from "../../components/requirements/RequirementModal";
import ReviewModal from "../../components/requirements/ReviewModal";
import RequirementsHeader from "../../components/requirements/RequirementsHeader";
import RequirementsStats from "../../components/requirements/RequirementStats";
import { useRequirements } from "../../hooks/Requirements/useRequirements";

export default function Requirements() {
  const { user } = useAuth();
  const { projectId } = useParams<{ projectId: string }>();
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
  } = useRequirements(projectId || "1");

  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ description: "" });

  if (!user) return null;

  const handleCreate = () => {
    createRequirement(formData.description);
    setShowModal(false);
    resetForm();
  };

  const handleUpdate = (id: string) => {
    updateRequirement(id, formData.description);
    setEditingId(null);
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar este requisito?")) {
      deleteRequirement(id);
    }
  };

  const handleSubmitForReview = () => {
    if (confirm("¿Enviar requisitos a revisión del cliente?")) {
      submitForReview();
    }
  };

  const handleReview = (action: "APPROVE" | "REVISION", reason?: string) => {
    reviewRequirements(action, reason);
    setShowReviewModal(false);
  };

  const resetForm = () => {
    setFormData({ description: "" });
  };

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

  return (
    <DashboardLayout>
      <div>
        {error && (
          <div className="alert alert-error mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
            <span className="ml-2 text-white">Cargando requisitos...</span>
          </div>
        ) : (
          <>
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

            <RequirementsTable
              requirements={requirements}
              isFreelancer={isFreelancer}
              canEditRequirements={canEditRequirements}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />

            <RequirementsStats requirements={requirements} project={project} />
          </>
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
