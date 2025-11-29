import { useState, useEffect } from 'react';
import { portfolioService } from '../services/portfolio.service';
import type { Portfolio } from '../services/portfolio.service';

export const usePortfolio = (userId: string | null) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadPortfolio();
    }
  }, [userId]);

  const loadPortfolio = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await portfolioService.getPortfolio(userId);
      setPortfolio(data);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al cargar portafolio';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    portfolio,
    loading,
    error,
    refetch: loadPortfolio
  };
};
