"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { UserRole } from "../types";
import type { UserRole as UserRoleType } from "../types";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: UserRole.FREELANCER as UserRoleType,
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, type } = target;
    const value =
      type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!formData.terms) {
      setError("Debes aceptar los terminos y condiciones");
      return;
    }

    setLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        role: formData.role,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      navigate("/login");
    } catch (err) {
      setError("Error al registrarse. Intenta con otro email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen bg-base-100 p-4 py-8">
      <div className="max-w-6xl mx-auto h-full">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-3">Mochimo</h1>
          <p className="text-xl text-gray-400">Crea tu cuenta</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start h-full">
          <div className="hidden lg:flex flex-col justify-center space-y-8 p-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Únete a nuestra comunidad
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Conecta con tus clientes y gestiona tus proyectos en un solo
                lugar
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
                <span className="text-gray-300">Pagos seguros</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-gray-300">Soporte 24/7</span>
              </div>
            </div>
          </div>

          <div className="bg-base-100 backdrop-saturate-200 border border-zinc-950  rounded-2xl shadow-xl p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Juan"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Perez"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quiero ser:
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white rounded-lg bg-base-200 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:border-transparent"
                >
                  <option
                    disabled
                    value=""
                    className="text-white bg-gray-900/50"
                  >
                    Selecciona una opcion
                  </option>
                  <option value={UserRole.FREELANCER}>Freelancer</option>
                  <option value={UserRole.CLIENT}>Cliente</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-cyan-500/30 bg-gray-900/60 text-cyan-500 focus:ring-cyan-500"
                />
                <label className="text-sm text-gray-400">
                  Acepto los{" "}
                  <a
                    href="#"
                    className="text-cyan-400 font-medium hover:underline"
                  >
                    terminos y condiciones
                  </a>
                </label>
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
                {loading ? "Registrando..." : "Crear Cuenta"}
              </button>
            </form>

            <div className="mt-6 text-center text-gray-400">
              ¿Ya tienes cuenta?{" "}
              <a
                href="/login"
                className="text-cyan-400 font-medium hover:underline"
              >
                Inicia sesion
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
