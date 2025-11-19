import { api } from './api';
import { PortfolioItem } from '../hooks/usePortfolio';

export const portfolioService = {
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    const response = await api.get('/portfolio');
    return response.data;
  },

  async createPortfolioItem(itemData: Omit<PortfolioItem, 'id' | 'freelancerId' | 'createdAt'>): Promise<PortfolioItem> {
    const response = await api.post('/portfolio', itemData);
    return response.data;
  },

  async updatePortfolioItem(id: string, itemData: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const response = await api.patch(`/portfolio/${id}`, itemData);
    return response.data;
  },

  async deletePortfolioItem(id: string): Promise<void> {
    await api.delete(`/portfolio/${id}`);
  },

  async getPortfolioItemById(id: string): Promise<PortfolioItem> {
    const response = await api.get(`/portfolio/${id}`);
    return response.data;
  }
};