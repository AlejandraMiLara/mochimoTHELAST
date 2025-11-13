// src/layouts/DashboardLayout.tsx
import { useAuth } from "../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  const isFreelancer = String(user.role) === "FREELANCER";
  const isClient = String(user.role) === "CLIENT";

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-base-100 border-b border-base-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-cyan-400">Mochimo</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white">
                {isFreelancer
                  ? "💼 Freelancer"
                  : isClient
                  ? "👤 Cliente"
                  : "👤 Usuario"}
              </span>
              <span className="text-sm font-medium text-white">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 text-cyan-400 hover:text-gray-900 hover:bg-gray-100 rounded transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-base-100 border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <Link
              to="/dashboard"
              className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
                isActive("/dashboard")
                  ? "bg-blue-900 text-white"
                  : "text-white hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
              Dashboard
            </Link>

            <Link
              to="/projects"
              className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
                isActive("/projects")
                  ? "bg-blue-900 text-white"
                  : "text-white hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
              </svg>
              Proyectos
            </Link>

            {/* Solo para Freelancers */}
            {isFreelancer && (
              <>
                <Link
                  to="/tasks"
                  className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
                    isActive("/tasks")
                      ? "bg-blue-900 text-white"
                      : "text-white hover:bg-gray-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
                    <path d="M15 3v5a1 1 0 0 0 1 1h5" />
                  </svg>
                  Tareas
                </Link>
                <Link
                  to="/contracts"
                  className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
                    location.pathname === "/contracts"
                      ? "bg-blue-900 text-white"
                      : "text-white hover:bg-gray-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                    <path d="m9 9.5 2 2 4-4" />
                  </svg>
                  Contratos
                </Link>
                <Link
                  to="/portfolio"
                  className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
                    location.pathname === "/portfolio"
                      ? "bg-blue-900 text-white"
                      : "text-white hover:bg-gray-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 12h.01" />
                    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                    <rect width="20" height="14" x="2" y="6" rx="2" />
                  </svg>
                  Portafolio
                </Link>
                <Link
                  to="/profile"
                  className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
                    location.pathname === "/profile"
                      ? "bg-blue-900 text-white"
                      : "text-white hover:bg-gray-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                  </svg>
                  Mi Perfil
                </Link>
              </>
            )}

            {/* Solo para Clientes */}
            {isClient && (
              <>
            <Link
              to="/requirements"
              className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
                isActive("/requirements")
                  ? "bg-blue-900 text-white"
                  : "text-white hover:bg-gray-100"
              }`}
            >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                  Requerimientos
                </Link>
                <Link
                  to="/payments"
                  className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
                    location.pathname === "/payments"
                      ? "bg-blue-900 text-white"
                      : "text-white hover:bg-gray-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                  Pagos
                </Link>
                <Link
                  to="/contracts"
                  className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
                    location.pathname === "/contracts"
                      ? "bg-blue-900 text-white"
                      : "text-white hover:bg-gray-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                    <path d="m9 9.5 2 2 4-4" />
                  </svg>
                  Contratos
                </Link>
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">{children}</main>
      </div>
    </div>
  );
}
