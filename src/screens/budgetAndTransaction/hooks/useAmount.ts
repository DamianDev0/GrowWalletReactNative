import { useState, useEffect, useCallback } from 'react';
import budgetService from '../../../services/budgetService';
import { useAuth } from '../../../context/useAuthContext';
import { BudgetResponse } from '../../../interfaces/budget.interface';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useBudgetByCategory = (categoryId: string) => {
  const [budget, setBudget] = useState<BudgetResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchBudget = useCallback(async () => {
    if (!token) {
      Toast.show({
        type: 'error',
        text1: 'Authentication Error',
        text2: 'Please log in to access budget information.',
      });
      setLoading(false);
      return;
    }

    try {
      const cachedBudget = await AsyncStorage.getItem(`budget_${categoryId}`);

      if (cachedBudget) {
        setBudget(JSON.parse(cachedBudget));
        setLoading(false);
      } else {
        const response = await budgetService.getBudgetByCategory(token, categoryId);

        if ('message' in response) {
          Toast.show({
            type: 'info',
            text1: 'No Budget Assigned',
            text2: 'There is no budget assigned to this category yet.',
            position: 'bottom',
          });
        } else {
          setBudget(response);
          await AsyncStorage.setItem(`budget_${categoryId}`, JSON.stringify(response));
        }
      }
    } catch (error) {
      const errorMessage =
        'There was an issue fetching the budget details. Please check your connection and try again.';
      Toast.show({
        type: 'error',
        text1: 'Unexpected Error',
        text2: errorMessage,
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  }, [categoryId, token]);

  useEffect(() => {
    fetchBudget();
  }, [categoryId, fetchBudget]);

  return { budget, loading };
};

export default useBudgetByCategory;
