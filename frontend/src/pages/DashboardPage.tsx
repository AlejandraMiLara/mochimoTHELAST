import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/projects/useProjects";
import DashboardLayout from "../layouts/DashBoardLayout";
import { useProfile } from "../hooks/Profile/useProfile";
import FreelancerDashboard from "../components/dashboard/FreelancerDashboard";
import ClientDashboard from "../components/dashboard/ClientDashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { projects, loading: projectsLoading } = useProjects(
    user?.userId || ""
  );
  const { profile, loadingProfile } = useProfile();

  if (!user) return null;

  const isFreelancer = String(user.role) === "FREELANCER";
  const isClient = String(user.role) === "CLIENT";

  const dashboardProps = {
    user,
    profile,
    projects,
    projectsLoading,
    navigate,
  };

  return (
    <DashboardLayout>
      {isFreelancer && <FreelancerDashboard {...dashboardProps} />}
      {isClient && <ClientDashboard {...dashboardProps} />}
    </DashboardLayout>
  );
}
