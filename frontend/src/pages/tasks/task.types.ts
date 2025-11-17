export type TaskStatus = "TODO" | "INPROGRESS" | "DONE";

export interface Task {
  id: string;
  status: TaskStatus;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  requirementId: string;

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
