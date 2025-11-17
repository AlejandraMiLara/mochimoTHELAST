export type ProjectStatus =
  | "PENDING" // pendiente de config
  | "REVIEW" // requerimientos en revision
  | "APPROVED" // requerimientos aprobados
  | "INPROGRESS" // en progreso
  | "PAYMENT" // esperando pago
  | "COMPLETED" // completado
  | "CONTRACT_REVIEW" // contrato en revision
  | "CONTRACT_APPROVED"; // contrato aprobado

export type PaymentMode = "HALFHUP" | "FULLADVANCE" | "FULLCOMPLETE";

export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  paymentMode: PaymentMode;
  status: ProjectStatus;
  invitationCode: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  isPublic: boolean;
}

export interface ProjectFormData {
  name: string;
  description: string;
  imageUrl?: string;
  paymentMode: PaymentMode;
  status: ProjectStatus;
  isPublic: boolean;
}
