// src/constants/project.constants.ts
import type { ProjectStatus, PaymentMode } from "./project.types";

export const PROJECT_STATUS_CONFIG: Record<
  ProjectStatus,
  {
    label: string;
    color: string;
    description: string;
  }
> = {
  PENDING: {
    label: "Pendiente",
    color: "badge-warning",
    description: "Pendiente de configuración",
  },
  REVIEW: {
    label: "En Revisión",
    color: "badge-info",
    description: "Requerimientos en revisión",
  },
  APPROVED: {
    label: "Aprobado",
    color: "badge-success",
    description: "Requerimientos aprobados",
  },
  INPROGRESS: {
    label: "En Progreso",
    color: "badge-primary",
    description: "Proyecto en desarrollo",
  },
  PAYMENT: {
    label: "Esperando Pago",
    color: "badge-warning",
    description: "Esperando confirmación de pago",
  },
  COMPLETED: {
    label: "Completado",
    color: "badge-success",
    description: "Proyecto finalizado",
  },
  CONTRACT_REVIEW: {
    label: "Contrato en Revisión",
    color: "badge-info",
    description: "Contrato pendiente de aprobación",
  },
  CONTRACT_APPROVED: {
    label: "Contrato Aprobado",
    color: "badge-success",
    description: "Contrato firmado y aprobado",
  },
};

export const PAYMENT_MODE_CONFIG: Record<
  PaymentMode,
  {
    label: string;
    color: string;
    description: string;
  }
> = {
  HALFHUP: {
    label: "Mitad Adelantado",
    color: "badge-warning",
    description: "50% adelantado, 50% al completar",
  },
  FULLADVANCE: {
    label: "Todo Adelantado",
    color: "badge-success",
    description: "100% pago adelantado",
  },
  FULLCOMPLETE: {
    label: "Al Completar",
    color: "badge-info",
    description: "100% al finalizar el proyecto",
  },
};
