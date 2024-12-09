import {useState, useEffect} from 'react';
import {BudgetStatsData} from '../../../interfaces/budget.interface';
import budgetService from '../../../services/budgetService';
import {useAuth} from '../../../context/useAuthContext';
import {CustomToast} from '../../../components/toastMessage.component';
import {ApiError} from '../../../utils/errorHandler';

interface BudgetStatsWarning {
  warningMessage?: string | null;
}

type BudgetStatsResponse = BudgetStatsData & BudgetStatsWarning;

const useBudgetStats = (budgetId: string) => {
  const [budgetStats, setBudgetStats] = useState<BudgetStatsResponse | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const {token} = useAuth();

  const fetchBudgetStats = async () => {
    if (!token) {
      CustomToast({
        type: 'error',
        text1: 'Authentication Error',
        text2: 'Token is not available',
      });
      setLoading(false);
      return;
    }

    try {
      const data = await budgetService.getBudgetStats(token, budgetId);

      if ((data as ApiError).message) {
      } else if ('totalBudgetAmount' in data) {
        setBudgetStats(data as BudgetStatsResponse);
        if (data.warningMessage) {
          CustomToast({
            type: 'info',
            text1: 'Warning',
            text2: data.warningMessage,
            position: 'bottom',
          });
        }
      } else {
      }
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, budgetId]);

  return {budgetStats, loading, fetchBudgetStats};
};

export default useBudgetStats;
