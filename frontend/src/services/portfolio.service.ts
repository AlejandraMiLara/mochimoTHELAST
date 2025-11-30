import api from './api';

export interface PortfolioFreelancer {
  firstName: string | null;
  lastName: string | null;
  email: string;
  profile: {
    bio: string | null;
    avatarUrl: string | null;
  } | null;
}

export interface PublicProjectDetail {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  status: string;
  createdAt: string;
  owner: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    profile: { avatarUrl: string | null } | null;
  };
  requirements: Array<{ description: string }>;
  tasks: Array<{
    imageUrl: string;
    requirement: { description: string };
  }>;
}

export interface PortfolioProject {
  id: string;
  name: string;
  createdAt: string;
  description: string;
  imageUrl: string | null;
  status: string;
  requirements: Array<{ description: string }>;
  tasks: Array<{
    imageUrl: string;
    requirement: { description: string };
  }>;
}

export interface Portfolio {
  freelancer: PortfolioFreelancer;
  projects: PortfolioProject[];
}

export const portfolioService = {
  async getPortfolio(userId: string): Promise<Portfolio> {
    const response = await api.get(`/portfolio/${userId}`);
    return response.data;
  },

  async getPublicProject(projectId: string): Promise<PublicProjectDetail> {
    const response = await api.get(`/portfolio/project/${projectId}`);
    return response.data;
  }
};
