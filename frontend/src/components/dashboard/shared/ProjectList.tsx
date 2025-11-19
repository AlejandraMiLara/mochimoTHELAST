import type { FC } from "react";

interface EmptyStateConfig {
  title: string;
  description: string;
  buttonText: string;
  buttonPath: string;
}

interface ProjectsListProps {
  projects: any[];
  navigate: (path: string) => void;
  title: string;
  emptyState: EmptyStateConfig;
  theme: "cyan" | "purple";
  showReviewBadge?: boolean;
}

const ProjectsList: FC<ProjectsListProps> = ({
  projects,
  navigate,
  title,
  emptyState,
  theme,
  showReviewBadge = false,
}) => {
  const iconColor = theme === "cyan" ? "text-cyan-500" : "text-purple-500";
  const buttonColor =
    theme === "cyan"
      ? "bg-cyan-500 hover:bg-cyan-600"
      : "bg-purple-500 hover:bg-purple-600";
  const linkColor = theme === "cyan" ? "text-cyan-600" : "text-purple-600";

  const getStatusBadge = (status: string) => {
    if (["INPROGRESS", "APPROVED", "CONTRACT_APPROVED"].includes(status)) {
      return "badge-success";
    }
    if (["PENDING", "REVIEW", "CONTRACT_REVIEW"].includes(status)) {
      return "badge-warning";
    }
    return "badge-info";
  };

  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 mb-8">
      <div className="card-body">
        <h3 className="card-title text-white flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-folder-open-dot-icon lucide-folder-open-dot"
          >
            <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
            <circle cx="14" cy="15" r="1" />
          </svg>
          {title}
        </h3>
        <div className="divider my-2"></div>

        {projects.length === 0 ? (
          <div className="text-center py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-600 font-medium">{emptyState.title}</p>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              {emptyState.description}
            </p>
            <button
              onClick={() => navigate(emptyState.buttonPath)}
              className={`btn btn-primary btn-sm ${buttonColor} border-none`}
            >
              {emptyState.buttonText}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 6).map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/requirements/${project.id}`)}
                className="p-4 bg-base-20 rounded-lg hover:bg-gray-50 transition cursor-pointer border border-gray-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white truncate flex-1">
                    {project.name}
                  </h4>
                  <div
                    className={`badge badge-sm ${getStatusBadge(
                      project.status
                    )}`}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 capitalize mb-2">
                  {project.status.toLowerCase().replace("_", " ")}
                </p>
                {project.description && (
                  <p className="text-sm text-white line-clamp-2">
                    {project.description}
                  </p>
                )}
                {showReviewBadge &&
                  ["REVIEW", "CONTRACT_REVIEW"].includes(project.status) && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Requiere tu revisión
                      </span>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}

        {projects.length > 6 && (
          <button
            onClick={() => navigate("/projects")}
            className={`btn btn-sm btn-ghost ${linkColor} mt-2`}
          >
            Ver todos los proyectos →
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
