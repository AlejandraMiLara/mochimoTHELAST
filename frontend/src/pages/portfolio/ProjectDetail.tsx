import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { portfolioService, type PublicProjectDetail } from "../../services/portfolio.service";
import DashboardLayout from "../../layouts/DashBoardLayout";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState<PublicProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const statusColors: Record<string, string> = {
    INPROGRESS: "badge-success",
    PENDING: "badge-warning",
    REVIEW: "badge-warning",
    APPROVED: "badge-success",
    PAYMENT: "badge-info",
    COMPLETED: "badge-info",
    CONTRACT_REVIEW: "badge-warning",
    CONTRACT_APPROVED: "badge-success",
  };

  const statusText: Record<string, string> = {
    INPROGRESS: "En progreso",
    PENDING: "Pendiente",
    REVIEW: "En revisión",
    APPROVED: "Aprobado",
    PAYMENT: "Pendiente de pago",
    COMPLETED: "Completado",
    CONTRACT_REVIEW: "Contrato en revisión",
    CONTRACT_APPROVED: "Contrato aprobado",
  };

  useEffect(() => {
    if (projectId) {
      portfolioService.getPublicProject(projectId)
        .then(setProject)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [projectId]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-base-content mb-2">Proyecto no encontrado</h1>
          <Link to="/portfolio/me" className="btn btn-primary mt-4">
            Volver al portafolio
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 p-4">
        
        <div>
          <Link 
            to={`/portfolio/${project.owner.id}`} 
            className="btn btn-ghost btn-sm gap-2 normal-case font-normal hover:bg-base-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver al portafolio de {project.owner.firstName}
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl overflow-hidden border-t-4 border-primary">
          {project.imageUrl && (
            <figure className="h-64 md:h-96 w-full relative">
              <img 
                src={project.imageUrl} 
                alt={project.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-base-100 to-transparent"></div>
            </figure>
          )}

          <div className="card-body p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h1 className="card-title text-3xl md:text-4xl mb-2">
                  {project.name}
                </h1>
                <div className="flex items-center gap-3 text-sm text-base-content/70">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-white">
                    {project.owner.profile?.avatarUrl ? (
                      <div className="avatar">
                        <div className="w-5 h-5 rounded-full">
                          <img src={project.owner.profile.avatarUrl} alt="Owner" />
                        </div>
                      </div>
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-5 h-5 text-[10px]">
                          <span>{project.owner.firstName?.charAt(0)}</span>
                        </div>
                      </div>
                    )}
                    Por {project.owner.firstName} {project.owner.lastName}
                  </span>
                </div>
              </div>
              
              <div className={`badge ${statusColors[project.status] || 'badge-ghost'} badge-lg p-4 font-bold`}>
                {statusText[project.status] || project.status}
              </div>
            </div>

            <div className="divider"></div>

            <div className="prose max-w-none text-base-content/80 whitespace-pre-line">
              {project.description}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4 flex items-center gap-2 text-white">
                  <span className="bg-primary/10 text-primary p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </span>
                  Galería de Resultados
                </h2>

                {project.tasks.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.tasks.map((task, idx) => (
                      <div key={idx} className="card bg-base-200 hover:shadow-lg transition-all duration-300 border border-base-300 overflow-hidden group">
                        <figure 
                          className="aspect-video cursor-zoom-in relative" 
                          onClick={() => setSelectedImage(task.imageUrl)}
                        >
                          <img 
                            src={task.imageUrl} 
                            alt={`Evidencia ${idx + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                          </div>
                        </figure>
                        <div className="p-3">
                          <p className="text-sm font-medium text-base-content/80 line-clamp-2">
                            {task.requirement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert bg-base-200 border-none">
                    <span>No hay imágenes de evidencia disponibles para este proyecto.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl sticky top-6">
              <div className="card-body">
                <h2 className="card-title mb-4 flex items-center gap-2 text-white">
                  <span className="bg-success/10 text-success p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </span>
                  Entregables
                </h2>
                
                {project.requirements.length > 0 ? (
                  <ul className="space-y-2">
                    {project.requirements.map((req, idx) => (
                      <li key={idx} className="flex gap-3 bg-base-200/50 p-3 rounded-lg border border-base-200">
                        <div className="badge badge-primary badge-sm h-6 w-6 p-0 flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-sm leading-relaxed text-base-content/80">{req.description}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base-content/50 italic text-sm text-center">Sin requerimientos listados.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 btn btn-circle btn-ghost text-white hover:bg-white/20 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
          </button>

          <img 
            src={selectedImage} 
            alt="Vista completa" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al dar click a la imagen
          />
        </div>
      )}

    </DashboardLayout>
  );
}