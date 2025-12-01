import { Link } from "react-router-dom";
import LightRays from "../../components/LightRays";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const statsRef = useRef(null);
  const platformRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set([...prev, entry.target.id]));
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    [statsRef, platformRef, featuresRef].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(34,211,238,0.25),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.03)_100%)] mix-blend-overlay"></div>

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

      <div className="relative z-10">
        <nav className="navbar bg-base-100/50 backdrop-blur-sm shadow-md sticky top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-between items-center h-16">
              <div className="shrink-0">
                <h1 className="text-2xl font-bold text-white">Mochimo</h1>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white hover:text-cyan-400 font-medium transition-colors duration-300"
                >
                  Ingresar
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 font-medium transition-all duration-300 hover:scale-105"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-amber-50 mb-6">
              Bienvenido a <span className="text-cyan-500">Mochimo</span>
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
              Gestiona tus proyectos, contratos y equipo en un solo lugar.
              Colaboración eficiente para tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Comenzar Ahora
              </Link>
              <button className="px-8 py-4 border-2 border-cyan-500 text-white rounded-lg hover:bg-cyan-500/20 font-medium text-lg transition-all duration-300">
                Conocer Más
              </button>
            </div>
          </div>

          <div
            id="stats"
            ref={statsRef}
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 mb-16 transition-all duration-1000 ${
              visibleSections.has("stats")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <div className="text-center p-6 bg-base-200/40 backdrop-blur-sm rounded-lg transform transition-all duration-500 hover:scale-105">
              <div className="text-3xl font-bold text-cyan-400">500+</div>
              <div className="text-gray-300">Proyectos Completados</div>
            </div>
            <div className="text-center p-6 bg-base-200/40 backdrop-blur-sm rounded-lg transform transition-all duration-500 hover:scale-105">
              <div className="text-3xl font-bold text-cyan-400">95%</div>
              <div className="text-gray-300">Clientes Satisfechos</div>
            </div>
            <div className="text-center p-6 bg-base-200/40 backdrop-blur-sm rounded-lg transform transition-all duration-500 hover:scale-105">
              <div className="text-3xl font-bold text-cyan-400">1K+</div>
              <div className="text-gray-300">Tareas Gestionadas</div>
            </div>
            <div className="text-center p-6 bg-base-200/40 backdrop-blur-sm rounded-lg transform transition-all duration-500 hover:scale-105">
              <div className="text-3xl font-bold text-cyan-400">24/7</div>
              <div className="text-gray-300">Soporte Activo</div>
            </div>
          </div>
        </main>

        <div
          id="platform"
          ref={platformRef}
          className={`mt-32 mb-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            visibleSections.has("platform")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                ¿Cómo funciona <span className="text-cyan-500">Mochimo</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Nuestra plataforma ofrece un espacio integral donde freelancers
                y clientes pueden colaborar de forma organizada, transparente y
                segura.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Para Freelancers */}
              <div
                className={`bg-base-200/60 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 shadow-xl transition-all duration-700 ${
                  visibleSections.has("platform")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <div className="flex items-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="cyan"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-4"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                  </svg>
                  <h3 className="text-3xl font-bold text-cyan-400">
                    Para Freelancers
                  </h3>
                </div>
                <p className="text-gray-300 mb-6 text-lg">
                  Los profesionales independientes pueden:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl shrink-0">
                      •
                    </span>
                    <span className="text-gray-200">
                      Crear y gestionar proyectos desde un panel intuitivo.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl shrink-0">
                      •
                    </span>
                    <span className="text-gray-200">
                      Asignar tareas mediante requerimientos detallados para
                      mantener una comunicación clara.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl shrink-0">
                      •
                    </span>
                    <span className="text-gray-200">
                      Generar contratos para que el cliente pueda revisarlos y
                      aprobarlos fácilmente.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl shrink-0">
                      •
                    </span>
                    <span className="text-gray-200">
                      Verificar pagos realizados por el cliente mediante
                      comprobantes.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl shrink-0">
                      •
                    </span>
                    <span className="text-gray-200">
                      Construir un portafolio público con sus proyectos
                      finalizados, mostrando su experiencia y calidad de
                      trabajo.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Para Clientes */}
              <div
                className={`bg-base-200/60 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/30 shadow-xl transition-all duration-700 delay-200 ${
                  visibleSections.has("platform")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <div className="flex items-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="pink"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-4"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <h3 className="text-3xl font-bold text-pink-400">
                    Para Clientes
                  </h3>
                </div>
                <p className="text-gray-300 mb-6 text-lg">
                  Los clientes cuentan con herramientas diseñadas para dar
                  seguimiento completo a sus proyectos:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3 text-xl shrink-0">
                      •
                    </span>
                    <span className="text-gray-200">
                      Acceso directo al proyecto, pudiendo visualizar avances y
                      tareas asignadas.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3 text-xl shrink-0">
                      •
                    </span>
                    <span className="text-gray-200">
                      Aceptar, rechazar o solicitar revisión de los
                      requerimientos enviados por el freelancer.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3 text-xl shrink-0">
                      •
                    </span>
                    <span className="text-gray-200">
                      Realizar pagos subiendo comprobantes que el freelancer
                      puede validar.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3 text-xl shrink-0">
                      •
                    </span>
                    <span className="text-gray-200">
                      Revisar y aprobar contratos antes de continuar con el
                      trabajo.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-base-200/50 backdrop-blur-sm text-neutral-content mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h1 className="text-2xl font-bold text-white mb-4">Mochimo</h1>
                <p className="text-gray-400 max-w-md">
                  La plataforma todo en uno para gestionar tus proyectos
                  freelancer y colaborar eficientemente con tus clientes.
                </p>
              </div>

              <nav>
                <h6 className="footer-title text-white">
                  Servicios Freelancer
                </h6>
                <a className="link link-hover block text-gray-400 hover:text-cyan-400 transition-colors">
                  Proyectos
                </a>
                <a className="link link-hover block text-gray-400 hover:text-cyan-400 transition-colors">
                  Tareas
                </a>
                <a className="link link-hover block text-gray-400 hover:text-cyan-400 transition-colors">
                  Contratos
                </a>
                <a className="link link-hover text-gray-400 hover:text-cyan-400 transition-colors">
                  Portafolio
                </a>
              </nav>

              <nav>
                <h6 className="footer-title text-white">Servicios Cliente</h6>
                <a className="link link-hover block text-gray-400 hover:text-cyan-400 transition-colors">
                  Proyecto Compartido
                </a>
                <a className="link link-hover block text-gray-400 hover:text-cyan-400 transition-colors">
                  Requerimientos
                </a>
                <a className="link link-hover block text-gray-400 hover:text-cyan-400 transition-colors">
                  Pagos
                </a>
                <a className="link link-hover text-gray-400 hover:text-cyan-400 transition-colors">
                  Contratos
                </a>
              </nav>
            </div>

            <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <nav className="flex gap-6 mb-4 md:mb-0">
                <a className="link link-hover text-gray-400 hover:text-cyan-400 transition-colors">
                  Términos de uso
                </a>
                <a className="link link-hover text-gray-400 hover:text-cyan-400 transition-colors">
                  Política de privacidad
                </a>
                <a className="link link-hover text-gray-400 hover:text-cyan-400 transition-colors">
                  Cookies
                </a>
              </nav>
              <div className="text-gray-400">
                © 2024 Mochimo. Todos los derechos reservados.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
