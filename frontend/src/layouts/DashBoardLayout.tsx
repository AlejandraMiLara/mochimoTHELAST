import { useAuth } from "../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = (
    <>
      <Link
        to="/dashboard"
        className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
          isActive("/dashboard")
            ? "bg-blue-900 text-white"
            : "text-white hover:bg-slate-400"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#FFFFFF"
          className="shrink-0"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
        </svg>
        <span className="truncate">Dashboard</span>
      </Link>

      <Link
        to="/projects"
        className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
          isActive("/projects")
            ? "bg-blue-900 text-white"
            : "text-white hover:bg-slate-400"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#FFFFFF"
          className="shrink-0"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-1.41-1.41z" />
        </svg>
        <span className="truncate">Proyectos</span>
      </Link>

      {isFreelancer && (
        <>
          <Link
            to="/tasks"
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
              isActive("/tasks")
                ? "bg-blue-900 text-white"
                : "text-white hover:bg-slate-400"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#FFFFFF"
              className="shrink-0"
            >
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
              </g>
              <g>
                <path d="M19.41,7.41l-4.83-4.83C14.21,2.21,13.7,2,13.17,2H6C4.9,2,4.01,2.9,4.01,4L4,20c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2 V8.83C20,8.3,19.79,7.79,19.41,7.41z M10.23,17.29l-2.12-2.12c-0.39-0.39-0.39-1.02,0-1.41l0,0c0.39-0.39,1.02-0.39,1.41,0 l1.41,1.41l3.54-3.54c0.39-0.39,1.02-0.39,1.41,0l0,0c0.39,0.39,0.39,1.02,0,1.41l-4.24,4.24C11.26,17.68,10.62,17.68,10.23,17.29z M14,9c-0.55,0-1-0.45-1-1V3.5L18.5,9H14z" />
              </g>
            </svg>
            <span className="truncate">Tareas</span>
          </Link>
          <Link
            to="/contracts"
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
              location.pathname === "/contracts"
                ? "bg-blue-900 text-white"
                : "text-white hover:bg-slate-400"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#FFFFFF"
              className="shrink-0"
            >
              <g>
                <rect fill="none" height="24" width="24" />
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <path d="M16.48,10.41c-0.39,0.39-1.04,0.39-1.43,0l-4.47-4.46l-7.05,7.04l-0.66-0.63c-1.17-1.17-1.17-3.07,0-4.24l4.24-4.24 c1.17-1.17,3.07-1.17,4.24,0L16.48,9C16.87,9.39,16.87,10.02,16.48,10.41z M17.18,8.29c0.78,0.78,0.78,2.05,0,2.83 c-1.27,1.27-2.61,0.22-2.83,0l-3.76-3.76l-5.57,5.57c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.42,0l4.62-4.62l0.71,0.71 l-4.62,4.62c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.42,0l4.62-4.62l0.71,0.71l-4.62,4.62c-0.39,0.39-0.39,1.02,0,1.41 c0.39,0.39,1.02,0.39,1.41,0l4.62-4.62l0.71,0.71l-4.62,4.62c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0l8.32-8.34 c1.17-1.17,1.17-3.07,0-4.24l-4.24-4.24c-1.15-1.15-3.01-1.17-4.18-0.06L17.18,8.29z" />
              </g>
            </svg>
            <span className="truncate">Contratos</span>
          </Link>
          <Link
            to="/portfolio"
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
              location.pathname === "/portfolio"
                ? "bg-blue-900 text-white"
                : "text-white hover:bg-slate-400"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#FFFFFF"
              className="shrink-0"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
            </svg>
            <span className="truncate">Portafolio</span>
          </Link>
          <Link
            to="/payment-review"
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
              location.pathname === "/payment-review"
                ? "bg-blue-900 text-white"
                : "text-white hover:bg-slate-400"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#FFFFFF"
              className="shrink-0"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5c-.55 0-1-.45-1-1v-5h16v5c0 .55-.45 1-1 1zm1-10H4V6h16v2z" />
            </svg>
            <span className="truncate">Revisión de Pagos</span>
          </Link>
        </>
      )}

      {isClient && (
        <>
          <Link
            to="/requirements"
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
              isActive("/requirements")
                ? "bg-blue-900 text-white"
                : "text-white hover:bg-slate-400"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#FFFFFF"
              className="shrink-0"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm1 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1zm3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z" />
            </svg>
            <span className="truncate">Requerimientos</span>
          </Link>
          <Link
            to="/payments"
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
              location.pathname === "/payments"
                ? "bg-blue-900 text-white"
                : "text-white hover:bg-slate-400"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#FFFFFF"
              className="shrink-0"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5c-.55 0-1-.45-1-1v-5h16v5c0 .55-.45 1-1 1zm1-10H4V6h16v2z" />
            </svg>
            <span className="truncate">Pagos</span>
          </Link>
          <Link
            to="/contracts"
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
              location.pathname === "/contracts"
                ? "bg-blue-900 text-white"
                : "text-white hover:bg-slate-400"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#FFFFFF"
              className="shrink-0"
            >
              <g>
                <rect fill="none" height="24" width="24" />
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <path d="M16.48,10.41c-0.39,0.39-1.04,0.39-1.43,0l-4.47-4.46l-7.05,7.04l-0.66-0.63c-1.17-1.17-1.17-3.07,0-4.24l4.24-4.24 c1.17-1.17,3.07-1.17,4.24,0L16.48,9C16.87,9.39,16.87,10.02,16.48,10.41z M17.18,8.29c0.78,0.78,0.78,2.05,0,2.83 c-1.27,1.27-2.61,0.22-2.83,0l-3.76-3.76l-5.57,5.57c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.42,0l4.62-4.62l0.71,0.71 l-4.62,4.62c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.42,0l4.62-4.62l0.71,0.71l-4.62,4.62c-0.39,0.39-0.39,1.02,0,1.41 c0.39,0.39,1.02,0.39,1.41,0l4.62-4.62l0.71,0.71l-4.62,4.62c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0l8.32-8.34 c1.17-1.17,1.17-3.07,0-4.24l-4.24-4.24c-1.15-1.15-3.01-1.17-4.18-0.06L17.18,8.29z" />
              </g>
            </svg>
            <span className="truncate">Contratos</span>
          </Link>
        </>
      )}

      <Link
        to="/profile"
        className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
          isActive("/profile")
            ? "bg-blue-900 text-white"
            : "text-white hover:bg-slate-400"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#FFFFFF"
          className="shrink-0"
        >
          <g>
            <rect fill="none" height="24" width="24" />
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M12,6c1.93,0,3.5,1.57,3.5,3.5 c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5C8.5,7.57,10.07,6,12,6z M19,19H5v-0.23c0-0.62,0.28-1.2,0.76-1.58 C7.47,15.82,9.64,15,12,15s4.53,0.82,6.24,2.19c0.48,0.38,0.76,0.97,0.76,1.58V19z" />
          </g>
        </svg>
        <span className="truncate">Mi Perfil</span>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-base-200 text-gray-100">
      <nav className="backdrop-blur-md bg-slate-900/50 border-b border-base-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-cyan-300 drop-shadow">
                Mochimo
              </h1>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <span className="hidden sm:inline text-xs md:text-sm text-gray-300">
                {isFreelancer
                  ? "💼 Freelancer"
                  : isClient
                  ? "👤 Cliente"
                  : "👤 Usuario"}
              </span>
              <span className="text-xs md:text-sm font-medium text-white truncate max-w-[120px] md:max-w-none">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="px-3 py-2 md:px-4 md:py-2 text-cyan-300 hover:text-slate-900 hover:bg-cyan-300/90 font-medium rounded transition shadow text-sm md:text-base"
              >
                <span className="hidden sm:inline">Cerrar Sesión</span>
                <span className="sm:hidden">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="hidden lg:block w-64 min-h-screen bg-slate-900/40 backdrop-blur-xl border-r border-cyan-800/20 shadow-xl">
          <nav className="p-4 space-y-2">{navLinks}</nav>
        </aside>

        <div
          className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className="fixed inset-0 bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="relative w-64 h-full bg-slate-900/95 backdrop-blur-xl border-r border-cyan-800/20 shadow-xl">
            <nav className="p-4 space-y-2 overflow-y-auto h-full">
              {navLinks}
            </nav>
          </div>
        </div>

        <main className="flex-1 min-h-screen p-4 md:p-6 lg:p-8 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-cyan-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(34,211,238,0.25),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.03)_100%)] mix-blend-overlay"></div>

          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
