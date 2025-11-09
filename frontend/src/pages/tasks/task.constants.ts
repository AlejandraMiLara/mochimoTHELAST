// src/constants/task.constants.ts
import type { TaskStatus } from "./task.types";

export const TASK_STATUS_CONFIG: Record<
  TaskStatus,
  {
    label: string;
    color: string;
    description: string;
    icon: string;
  }
> = {
  TODO: {
    label: "Por Hacer",
    color: "badge-warning",
    description: "Sin comenzar",
    icon: "circle",
  },
  INPROGRESS: {
    label: "En Progreso",
    color: "badge-info",
    description: "En curso",
    icon: "loader",
  },
  DONE: {
    label: "Completado",
    color: "badge-success",
    description: "Finalizado",
    icon: "check-circle",
  },
};
