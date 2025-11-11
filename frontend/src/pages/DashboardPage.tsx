// src/pages/DashboardPage.tsx
import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../layouts/DashBoardLayout";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const isFreelancer = String(user.role) === "FREELANCER";
  const isClient = String(user.role) === "CLIENT";

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Bienvenido, {user.email}
        </h2>
        <p className="text-gray-600 mt-1">
          Rol:{" "}
          <span className="font-medium">
            {isFreelancer ? "Freelancer" : "Cliente"}
          </span>
        </p>
      </div>
      {/* Acciones rápidas */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isFreelancer && <></>}
          {isClient && (
            <>
              <button
                onClick={() => navigate("/projects/join")}
                className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 font-medium transition"
              >
                Unirse a Proyecto
              </button>
              <button
                onClick={() => navigate("/contracts")}
                className="border-2 border-blue-900 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-50 font-medium transition"
              >
                Revisar Contratos
              </button>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
