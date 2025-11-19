import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home/Home";
import Projects from "./pages/project/Projects";
import Tasks from "./pages/tasks/Tasks";
import Requirements from "./pages/requirements/Requirements";
import Profile from "./pages/profile/Profile";
import Contracts from "./pages/contracts/Contracts";
import Portfolio from "./pages/portfolio/Portfolio";
import Payments from "./pages/payments/Payments";
import PaymentReview from "./pages/payment-review/PaymentReview";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando aplicación...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Rutas Publicas --- */}
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

        <Route
          path="/requirements"
          element={
            <ProtectedRoute>
              <Requirements />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/requirements/:projectId"
          element={
            <ProtectedRoute>
              <Requirements />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
        
        <Route
          path="/contracts"
          element={
            <ProtectedRoute>
              <Contracts />
            </ProtectedRoute>
          }
        ></Route>
        
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        ></Route>
        
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        ></Route>
        
        <Route
          path="/payment-review"
          element={
            <ProtectedRoute>
              <PaymentReview />
            </ProtectedRoute>
          }
        ></Route>
        {/* Ruta principal*/}
        <Route path="/" element={<h1>Homepage</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
