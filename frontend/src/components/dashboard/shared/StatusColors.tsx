export const statusColors: Record<string, string> = {
  INPROGRESS: "badge-success",
  PENDING: "badge-warning",
  REVIEW: "badge-warning",
  APPROVED: "badge-success",
  PAYMENT: "badge-info",
  COMPLETED: "badge-info",
  CONTRACT_REVIEW: "badge-warning",
  CONTRACT_APPROVED: "badge-success",
};

export const statusText: Record<string, string> = {
  INPROGRESS: "En progreso",
  PENDING: "Pendiente",
  REVIEW: "En revisión",
  APPROVED: "Aprobado",
  PAYMENT: "Pendiente de pago",
  COMPLETED: "Completado",
  CONTRACT_REVIEW: "Contrato en revisión",
  CONTRACT_APPROVED: "Contrato aprobado",
};
