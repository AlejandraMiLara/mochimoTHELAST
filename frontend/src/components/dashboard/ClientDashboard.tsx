import type { FC } from "react";
import DashboardHeader from "./shared/DashboardHeader";
import StatsGrid from "./shared/statsGrid";
import QuickActions from "./shared/QuickActions";
import TipsCard from "./shared/TipsCard";
import ProjectsList from "./shared/ProjectList";
import InfoBanner from "./shared/InfoBanner";
import LoadingSpinner from "./shared/LoadingSpinner";
import { getProjectStats } from "../utils/projectStats";
import { clientConfig } from "./config/clientConfig";

interface ClientDashboardProps {
  user: any;
  profile: any;
  projects: any[];
  projectsLoading: boolean;
  navigate: (path: string) => void;
}

const ClientDashboard: FC<ClientDashboardProps> = ({
  user,
  profile,
  projects,
  projectsLoading,
  navigate,
}) => {
  const stats = getProjectStats(projects);

  if (projectsLoading) {
    return <LoadingSpinner color="purple" />;
  }

  return (
    <div className="min-h-screen p-6">
      <DashboardHeader
        user={user}
        profile={profile}
        title="¡Bienvenido, Cliente!"
        badgeConfig={clientConfig.badge}
      />

      <StatsGrid
        stats={clientConfig.stats(stats, projects.length)}
        navigate={navigate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* <QuickActions
          actions={clientConfig.quickActions}
          navigate={navigate}
          theme="purple"
        /> */}
        {/* <TipsCard tips={clientConfig.tips} theme="purple" /> */}
      </div>

      <ProjectsList
        projects={projects}
        navigate={navigate}
        title="Proyectos en los que Participas"
        emptyState={clientConfig.emptyState}
        theme="purple"
        showReviewBadge
      />

      {/* <InfoBanner
        title={clientConfig.banner.title}
        description={clientConfig.banner.description}
        theme="purple"
      /> */}
    </div>
  );
};

export default ClientDashboard;
