import { useState, useEffect } from "react";
import type {
  Project,
  ProjectFormData,
} from "../../pages/project/project.types";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

function getAuthHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
  };
}

export function useProjects(userId: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInvitationCodes, setUserInvitationCodes] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/projects`, {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error al obtener proyectos: ${response.status}`);
      }

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar proyectos"
      );
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (formData: ProjectFormData, file?: File) => {
    try {
      const { name, description, imageUrl, paymentMode, isPublic, status } = formData;
      
      const formDataPayload = new FormData();
      
      formDataPayload.append("name", name);
      formDataPayload.append("description", description);
      
      const paymentModeMapped =
        paymentMode === "FULLADVANCE"
          ? "UPFRONT"
          : paymentMode === "FULLCOMPLETE"
          ? "ONFINISH"
          : paymentMode;
      
      formDataPayload.append("paymentMode", paymentModeMapped);
      formDataPayload.append("isPublic", String(isPublic));
      formDataPayload.append("status", status);

      if (file) {
        formDataPayload.append("file", file);
      } else if (imageUrl && imageUrl.trim() !== "") {
        formDataPayload.append("imageUrl", imageUrl.trim());
      }

      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        credentials: "include",
        body: formDataPayload,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al crear proyecto");
      }

      const newProject = await response.json();
      setProjects([...projects, newProject]);
      return newProject;
    } catch (err) {
      console.error("Error creating project:", err);
      throw err;
    }
  };

  const updateProject = async (id: string, formData: ProjectFormData) => {
    try {
      const { name, description, imageUrl, paymentMode, isPublic } = formData;
      const paymentModeMapped =
        paymentMode === "FULLADVANCE"
          ? "UPFRONT"
          : paymentMode === "FULLCOMPLETE"
          ? "ONFINISH"
          : paymentMode;
          
      const payload: any = { name, description, paymentMode: paymentModeMapped, isPublic };
      
      if (imageUrl && imageUrl.trim() !== "") {
        payload.imageUrl = imageUrl.trim();
      }
      
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar proyecto");
      }

      const updatedProject = await response.json();
      setProjects(projects.map((p) => (p.id === id ? updatedProject : p)));
      return updatedProject;
    } catch (err) {
      console.error("Error updating project:", err);
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar proyecto");
      }

      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
      throw err;
    }
  };

  const joinProject = async (invitationCode: string) => {
    try {
      const response = await fetch(`${API_URL}/invitations/join`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ invitationCode }),
      });

      if (!response.ok) {
        throw new Error("Error al unirse al proyecto");
      }

      if (!userInvitationCodes.includes(invitationCode)) {
        setUserInvitationCodes([...userInvitationCodes, invitationCode]);
      }

      await fetchProjects();
    } catch (err) {
      console.error("Error joining project:", err);
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    userInvitationCodes,
    createProject,
    updateProject,
    deleteProject,
    joinProject,
    refetch: fetchProjects,
  };
}