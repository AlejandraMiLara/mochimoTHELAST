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

  const cardBgColors: Record<string, string> = {
    INPROGRESS: "bg-base-100",
    PENDING: "bg-base-200",
    REVIEW: "bg-base-200",
    APPROVED: "bg-base-100",
    PAYMENT: "bg-base-200",
    COMPLETED: "bg-base-300",
    CONTRACT_REVIEW: "bg-base-200",
    CONTRACT_APPROVED: "bg-base-100",
  };

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !portfolio) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-base-content mb-2">
            {error || "Portafolio no especificado"}
          </h1>
          <p className="text-base-content/70 max-w-md mx-auto">
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
        
        <div className="card lg:card-side bg-base-100 shadow-xl border border-base-300">
          <figure className="p-6 lg:p-8 shrink-0">
             <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {freelancer.profile?.avatarUrl ? (
                    <img src={freelancer.profile.avatarUrl} alt={fullName} />
                  ) : (
                    <div className="w-full h-full bg-neutral text-neutral-content flex items-center justify-center text-4xl font-bold">
                      {fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
             </div>
          </figure>
          <div className="card-body">
             <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                    <h2 className="card-title text-3xl mb-1 text-white">{fullName}</h2>
                    <p className="text-primary font-medium">{freelancer.email}</p>
                </div>
                <button 
                  onClick={handleShare}
                  className={`btn btn-sm gap-2 ${copied ? 'btn-success text-white' : 'btn-outline'}`}
                >
                  {copied ? '¡Enlace Copiado!' : 'Compartir Perfil'}
                </button>
             </div>
             <div className="divider my-2"></div>
             <p className="text-base-content/80 italic">
                {freelancer.profile?.bio || "Este freelancer aún no ha agregado una biografía."}
             </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 border-b border-base-300 pb-3">
            Proyectos Destacados
          </h2>
          
          {projects.length === 0 ? (
            <div className="alert shadow-lg bg-base-100 border border-base-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <div>
                <h3 className="font-bold">Sin proyectos públicos</h3>
                <div className="text-xs">Este usuario aún no ha publicado proyectos en su portafolio.</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link 
                  key={project.id} 
                  to={`/portfolio/project/${project.id}`}
                  className={`card ${cardBgColors[project.status] || 'bg-base-100'} shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 overflow-hidden group`}
                >
                  {project.imageUrl && (
                    <figure className="h-48 relative">
                      <img 
                        src={project.imageUrl} 
                        alt={project.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                         <span className="btn btn-sm btn-ghost text-white border-white">Ver Detalles</span>
                      </div>
                    </figure>
                  )}

                  <div className="card-body p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="card-title text-base-content text-lg line-clamp-1 group-hover:text-primary transition-colors">
                            {project.name}
                        </h2>
                        <div className={`badge ${statusColors[project.status] || 'badge-ghost'} badge-sm shrink-0`}>
                            {statusText[project.status] || project.status}
                        </div>
                    </div>

                    <p className="text-base-content/70 text-sm line-clamp-3 mb-4 flex-1">
                        {project.description}
                    </p>
                    
                    <div className="card-actions justify-between items-center mt-auto pt-4 border-t border-base-content/10">
                      <span className="text-xs text-base-content/50 font-medium">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <button className="btn btn-primary btn-sm text-white">
                        Ver Detalles
                      </button>
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