import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { portfolioService, type PublicProjectDetail } from "../../services/portfolio.service";
import DashboardLayout from "../../layouts/DashBoardLayout";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState<PublicProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      portfolioService.getPublicProject(projectId)
        .then(setProject)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [projectId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Proyecto no encontrado</h1>
          <Link to="/portfolio/me" className="btn btn-primary mt-4 text-white">
            Volver al portafolio
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 p-4">
        
        {/* Botón de regreso */}
        <div>
          <Link 
            to={`/portfolio/${project.owner.id}`} 
            className="btn btn-ghost btn-sm gap-2 text-gray-600 hover:bg-gray-200 normal-case font-normal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver al portafolio de {project.owner.email}
          </Link>
        </div>

        {/* Tarjeta Principal (Encabezado del Proyecto) */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-cyan-500">
          {/* Imagen de portada (contenida dentro de la tarjeta) */}
          {project.imageUrl && (
            <div className="h-64 md:h-80 w-full relative group bg-gray-100">
              <img 
                src={project.imageUrl} 
                alt={project.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {project.name}
                </h1>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    {project.owner.profile?.avatarUrl ? (
                      <img src={project.owner.profile.avatarUrl} className="w-5 h-5 rounded-full object-cover" alt="" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-[10px] text-white">
                        {project.owner.firstName?.charAt(0)}
                      </div>
                    )}
                    Por {project.owner.firstName} {project.owner.lastName}
                  </span>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-sm ${
                  project.status === 'COMPLETED' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}>
                {project.status === 'COMPLETED' ? 'Completado' : project.status}
              </span>
            </div>

            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line border-t border-gray-100 pt-6">
              {project.description}
            </div>
          </div>
        </div>

        {/* Grid de Contenido (2 Columnas) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Columna Izquierda: Galería de Evidencias (Ocupa 2 espacios) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="bg-cyan-100 text-cyan-600 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </span>
                Galería de Resultados
              </h2>

              {project.tasks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.tasks.map((task, idx) => (
                    <div key={idx} className="group relative bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
                      <div className="aspect-video overflow-hidden bg-gray-200 cursor-zoom-in">
                        <img 
                          src={task.imageUrl} 
                          alt={`Evidencia ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                        />
                      </div>
                      <div className="p-3 bg-white border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-700 line-clamp-2">
                          {task.requirement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">No hay imágenes de evidencia disponibles para este proyecto.</p>
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha: Requerimientos (Ocupa 1 espacio) */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="bg-green-100 text-green-600 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </span>
                Entregables
              </h2>
              
              {project.requirements.length > 0 ? (
                <ul className="space-y-3">
                  {project.requirements.map((req, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-700 p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 shadow-sm">
                        {idx + 1}
                      </div>
                      <span className="text-sm leading-relaxed">{req.description}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic text-sm text-center py-4">Sin requerimientos listados.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}