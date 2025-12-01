import { useMemo } from "react";
import { getProjectStats } from "../../components/utils/projectStats";
import { freelancerConfig } from "../../components/dashboard/config/freelancerConfig";
import { clientConfig } from "../../components/dashboard/config/clientConfig";

interface UseDashboardProps {
  user: any;
  projects: any[];
  projectsLoading: boolean;
  role: "FREELANCER" | "CLIENT";
}

export function useDashboard({
  user,
  projects,
  projectsLoading,
  role,
}: UseDashboardProps) {
  const stats = useMemo(() => getProjectStats(projects), [projects]);

  const freelancerStats = [
    {
      title: "Activos",
      value: stats.activeProjects,
      color: "bg-base-100 border-base-300",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#75FB4C"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
      ),
      path: "/projects?status=active",
      textColor: "text-success",
    },
    {
      title: "En Revisión",
      value: stats.pendingProjects,
      color: "bg-base-100 border-base-300",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#F19E39"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <path d="M8,2C6.9,2,6,2.9,6,4l0.01,3.18c0,0.53,0.21,1.03,0.58,1.41L10,12l-3.41,3.43c-0.37,0.37-0.58,0.88-0.58,1.41L6,20 c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2v-3.16c0-0.53-0.21-1.04-0.58-1.41L14,12l3.41-3.4C17.79,8.22,18,7.71,18,7.18V4 c0-1.1-0.9-2-2-2H8z M16,16.91V19c0,0.55-0.45,1-1,1H9c-0.55,0-1-0.45-1-1v-2.09c0-0.27,0.11-0.52,0.29-0.71L12,12.5l3.71,3.71 C15.89,16.39,16,16.65,16,16.91z" />
        </svg>
      ),
      path: "/requirements?status=pending",
      textColor: "text-warning",
    },
    {
      title: "Completados",
      value: stats.completedProjects,
      color: "bg-base-100 border-base-300",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#75FBFD"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8.29 13.29c-.39.39-1.02.39-1.41 0L5.71 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.58 7.59z" />
        </svg>
      ),
      path: "/projects?status=completed",
      textColor: "text-info",
    },
    {
      title: "Total",
      value: projects.length,
      color: "bg-base-100 border-base-300",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#5985E1"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <path d="M6,20L6,20c1.1,0,2-0.9,2-2v-7c0-1.1-0.9-2-2-2h0c-1.1,0-2,0.9-2,2v7C4,19.1,4.9,20,6,20z" />
            <path d="M16,15v3c0,1.1,0.9,2,2,2h0c1.1,0,2-0.9,2-2v-3c0-1.1-0.9-2-2-2h0C16.9,13,16,13.9,16,15z" />
            <path d="M12,20L12,20c1.1,0,2-0.9,2-2V6c0-1.1-0.9-2-2-2h0c-1.1,0-2,0.9-2,2v12C10,19.1,10.9,20,12,20z" />
          </g>
        </svg>
      ),
      path: "/projects",
      textColor: "text-primary",
    },
  ];

  const clientStats = [
    {
      title: "En Progreso",
      value: stats.activeProjects,
      color: "bg-base-100 border-base-300",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#75FB4C"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <path d="M9.19,6.35c-2.04,2.29-3.44,5.58-3.57,5.89l-2.26-0.97c-0.65-0.28-0.81-1.13-0.31-1.63l3.01-3.01 c0.47-0.47,1.15-0.68,1.81-0.55L9.19,6.35L9.19,6.35z M10.68,16.51c0.3,0.3,0.74,0.38,1.12,0.2c1.16-0.54,3.65-1.81,5.26-3.42 c4.59-4.59,4.63-8.33,4.36-9.93c-0.07-0.4-0.39-0.72-0.79-0.79c-1.6-0.27-5.34-0.23-9.93,4.36c-1.61,1.61-2.87,4.1-3.42,5.26 c-0.18,0.38-0.09,0.83,0.2,1.12L10.68,16.51z M17.65,14.81c-2.29,2.04-5.58,3.44-5.89,3.57l0.97,2.26 c0.28,0.65,1.13,0.81,1.63,0.31l3.01-3.01c0.47-0.47,0.68-1.15,0.55-1.81L17.65,14.81L17.65,14.81z M8.94,17.41 c0.2,1.06-0.15,2.04-0.82,2.71c-0.77,0.77-3.16,1.34-4.71,1.64c-0.69,0.13-1.3-0.48-1.17-1.17c0.3-1.55,0.86-3.94,1.64-4.71 c0.67-0.67,1.65-1.02,2.71-0.82C7.76,15.28,8.72,16.24,8.94,17.41z M13,9c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2S13,10.1,13,9z" />
          </g>
        </svg>
      ),
      path: "/projects?status=active",
      textColor: "text-success",
    },
    {
      title: "Pendientes",
      value: stats.pendingProjects,
      color: "bg-base-100 border-base-300",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#F19E39"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <path d="M8,2C6.9,2,6,2.9,6,4l0.01,3.18c0,0.53,0.21,1.03,0.58,1.41L10,12l-3.41,3.43c-0.37,0.37-0.58,0.88-0.58,1.41L6,20 c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2v-3.16c0-0.53-0.21-1.04-0.58-1.41L14,12l3.41-3.4C17.79,8.22,18,7.71,18,7.18V4 c0-1.1-0.9-2-2-2H8z M16,16.91V19c0,0.55-0.45,1-1,1H9c-0.55,0-1-0.45-1-1v-2.09c0-0.27,0.11-0.52,0.29-0.71L12,12.5l3.71,3.71 C15.89,16.39,16,16.65,16,16.91z" />
        </svg>
      ),
      path: "/requirements?status=pending",
      textColor: "text-warning",
    },
    {
      title: "Por Pagar",
      value: (stats as any).pendingPayments || 0,
      color: "bg-base-100 border-base-300",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#ff2e82"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.42 0 2.13.54 2.39 1.4.12.4.45.7.87.7h.3c.66 0 1.13-.65.9-1.27-.42-1.18-1.4-2.16-2.96-2.54V4.5c0-.83-.67-1.5-1.5-1.5S10 3.67 10 4.5v.66c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-1.65 0-2.5-.59-2.83-1.43-.15-.39-.49-.67-.9-.67h-.28c-.67 0-1.14.68-.89 1.3.57 1.39 1.9 2.21 3.4 2.53v.67c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-.65c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
        </svg>
      ),
      path: "/payments",
      textColor: "text-error",
    },
    {
      title: "Total",
      value: projects.length,
      color: "bg-base-100 border-base-300",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#5985E1"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-1.41-1.41z" />
        </svg>
      ),
      path: "/projects",
      textColor: "text-primary",
    },
  ];

  const freelancerActions = [
    {
      title: "Crear Proyecto",
      description: "Inicia un nuevo trabajo",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#8C1AF6"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      ),
      color: "bg-base-100 border-base-300",
      path: "/projects/new",
    },
    {
      title: "Mis Tareas",
      description: `${stats.activeProjects} pendientes`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#8C1AF6"
        >
          <g>
            <path d="M0,0h24v24H0V0z" fill="none" />
          </g>
          <path d="M19.41,7.41l-4.83-4.83C14.21,2.21,13.7,2,13.17,2H6C4.9,2,4.01,2.9,4.01,4L4,20c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2 V8.83C20,8.3,19.79,7.79,19.41,7.41z M10.23,17.29l-2.12-2.12c-0.39-0.39-0.39-1.02,0-1.41l0,0c0.39-0.39,1.02-0.39,1.41,0 l1.41,1.41l3.54-3.54c0.39-0.39,1.02-0.39,1.41,0l0,0c0.39,0.39,0.39,1.02,0,1.41l-4.24,4.24C11.26,17.68,10.62,17.68,10.23,17.29z M14,9c-0.55,0-1-0.45-1-1V3.5L18.5,9H14z" />
        </svg>
      ),
      color: "bg-base-100 border-base-300",
      path: "/tasks",
    },
    {
      title: "Contratos",
      description: "Gestionar acuerdos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#8C1AF6"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M13,17H8c-0.55,0-1-0.45-1-1 c0-0.55,0.45-1,1-1h5c0.55,0,1,0.45,1,1C14,16.55,13.55,17,13,17z M16,13H8c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1h8 c0.55,0,1,0.45,1,1C17,12.55,16.55,13,16,13z M16,9H8C7.45,9,7,8.55,7,8c0-0.55,0.45-1,1-1h8c0.55,0,1,0.45,1,1 C17,8.55,16.55,9,16,9z" />
        </svg>
      ),
      color: "bg-base-100 border-base-300",
      path: "/contracts",
    },
    {
      title: "Portafolio",
      description: "Mostrar mi trabajo",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#8C1AF6"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M13 16h-2c-.55 0-1-.45-1-1H3.01v4c0 1.1.9 2 2 2H19c1.1 0 2-.9 2-2v-4h-7c0 .55-.45 1-1 1zm7-9h-4c0-2.21-1.79-4-4-4S8 4.79 8 7H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-1c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 7c0-1.1.9-2 2-2s2 .9 2 2H9.99 10z" />
        </svg>
      ),
      color: "bg-base-100 border-base-300",
      path: "/portfolio",
    },
  ];

  const clientActions = [
    {
      title: "Unirse a Proyecto",
      description: "Usar código de invitación",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#8C1AF6"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M3.96 11.38C4.24 9.91 5.62 8.9 7.12 8.9h2.93c.52 0 .95-.43.95-.95S10.57 7 10.05 7H7.22c-2.61 0-4.94 1.91-5.19 4.51C1.74 14.49 4.08 17 7 17h3.05c.52 0 .95-.43.95-.95s-.43-.95-.95-.95H7c-1.91 0-3.42-1.74-3.04-3.72zM9 13h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1s.45 1 1 1zm7.78-6h-2.83c-.52 0-.95.43-.95.95s.43.95.95.95h2.93c1.5 0 2.88 1.01 3.16 2.48.38 1.98-1.13 3.72-3.04 3.72h-3.05c-.52 0-.95.43-.95.95s.43.95.95.95H17c2.92 0 5.26-2.51 4.98-5.49-.25-2.6-2.59-4.51-5.2-4.51z" />
        </svg>
      ),
      color: "bg-base-100 border-base-300",
      path: "/projects/join",
    },
    {
      title: "Revisar Requisitos",
      description: `${stats.pendingProjects} pendientes`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#8C1AF6"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm1 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1zm3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      ),
      color: "bg-base-100 border-base-300",
      path: "/requirements",
    },
    {
      title: "Ver Contratos",
      description: "Firmar acuerdos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#8C1AF6"
        >
          <rect fill="none" height="24" width="24" />
          <path d="M14,11c0,0.55-0.45,1-1,1H4c-0.55,0-1-0.45-1-1s0.45-1,1-1h9C13.55,10,14,10.45,14,11z M3,7c0,0.55,0.45,1,1,1h9 c0.55,0,1-0.45,1-1s-0.45-1-1-1H4C3.45,6,3,6.45,3,7z M10,15c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1s0.45,1,1,1h5 C9.55,16,10,15.55,10,15z M18.01,12.87l0.71-0.71c0.39-0.39,1.02-0.39,1.41,0l0.71,0.71c0.39,0.39,0.39,1.02,0,1.41l-0.71,0.71 L18.01,12.87z M17.3,13.58l-5.16,5.16C12.05,18.83,12,18.95,12,19.09v1.41c0,0.28,0.22,0.5,0.5,0.5h1.41c0.13,0,0.26-0.05,0.35-0.15 l5.16-5.16L17.3,13.58z" />
        </svg>
      ),
      color: "bg-base-100 border-base-300",
      path: "/contracts",
    },
    {
      title: "Realizar Pago",
      description: "Subir comprobante",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="#8C1AF6"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5c-.55 0-1-.45-1-1v-5h16v5c0 .55-.45 1-1 1zm1-10H4V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1z" />
        </svg>
      ),
      color: "bg-base-100 border-base-300",
      path: "/payments/new",
    },
  ];

  const urgentItems = useMemo(() => {
    if (role === "FREELANCER") {
      return projects
        .filter((p) =>
          ["REVIEW", "PENDING", "CONTRACT_REVIEW"].includes(p.status)
        )
        .slice(0, 3);
    } else {
      return projects
        .filter((p) => ["REVIEW", "CONTRACT_REVIEW"].includes(p.status))
        .slice(0, 3);
    }
  }, [projects, role]);

  const config = role === "FREELANCER" ? freelancerConfig : clientConfig;
  const statsData = role === "FREELANCER" ? freelancerStats : clientStats;
  const actions = role === "FREELANCER" ? freelancerActions : clientActions;

  return {
    stats: statsData,
    actions,
    urgentItems,
    config,
    projectsLoading,
    user,
    projects,
  };
}
