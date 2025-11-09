// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage"; // Página de prueba
import ProtectedRoute from "./components/ProtectedRoute"; // Componente clave
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home/Home";
import Projects from "./pages/project/Projects";
import Tasks from "./pages/tasks/Tasks";

function App() {
  const { isLoading } = useAuth();

  // No renderizar nada hasta que sepamos si el usuario está logueado o no
  if (isLoading) {
    return <div>Cargando aplicación...</div>; // O un spinner
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Rutas Públicas --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Home />} />

        {/* --- Rutas Privadas --- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        ></Route>
        {/* Ruta principal (ej: redirige a dashboard o login) */}
        <Route path="/" element={<h1>Homepage</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
