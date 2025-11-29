import { useAuth } from "../../hooks/useAuth";
import { usePortfolio } from "../../hooks/usePortfolio";
import DashboardLayout from "../../layouts/DashBoardLayout";

export default function Portfolio() {
  const { user } = useAuth();
  console.log('User object:', user);
  const userId = user?.userId || user?.id || null;
  const { portfolio, loading, error } = usePortfolio(userId);

  const API_URL = import.meta.env.VITE_API_BASE_URL as string;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  if (!portfolio) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">💼</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No se encontró el portafolio
          </h3>
          <p className="text-gray-600 mt-2">
            Asegúrate de estar logueado como FREELANCER
          </p>
          <p className="text-sm text-gray-500 mt-2">
            User ID: {userId || 'No disponible'}
          </p>
          <p className="text-sm text-gray-500">
            Role: {user?.role || 'No disponible'}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const { freelancer, projects } = portfolio;
  const fullName = `${freelancer.firstName || ''} ${freelancer.lastName || ''}`.trim() || 'Freelancer';

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Proyectos */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Proyectos Completados</h2>
          
          {projects.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hay proyectos públicos
              </h3>
              <p className="text-gray-600">
                Los proyectos completados aparecerán aquí automáticamente
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                  {project.imageUrl && (
                    <img
                      src={`${API_URL}/${project.imageUrl}`}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    {project.requirements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Requerimientos:</h4>
                        <ul className="space-y-1">
                          {project.requirements.slice(0, 3).map((req, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-green-500 mt-1">✓</span>
                              <span>{req.description}</span>
                            </li>
                          ))}
                          {project.requirements.length > 3 && (
                            <li className="text-sm text-gray-500 italic">
                              +{project.requirements.length - 3} más...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {project.tasks.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Galería de Tareas:</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {project.tasks.slice(0, 6).map((task, idx) => (
                            <img
                              key={idx}
                              src={`${API_URL}/${task.imageUrl}`}
                              alt={task.requirement.description}
                              className="w-full h-20 object-cover rounded border border-gray-200 hover:scale-105 transition cursor-pointer"
                              title={task.requirement.description}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'COMPLETED' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status === 'COMPLETED' ? 'Completado' : project.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
