// src/hooks/useProjects.ts
import { useState } from "react";
import type {
  Project,
  ProjectFormData,
} from "../../pages/project/project.types";

export function useProjects(userId: string) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "E-commerce Platform",
      description: "Plataforma de comercio electronico con React y Node.js",
      imageUrl:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=400",
      status: "INPROGRESS",
      paymentMode: "HALFHUP",
      invitationCode: "abc123def",
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: "user123",
    },
    {
      id: "2",
      name: "Mobile App",
      description: "Aplicacion movil React Native para iOS y Android",
      imageUrl:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
      status: "REVIEW",
      paymentMode: "FULLADVANCE",
      invitationCode: "xyz789ghi",
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: "user123",
    },
    {
      id: "3",
      name: "Dashboard Analytics",
      description:
        "Dashboard de análisis de datos con visualizaciones interactivas",
      status: "PENDING",
      paymentMode: "FULLCOMPLETE",
      invitationCode: "mno456pqr",
      isPublic: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: "user123",
    },
    {
      id: "4",
      name: "API REST",
      description: "API REST con Node.js, Express y PostgreSQL",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
      status: "COMPLETED",
      paymentMode: "HALFHUP",
      invitationCode: "stu012vwx",
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: "user123",
    },
  ]);

  // Codigos de invitacion del cliente (simulado)
  const [userInvitationCodes, setUserInvitationCodes] = useState<string[]>([
    "abc123def",
    "xyz789ghi",
  ]);

  // Crear proyecto
  const createProject = (formData: ProjectFormData) => {
    // TODO: POST /projects
    const newProject: Project = {
      id: `temp-${Date.now()}`,
      ...formData,
      invitationCode: `inv-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: userId,
    };

    setProjects([...projects, newProject]);
  };

  // Actualizar proyecto
  const updateProject = (id: string, formData: ProjectFormData) => {
    // TODO: PUT /projects/:id
    setProjects(
      projects.map((p) =>
        p.id === id
          ? {
              ...p,
              ...formData,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  // Eliminar proyecto
  const deleteProject = (id: string) => {
    // TODO: DELETE /projects/:id
    if (confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  // Unirse a proyecto (clientes)
  const joinProject = (invitationCode: string) => {
    // TODO: POST /projects/join
    if (!userInvitationCodes.includes(invitationCode)) {
      setUserInvitationCodes([...userInvitationCodes, invitationCode]);
    }
  };

  return {
    projects,
    userInvitationCodes,
    createProject,
    updateProject,
    deleteProject,
    joinProject,
  };
}
