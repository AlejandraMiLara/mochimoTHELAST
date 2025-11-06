// src/pages/DashboardPage.tsx
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">¡Bienvenido, {user?.email}!</h1>
      <p>Tu rol es: {user?.role}</p>
      
      <button 
        onClick={logout} 
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}