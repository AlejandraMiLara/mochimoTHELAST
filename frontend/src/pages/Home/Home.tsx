import { Link } from "react-router-dom";
import LightRays from "../../components/LightRays";

/**
 * Página principal (Homepage) - Landing publica
 * Navegacion a Login y Register
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 relative">
      <div className="fixed inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="white"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full"
        />
      </div>

      {/* Contenido con z-index superior */}
      <div className="relative z-10">
        <nav className="navbar bg-base-100/50 backdrop-blur-sm shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-between items-center h-16">
              <div className="shrink-0">
                <h1 className="text-2xl font-bold text-white">Mochimo</h1>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white hover:text-cyan-400 font-medium transition-colors"
                >
                  Ingresar
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 font-medium transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-amber-50 mb-4">
              Bienvenido a <span className="text-cyan-500">Mochimo</span>
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Gestiona tus proyectos, contratos y equipo en un solo lugar.
              Colaboracion eficiente para tu negocio.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 font-medium text-lg"
              >
                Comenzar Ahora
              </Link>
              <button className="px-6 py-3 border-2 border-cyan-500 text-white rounded-lg hover:bg-cyan-500/20 font-medium text-lg">
                Conocer Más
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="p-8 bg-base-200/70 backdrop-blur-sm rounded shadow-md">
              <div className="text-4xl mb-4"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="cyan"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-folder-kanban-icon lucide-folder-kanban"
              >
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                <path d="M8 10v4" />
                <path d="M12 10v2" />
                <path d="M16 10v6" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">Proyectos</h3>
              <p className="text-gray-400">
                Crea y gestiona proyectos fácilmente. Asigna tareas y mantén el
                control.
              </p>
            </div>

            <div className="p-8 bg-base-200/70 backdrop-blur-sm rounded shadow-md">
              <div className="text-4xl mb-4"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="green"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-list-checks-icon lucide-list-checks"
              >
                <path d="M13 5h8" />
                <path d="M13 12h8" />
                <path d="M13 19h8" />
                <path d="m3 17 2 2 4-4" />
                <path d="m3 7 2 2 4-4" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">
                Tareas y requerimientos
              </h3>
              <p className="text-gray-400">
                Asigna tareas, gestiona requerimientos y comunica avances de
                forma eficiente con tu cliente.
              </p>
            </div>

            <div className="p-8 bg-base-200/70 backdrop-blur-sm rounded shadow-md">
              <div className="text-4xl mb-4"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="pink"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-user-check-icon lucide-user-check"
              >
                <path d="m16 11 2 2 4-4" />
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">Cliente</h3>
              <p className="text-gray-400">
                Colabora con tu freelancer desarrollo, revisa avances y comparte
                tus ideas en tiempo real.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer sm:footer-horizontal bg-base-200/50 backdrop-blur-sm text-neutral-content p-10 mt-20">
          <nav>
            <h6 className="footer-title">Servicios Freelancer</h6>
            <a className="link link-hover">Proyectos</a>
            <a className="link link-hover">Tareas</a>
            <a className="link link-hover">Contratos</a>
            <a className="link link-hover">Portafolio</a>
          </nav>
          <nav>
            <h6 className="footer-title">Servicion Cliente</h6>
            <a className="link link-hover">Proyecto Compartido</a>
            <a className="link link-hover">Requerimientos</a>
            <a className="link link-hover">Pagos</a>
            <a className="link link-hover">Contratos</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terminos de uso</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
