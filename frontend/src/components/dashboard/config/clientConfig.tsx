import type { ProjectStats } from "../../utils/projectStats";

export const clientConfig = {
  badge: {
    text: "Cliente",
    icon: "👤",
    colors: "bg-purple-500/20 text-purple-600 border-purple-500/30",
  },

  stats: (stats: ProjectStats, totalProjects: number) => [
    {
      title: "Proyectos Asignados",
      value: totalProjects,
      description: `${stats.activeProjects} en progreso`,
      background: "bg-base-200",
      onClick: "/projects",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="blue"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-folder-closed-icon lucide-folder-closed"
        >
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
          <path d="M2 10h20" />
        </svg>
      ),
    },
    {
      title: "Pendientes de Revisar",
      value: stats.pendingProjects,
      description: "Requieren tu atención",
      background: "bg-base-200",
      onClick: "/requirements",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="orange"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-bell-icon lucide-bell"
        >
          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
        </svg>
      ),
    },
    {
      title: "Aprobados",
      value: stats.activeProjects,
      description: "En desarrollo",
      background: "bg-base-200",
      onClick: "/contracts",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="green"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-check-line-icon lucide-check-line"
        >
          <path d="M20 4L9 15" />
          <path d="M21 19L3 19" />
          <path d="M9 15L4 10" />
        </svg>
      ),
    },
    {
      title: "Completados",
      value: stats.completedProjects,
      description: "Ver pagos",
      background: "bg-base-200",
      onClick: "/payments",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="pink"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
          <path d="M12 18V6" />
        </svg>
      ),
    },
  ],

  quickActions: [
    {
      label: "Unirse a Proyecto",
      path: "/projects",
      icon: "plus",
      variant: "primary",
      background: "from-purple-500 to-pink-500",
    },
    {
      label: "Revisar Requisitos",
      path: "/requirements",
      icon: "clipboard",
      variant: "outline",
    },
    {
      label: "Ver Contratos",
      path: "/contracts",
      icon: "document-text",
      variant: "outline",
    },
    {
      label: "Gestionar Pagos",
      path: "/payments",
      icon: "payment",
      variant: "outline",
    },
  ],

  tips: [
    "Revisa los requisitos detalladamente antes de aprobar",
    "Comunica cambios claramente al freelancer",
    "Verifica el progreso regularmente",
    "Realiza pagos a tiempo para mantener buenas relaciones",
  ],

  emptyState: {
    title: "No estás en ningún proyecto aún",
    description: "Únete a un proyecto usando un código de invitación",
    buttonText: "Unirse a Proyecto",
    buttonPath: "/projects",
  },

  banner: {
    title: "Tu proceso",
    description:
      "Únete a proyectos → Revisa requisitos → Aprueba o solicita cambios → Revisa contratos → Aprueba contratos → Sigue el progreso → Realiza pagos",
  },
};
