import type { ProjectStats } from "../../utils/projectStats";

export const freelancerConfig = {
  badge: {
    text: "Freelancer",
    icon: "💼",
    colors: "bg-cyan-500/20 text-cyan-600 border-cyan-500/30",
  },

  stats: (stats: ProjectStats, totalProjects: number) => [
    {
      title: "Proyectos Creados",
      value: totalProjects,
      description: `${stats.activeProjects} activos`,
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
      title: "Esperando Cliente",
      value: stats.pendingProjects,
      description: "En revisión",
      background: "bg-base-200",
      onClick: "/projects",
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
          className="lucide lucide-clock-icon lucide-clock"
        >
          <path d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    },
    {
      title: "Completados",
      value: stats.completedProjects,
      description: "Finalizados",
      background: "bg-base-200",
      onClick: "/projects",
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
  ],

  quickActions: [
    {
      label: "Crear Proyecto",
      path: "/projects",
      icon: "plus",
      variant: "primary",
      background: "from-cyan-500 to-blue-500",
    },
    {
      label: "Gestionar Requisitos",
      path: "/requirements",
      icon: "document",
      variant: "outline",
    },
    {
      label: "Mis Tareas",
      path: "/tasks",
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
      label: "Mi Portafolio",
      path: "/portfolio",
      icon: "briefcase",
      variant: "outline-secondary",
      span: 2,
    },
  ],

  tips: [
    "Define requisitos claros antes de enviar a revisión",
    "Actualiza el estado de tus tareas regularmente",
    "Mantén tu portafolio actualizado para atraer clientes",
    "Comunícate proactivamente con tus clientes",
  ],

  emptyState: {
    title: "No has creado proyectos aún",
    description: "Crea tu primer proyecto y comienza a trabajar con clientes",
    buttonText: "Crear Mi Primer Proyecto",
    buttonPath: "/projects",
  },

  banner: {
    title: "Tu flujo de trabajo",
    description:
      "Crea proyectos → Define requisitos → Envía a revisión → Cliente aprueba → Se crean contratos → Completa tareas → Recibe pago",
  },
};
