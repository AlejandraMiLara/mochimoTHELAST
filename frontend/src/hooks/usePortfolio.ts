import { useState, useEffect } from 'react';
import { portfolioService } from '../services/portfolio.service';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  technologies: string[];
  category: string;
  completedAt: string;
  freelancerId: string;
  createdAt: string;
}

export const usePortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await portfolioService.getPortfolioItems();
      setPortfolioItems(data);
    } catch (err) {
      setError('Error al cargar portafolio');
    } finally {
      setLoading(false);
    }
  };

  const addPortfolioItem = async (itemData: Omit<PortfolioItem, 'id' | 'freelancerId' | 'createdAt'>) => {
    setLoading(true);
    try {
      const newItem = await portfolioService.createPortfolioItem(itemData);
      setPortfolioItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError('Error al agregar elemento al portafolio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePortfolioItem = async (id: string, itemData: Partial<PortfolioItem>) => {
    setLoading(true);
    try {
      const updated = await portfolioService.updatePortfolioItem(id, itemData);
      setPortfolioItems(prev => prev.map(item => item.id === id ? updated : item));
      return updated;
    } catch (err) {
      setError('Error al actualizar elemento del portafolio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePortfolioItem = async (id: string) => {
    setLoading(true);
    try {
      await portfolioService.deletePortfolioItem(id);
      setPortfolioItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError('Error al eliminar elemento del portafolio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return {
    portfolioItems,
    loading,
    error,
    fetchPortfolio,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem
  };
};