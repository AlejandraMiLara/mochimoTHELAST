import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/projects/useProjects";
import DashboardLayout from "../layouts/DashBoardLayout";
import { useProfile } from "../hooks/Profile/useProfile";
import { Dashboard } from "../components/dashboard/Dashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { projects, loading: projectsLoading } = useProjects(
    user?.userId || ""
  );
  const { profile } = useProfile();

  if (!user) return null;

  return (
    <DashboardLayout>
      <Dashboard
        user={user}
        profile={profile}
        projects={projects}
        projectsLoading={projectsLoading}
        navigate={navigate}
        role={user.role as "FREELANCER" | "CLIENT"}
      />
    </DashboardLayout>
  );
}
