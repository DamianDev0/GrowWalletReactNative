import { useState, useEffect } from 'react';
import { BudgetStatsData } from '../../../interfaces/budget.interface';
import budgetService from '../../../services/budgetService';
import { useAuth } from '../../../context/useAuthContext';

const useBudgetStats = (budgetId: string) => {
  const [budgetStats, setBudgetStats] = useState<BudgetStatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBudgetStats = async () => {
      if (token) {
        try {
          const data = await budgetService.getBudgetStats(token, budgetId);
          if ('totalBudgetAmount' in data) {
            setBudgetStats(data);
          } else {
            setError('Failed to fetch budget stats');
          }
        } catch (err) {
          setError('Failed to fetch budget stats');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBudgetStats();
  }, [token, budgetId]);

  return { budgetStats, loading, error };
};

export default useBudgetStats;
