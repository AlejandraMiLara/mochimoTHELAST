import type { FC } from "react";
import { DashboardStats } from "./shared/DashboardStats";
import { QuickActions } from "./shared/QuickActions";
import { ProjectCard } from "./shared/ProjectCard";
import { statusColors, statusText } from "./shared/StatusColors";
import { useDashboard } from "../../hooks/Dashboard/useDashboard";

interface DashboardProps {
  user: any;
  profile: any;
  projects: any[];
  projectsLoading: boolean;
  navigate: (path: string) => void;
  role: "FREELANCER" | "CLIENT";
}

export const Dashboard: FC<DashboardProps> = ({
  user,
  projects,
  projectsLoading,
  navigate,
  role,
}) => {
  const { stats, actions, urgentItems, config } = useDashboard({
    user,
    projects,
    projectsLoading,
    role,
  });

  if (projectsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  const urgentTitle =
    role === "FREELANCER" ? "Requiere Atención" : "Por Aprobar";
  const urgentIcon = (
    <span className="text-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        fill="#FFFF55"
      >
        <path d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3zM12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z" />
      </svg>
    </span>
  );

  const projectsTitle =
    role === "FREELANCER" ? "Proyectos Recientes" : "Proyectos Asignados";
  const projectsIcon = (
    <span className="text-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        fill="#FFFF55"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm1 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1zm3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z" />
      </svg>
    </span>
  );

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-7xl mx-auto backdrop-blur-sm">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-16 bg-base-100 border border-base-300 rounded-2xl flex items-center justify-center text-2xl shadow-xl backdrop-blur-sm">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-base-content">
              Hola, {user.email.split("@")[0]}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge bg-primary/20 text-primary border-primary/30">
                {role === "FREELANCER" ? "Freelancer" : "Cliente"}
              </span>
              <span className="text-sm text-base-content/70">
                {projects.length} proyectos
              </span>
            </div>
          </div>
        </div>
      </div>

      <DashboardStats stats={stats} navigate={navigate} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <QuickActions
          actions={actions}
          navigate={navigate}
          title="Acciones Rápidas"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="#FFFF55"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <path d="M14.69,2.21L4.33,11.49c-0.64,0.58-0.28,1.65,0.58,1.73L13,14l-4.85,6.76c-0.22,0.31-0.19,0.74,0.08,1.01h0 c0.3,0.3,0.77,0.31,1.08,0.02l10.36-9.28c0.64-0.58,0.28-1.65-0.58-1.73L11,10l4.85-6.76c0.22-0.31,0.19-0.74-0.08-1.01l0,0 C15.47,1.93,15,1.92,14.69,2.21z" />
              </g>
            </svg>
          }
        />

        <div className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-xl backdrop-blur-sm">
          <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
            {urgentIcon} {urgentTitle}
          </h2>
          {urgentItems.length > 0 ? (
            <div className="space-y-3">
              {urgentItems.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/requirements/${project.id}`)}
                  className="bg-base-200 p-3 rounded-lg cursor-pointer hover:bg-base-300 transition-colors duration-300 border border-base-300 group"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-base-content truncate group-hover:text-primary transition-colors">
                      {project.name}
                    </div>
                    <span className="badge badge-warning badge-sm">
                      {project.status === "CONTRACT_REVIEW"
                        ? "Contrato"
                        : "Revisión"}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-sm text-base-content/70 mt-1 line-clamp-1">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-base-content/70">
                {role === "FREELANCER" ? "Todo al día" : "Todo revisado"}
              </p>
              <p className="text-sm text-base-content/50">
                No hay tareas urgentes
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-3 bg-base-100 rounded-2xl p-6 border border-base-300 shadow-xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
              {projectsIcon} {projectsTitle}
            </h2>
            <button
              onClick={() => navigate("/projects")}
              className="btn btn-sm btn-ghost text-primary"
            >
              Ver todos →
            </button>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  navigate={navigate}
                  statusColors={statusColors}
                  statusText={statusText}
                  showFreelancer={role === "CLIENT"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-base-content font-medium mb-2">
                {config.emptyState.title}
              </p>
              <p className="text-base-content/70 mb-4">
                {config.emptyState.description}
              </p>
              <button
                onClick={() => navigate(config.emptyState.buttonPath)}
                className="btn btn-primary border-none"
              >
                {config.emptyState.buttonText}
              </button>
            </div>
          )}
        </div>
      </div>

      {role === "CLIENT" && (
        <div className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-xl backdrop-blur-sm">
          <h2 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
            <span className="text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="#FFFF55"
              >
                <rect fill="none" height="24" width="24" />
                <g>
                  <path d="M14.06,9.94L13,9.45c-0.39-0.18-0.39-0.73,0-0.91l1.06-0.49L14.55,7c0.18-0.39,0.73-0.39,0.91,0l0.49,1.06L17,8.55 c0.39,0.18,0.39,0.73,0,0.91l-1.06,0.49L15.45,11c-0.18,0.39-0.73,0.39-0.91,0L14.06,9.94z M4.45,13l0.49-1.06L6,11.45 c0.39-0.18,0.39-0.73,0-0.91l-1.06-0.49L4.45,9C4.28,8.61,3.72,8.61,3.55,9l-0.49,1.06L2,10.55c-0.39,0.18-0.39,0.73,0,0.91 l1.06,0.49L3.55,13C3.72,13.39,4.28,13.39,4.45,13z M8.96,7.99l0.63-1.4l1.4-0.63c0.39-0.18,0.39-0.73,0-0.91l-1.4-0.63l-0.63-1.4 c-0.18-0.39-0.73-0.39-0.91,0l-0.63,1.4l-1.4,0.63c-0.39,0.18-0.39,0.73,0,0.91l1.4,0.63l0.63,1.4C8.22,8.38,8.78,8.38,8.96,7.99z M22.34,8.27c-0.4-0.4-1.07-0.39-1.45,0.04l-6.39,7.18l-3.29-3.29c-0.39-0.39-1.02-0.39-1.41,0l-6.04,6.05 c-0.41,0.41-0.41,1.09,0,1.5c0.41,0.41,1.09,0.41,1.5,0l5.25-5.26l3.25,3.25c0.41,0.41,1.07,0.39,1.45-0.04l7.17-8.07 C22.73,9.24,22.71,8.64,22.34,8.27z" />
                </g>
              </svg>
            </span>{" "}
            Proceso del Proyecto
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-base-content/70">
            <span className="bg-base-200 px-3 py-1 rounded-full border border-base-300">
              Unirse
            </span>
            <span className="text-primary">→</span>
            <span className="bg-base-200 px-3 py-1 rounded-full border border-base-300">
              Revisar
            </span>
            <span className="text-primary">→</span>
            <span className="bg-base-200 px-3 py-1 rounded-full border border-base-300">
              Aprobar
            </span>
            <span className="text-primary">→</span>
            <span className="bg-base-200 px-3 py-1 rounded-full border border-base-300">
              Contrato
            </span>
            <span className="text-primary">→</span>
            <span className="bg-base-200 px-3 py-1 rounded-full border border-base-300">
              Seguir
            </span>
            <span className="text-primary">→</span>
            <span className="bg-base-200 px-3 py-1 rounded-full border border-base-300">
              Pagar
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
