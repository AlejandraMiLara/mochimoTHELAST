// src/types/task.types.ts

export type TaskStatus = "TODO" | "INPROGRESS" | "DONE";

export interface Task {
  id: string;
  status: TaskStatus;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  requirementId: string;

  // Relaciones expandidas (opcional, para mostrar en UI)
  project?: {
    id: string;
    name: string;
  };
  requirement?: {
    id: string;
    description: string;
  };
}

export interface TaskFormData {
  status: TaskStatus;
  imageUrl?: string;
  projectId: string;
  requirementId: string;
}
