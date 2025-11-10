// src/hooks/useRequirements.ts
import { useState } from "react";
import { useAuth } from "../useAuth";

type RequirementStatus = "PENDING" | "SUBMITTED" | "APPROVED" | "REVISION";
type ProjectStatus =
  | "PENDING"
  | "REVIEW"
  | "APPROVED"
  | "INPROGRESS"
  | "COMPLETED";

export interface Requirement {
  id: string;
  description: string;
  status: RequirementStatus;
  revisionReason?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
}

export function useRequirements(projectId: string) {
  const { user } = useAuth();

  // TODO: Obtener del backend con GET /projects/:id
  const [project, setProject] = useState<Project>({
    id: projectId,
    name: "E-commerce Platform",
    status: "PENDING",
  });

  // TODO: Obtener del backend con GET /projects/:id/requirements
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "1",
      description: "Autenticación de usuarios con JWT",
      status: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      projectId,
    },
    {
      id: "2",
      description: "Sistema de pagos con Stripe",
      status: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      projectId,
    },
  ]);

  const isFreelancer = user ? String(user.role) === "FREELANCER" : false;
  const isClient = user ? String(user.role) === "CLIENT" : false;

  const canEditRequirements = isFreelancer && project.status === "PENDING";
  const canSubmitForReview =
    isFreelancer && project.status === "PENDING" && requirements.length > 0;
  const canReview = isClient && project.status === "REVIEW";

  // TODO: POST /requirements
  const createRequirement = (description: string) => {
    if (!canEditRequirements) return;

    const newRequirement: Requirement = {
      id: `temp-${Date.now()}`,
      description,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      projectId,
    };

    setRequirements([...requirements, newRequirement]);
  };

  // TODO: PUT /requirements/:id
  const updateRequirement = (id: string, description: string) => {
    if (!canEditRequirements) return;

    setRequirements(
      requirements.map((r) =>
        r.id === id
          ? {
              ...r,
              description,
              updatedAt: new Date().toISOString(),
            }
          : r
      )
    );
  };

  // TODO: DELETE /requirements/:id
  const deleteRequirement = (id: string) => {
    if (!canEditRequirements) return;
    setRequirements(requirements.filter((r) => r.id !== id));
  };

  // TODO: POST /projects/:id/requirements/submit
  const submitForReview = () => {
    if (!canSubmitForReview) return;

    setRequirements(
      requirements.map((r) => ({
        ...r,
        status: "SUBMITTED" as RequirementStatus,
        updatedAt: new Date().toISOString(),
      }))
    );
    setProject({ ...project, status: "REVIEW" });
    alert("Requisitos enviados a revisión exitosamente");
  };

  // TODO: POST /projects/:id/requirements/review
  const reviewRequirements = (
    action: "APPROVE" | "REVISION",
    reason?: string
  ) => {
    if (!canReview) return;

    if (action === "APPROVE") {
      setRequirements(
        requirements.map((r) => ({
          ...r,
          status: "APPROVED" as RequirementStatus,
          updatedAt: new Date().toISOString(),
        }))
      );
      setProject({ ...project, status: "APPROVED" });
      alert("Requisitos aprobados exitosamente");
    } else {
      setRequirements(
        requirements.map((r) => ({
          ...r,
          status: "REVISION" as RequirementStatus,
          revisionReason: reason,
          updatedAt: new Date().toISOString(),
        }))
      );
      setProject({ ...project, status: "PENDING" });
      alert("Requisitos enviados a revisión");
    }
  };

  return {
    project,
    requirements,
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
  };
}
