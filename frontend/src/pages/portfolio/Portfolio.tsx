import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { portfolioService, type Portfolio as PortfolioType } from "../../services/portfolio.service";
import DashboardLayout from "../../layouts/DashBoardLayout";

export default function Portfolio() {
  const { userId: paramId } = useParams();
  const { user } = useAuth();
  
  const [portfolio, setPortfolio] = useState<PortfolioType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [copied, setCopied] = useState(false);

  const currentUserId = paramId || user?.userId || (user as any)?.id;

  useEffect(() => {
    if (currentUserId) {
      loadPortfolio(currentUserId);
    } else {
      setLoading(false);
    }
  }, [currentUserId]);

  const loadPortfolio = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioService.getPortfolio(id);
      setPortfolio(data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar el portafolio. El usuario no existe o es privado.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (!currentUserId) return;
    
    const url = `${window.location.origin}/portfolio/${currentUserId}`;
    
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !portfolio) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {error || "Portafolio no especificado"}
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            {!paramId 
              ? "Para ver un portafolio, necesitas usar un enlace específico o iniciar sesión."
              : "Es posible que el enlace sea incorrecto o el usuario no tenga un perfil público."}
          </p>
          
          {!user && (
             <Link to="/login" className="btn btn-primary mt-6 text-white">
               Iniciar Sesión
             </Link>
          )}
        </div>
      </DashboardLayout>
    );
  }

  const { freelancer, projects } = portfolio;
  const fullName = `${freelancer.firstName || ''} ${freelancer.lastName || ''}`.trim() || freelancer.email;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 p-4">
        
        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col md:flex-row items-start gap-8 border-t-4 border-cyan-500 relative">
           
           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0 ring-2 ring-cyan-100 mx-auto md:mx-0">
              {freelancer.profile?.avatarUrl ? (
                <img 
                  src={freelancer.profile.avatarUrl}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400 font-bold">
                  {fullName.charAt(0).toUpperCase()}
                </div>
              )}
           </div>

           <div className="text-center md:text-left flex-1 w-full">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{fullName}</h1>
                    <p className="text-cyan-600 font-medium mb-4">{freelancer.email}</p>
                </div>

                <button 
                  onClick={handleShare}
                  className={`btn btn-sm gap-2 transition-all duration-300 ${copied ? 'btn-success text-white' : 'btn-outline text-gray-600 hover:bg-gray-100'}`}
                >
                  {copied ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      ¡Enlace Copiado!
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
                      Compartir Perfil
                    </>
                  )}
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-2">
                <p className="text-gray-600 leading-relaxed italic">
                  {freelancer.profile?.bio || "Este freelancer aún no ha agregado una biografía."}
                </p>
              </div>
           </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">Proyectos Destacados</h2>
          
          {projects.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
              <div className="text-6xl mb-4 opacity-50">📂</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hay proyectos públicos
              </h3>
              <p className="text-gray-500">
                Este usuario aún no ha publicado proyectos en su portafolio.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link 
                  key={project.id} 
                  to={`/portfolio/project/${project.id}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 flex flex-col border border-gray-200 overflow-hidden h-full"
                >
                  <div className="h-48 overflow-hidden relative bg-gray-100">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                        <span className="text-sm mt-2">Sin imagen</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">Ver Detalles</span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-1">{project.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{project.description}</p>
                    
                    <div className="pt-4 mt-auto border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 font-medium">
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                      <span className="text-cyan-500 group-hover:underline">Leer más →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}