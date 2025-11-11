import api from "./api";
import type { TaskStatus } from "../pages/tasks/task.types";

export interface TaskResponse {
  id: string;
  status: TaskStatus;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  requirementId: string;
  requirement: {
    id: string;
    description: string;
  };
  project: {
    id: string;
    name: string;
  };
}

export interface UpdateTaskStatusDto {
  status: TaskStatus;
}

export const taskService = {
  // Obtener todas las tareas de un proyecto
  getTasksByProject: async (projectId: string): Promise<TaskResponse[]> => {
    const response = await api.get(`/projects/${projectId}/tasks`);
    return response.data;
  },

  // Actualizar solo el estado de una tarea
  updateTaskStatus: async (
    taskId: string,
    status: TaskStatus
  ): Promise<TaskResponse> => {
    const response = await api.patch(`/tasks/${taskId}/status`, { status });
    return response.data;
  },

  // Subir imagen de evidencia
  uploadTaskImage: async (
    taskId: string,
    file: File
  ): Promise<TaskResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(`/tasks/${taskId}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
