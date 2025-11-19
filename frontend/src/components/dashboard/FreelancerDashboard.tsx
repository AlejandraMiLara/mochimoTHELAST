import type { FC } from "react";
import DashboardHeader from "./shared/DashboardHeader";
import StatsGrid from "./shared/statsGrid";
import QuickActions from "./shared/QuickActions";
import TipsCard from "./shared/TipsCard";
import ProjectsList from "./shared/ProjectList";
import InfoBanner from "./shared/InfoBanner";
import LoadingSpinner from "./shared/LoadingSpinner";
import { getProjectStats } from "../utils/projectStats";
import { freelancerConfig } from "./config/freelancerConfig";

interface FreelancerDashboardProps {
  user: any;
  profile: any;
  projects: any[];
  projectsLoading: boolean;
  navigate: (path: string) => void;
}

const FreelancerDashboard: FC<FreelancerDashboardProps> = ({
  user,
  profile,
  projects,
  projectsLoading,
  navigate,
}) => {
  const stats = getProjectStats(projects);

  if (projectsLoading) {
    return <LoadingSpinner color="cyan" />;
  }

  return (
    <div className="min-h-screen p-6">
      <DashboardHeader
        user={user}
        profile={profile}
        title="¡Bienvenido, Freelancer!"
        badgeConfig={freelancerConfig.badge}
      />

      <StatsGrid
        stats={freelancerConfig.stats(stats, projects.length)}
        navigate={navigate}
      />

      <ProjectsList
        projects={projects}
        navigate={navigate}
        title="Mis Proyectos Recientes"
        emptyState={freelancerConfig.emptyState}
        theme="cyan"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* <QuickActions
          actions={freelancerConfig.quickActions}
          navigate={navigate}
          theme="cyan"
        /> */}
        {/* <TipsCard tips={freelancerConfig.tips} theme="cyan" /> */}
      </div>

      {/* <InfoBanner
        title={freelancerConfig.banner.title}
        description={freelancerConfig.banner.description}
        theme="cyan"
      /> */}
    </div>
  );
};

export default FreelancerDashboard;
