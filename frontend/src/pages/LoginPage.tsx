"use client";

import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(34,211,238,0.25),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.03)_100%)] mix-blend-overlay"></div>

      <div className="relative z-10 max-w-6xl mx-auto h-full">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-3">Mochimo</h1>
          <p className="text-xl text-gray-400">Bienvenido de vuelta</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start h-full">
          <div className="hidden lg:flex flex-col justify-center space-y-8 p-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Vuelve a tu espacio de trabajo
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Accede a tus proyectos, conecta con tu cliente y continúa donde
                lo dejaste.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-gray-300">Acceso rápido y seguro</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-gray-300">Tus datos protegidos</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-gray-300">Disponible 24/7</span>
              </div>
            </div>
          </div>

          <div className="bg-base-100 backdrop-blur-xl border border-black rounded-2xl shadow-xl p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-cyan-500/30 bg-gray-900/60 text-cyan-500 focus:ring-cyan-500"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-400">
                    Recordarme
                  </label>
                </div>
                <button
                  type="button"
                  className="text-cyan-400 text-sm font-medium hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {error && (
                <div className="bg-red-950/50 border border-red-400/50 text-red-300 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 transition text-lg"
              >
                {loading ? "Ingresando..." : "Ingresar a mi cuenta"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 bg-gray-600 h-px"></div>
              <span className="text-gray-400 text-sm">o</span>
              <div className="flex-1 bg-gray-600 h-px"></div>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-gray-400">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/register"
                  className="text-cyan-400 font-medium hover:underline"
                >
                  Regístrate aquí
                </Link>
              </p>

              <div className="bg-gray-900/40 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">
                  Credenciales de demo:
                </p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Email: demo@mochimo.com</p>
                  <p>Contraseña: demodemo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
