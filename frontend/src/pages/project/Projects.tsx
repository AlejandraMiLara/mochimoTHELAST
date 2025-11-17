import { useState } from "react";
import ProjectCard from "../../components/projects/ProjectCard";
import DashboardLayout from "../../layouts/DashBoardLayout";
import type { ProjectFormData } from "./project.types";
import ProjectFormModal from "../../components/projects/ProjectFormModal";
import InvitationSection from "../../components/projects/InvitationSection";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/projects/useProjects";

export default function Projects() {
  const { user } = useAuth();
  const {
    projects,
    userInvitationCodes,
    createProject,
    updateProject,
    deleteProject,
    joinProject,
  } = useProjects(user?.userId || "");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    imageUrl: "",
    status: "PENDING",
    paymentMode: "HALFHUP",
    isPublic: true,
  });

  if (!user) return null;

  const isFreelancer = String(user.role) === "FREELANCER";
  const isClient = String(user.role) === "CLIENT";

  const filteredProjects = projects;

  const handleCreate = () => {
    if (!isFreelancer) return;
    createProject(formData);
    resetForm();
  };

  const handleUpdate = (id: string) => {
    if (!isFreelancer) return;
    updateProject(id, formData);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (!isFreelancer) return;
    deleteProject(id);
  };

  const openEditModal = (project: any) => {
    if (!isFreelancer) return;
    setEditingId(project.id);
    // Mapear el modo de pago del backend a las opciones del select del frontend
    const paymentModeForForm =
      project.paymentMode === "UPFRONT"
        ? "FULLADVANCE"
        : project.paymentMode === "ONFINISH"
        ? "FULLCOMPLETE"
        : project.paymentMode;
    setFormData({
      name: project.name,
      description: project.description,
      imageUrl: project.imageUrl,
      status: project.status,
      paymentMode: paymentModeForForm,
      isPublic: project.isPublic,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      status: "PENDING",
      paymentMode: "HALFHUP",
      isPublic: true,
    });
  };

  const handleFormChange = (data: Partial<ProjectFormData>) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isFreelancer ? "Mis Proyectos" : "Proyectos Asignados"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isFreelancer
                ? "Gestiona todos tus proyectos en un solo lugar"
                : "Proyectos en los que estás invitado"}
            </p>
          </div>
          {isFreelancer && (
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-cyan-400 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition font-medium shadow-md flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Nuevo Proyecto
            </button>
          )}
        </div>

        {isClient && (
          <InvitationSection
            projects={projects}
            userInvitationCodes={userInvitationCodes}
            onJoinSuccess={joinProject}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onEdit={isFreelancer ? openEditModal : undefined}
              onDelete={isFreelancer ? handleDelete : undefined}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="bg-base-200 border-2 border-dashed border-black rounded-lg p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-16 w-16 text-blue-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">
              {isFreelancer
                ? "No tienes proyectos aún"
                : "No tienes proyectos asignados"}
            </h3>
            <p className="text-blue-700 mb-4">
              {isFreelancer
                ? "Crea tu primer proyecto para comenzar a trabajar"
                : "Usa el codigo de invitacion arriba para unirte a un proyecto"}
            </p>
            {isFreelancer && (
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="bg-cyan-400 text-white px-6 py-2 rounded-lg hover:bg-cyan-500 transition font-medium"
              >
                Crear Proyecto
              </button>
            )}
          </div>
        )}
      </div>

      {isFreelancer && (
        <ProjectFormModal
          isOpen={showModal}
          isEditing={!!editingId}
          formData={formData}
          onClose={resetForm}
          onSubmit={() =>
            editingId ? handleUpdate(editingId) : handleCreate()
          }
          onChange={handleFormChange}
        />
      )}
    </DashboardLayout>
  );
}
