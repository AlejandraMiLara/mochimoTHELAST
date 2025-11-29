import api from './api';

export interface PortfolioFreelancer {
  firstName: string | null;
  lastName: string | null;
  profile: {
    bio: string | null;
    avatarUrl: string | null;
  } | null;
}

export interface PortfolioProject {
  name: string;
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
  }
};
