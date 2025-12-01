import type { FC } from "react";

interface ProjectCardProps {
  project: any;
  navigate: (path: string) => void;
  statusColors: Record<string, string>;
  statusText: Record<string, string>;
  showFreelancer?: boolean;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  project,
  navigate,
  statusColors,
  statusText,
  showFreelancer = false,
}) => {
  return (
    <div
      key={project.id}
      onClick={() => navigate(`/projects/${project.id}`)}
      className="bg-base-200 p-4 rounded-lg cursor-pointer hover:bg-base-300 transition-colors duration-300 border border-base-300 group shadow-md hover:shadow-xl backdrop-blur-sm"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <span
          className={`badge badge-sm ${
            statusColors[project.status] || "badge-warning"
          }`}
        >
          {statusText[project.status] || project.status}
        </span>
      </div>
      {project.description && (
        <p className="text-sm text-base-content/70 line-clamp-2">
          {project.description}
        </p>
      )}
      <div className="flex justify-between text-xs text-base-content/50 mt-3">
        {showFreelancer && (
          <span>{project.freelancerName || "Sin asignar"}</span>
        )}
        <span>
          {project.createdAt
            ? new Date(project.createdAt).toLocaleDateString()
            : ""}
        </span>
      </div>
    </div>
  );
};
