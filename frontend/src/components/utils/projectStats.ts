export interface ProjectStats {
  activeProjects: number;
  pendingProjects: number;
  completedProjects: number;
  successRate: number;
}

export const getProjectStats = (projects: any[]): ProjectStats => {
  const activeProjects = projects.filter((p) =>
    ["INPROGRESS", "APPROVED", "CONTRACT_APPROVED"].includes(p.status)
  ).length;

  const pendingProjects = projects.filter((p) =>
    ["PENDING", "REVIEW", "CONTRACT_REVIEW"].includes(p.status)
  ).length;

  const completedProjects = projects.filter((p) =>
    ["COMPLETED", "PAYMENT"].includes(p.status)
  ).length;

  const successRate =
    projects.length > 0
      ? Math.round((completedProjects / projects.length) * 100)
      : 0;

  return {
    activeProjects,
    pendingProjects,
    completedProjects,
    successRate,
  };
};
