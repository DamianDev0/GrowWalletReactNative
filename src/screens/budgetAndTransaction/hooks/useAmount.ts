import {useState, useEffect} from 'react';
import budgetService from '../../../services/budgetService';
import {useAuth} from '../../../context/useAuthContext';
import {BudgetResponse} from '../../../interfaces/budget.interface';
import Toast from 'react-native-toast-message';

const useBudgetByCategory = (categoryId: string): BudgetResponse | null => {
  const [budget, setBudget] = useState<BudgetResponse | null>(null);
  const {token} = useAuth();

  useEffect(() => {
    const fetchBudget = async () => {
      if (!token) {
        console.log('Token is not available');
        Toast.show({
          type: 'error',
          text1: 'Authentication Error',
          text2: 'Please log in to access budget information.',
        });
        return;
      }

      try {
        const response = await budgetService.getBudgetByCategory(
          token,
          categoryId,
        );

        if ('message' in response) {
          console.log('Error response:', response);
          Toast.show({
            type: 'error',
            text1: 'Fetch Error',
            text2: 'Unable to fetch budget details. Please try again later.',
            position: 'bottom',
          });
        } else {
          setBudget(response);
        }
      } catch (error: any) {
        const errorMessage =
          'There was an issue fetching the budget details. Please check your connection and try again.';
        Toast.show({
          type: 'error',
          text1: 'Unexpected Error',
          text2: errorMessage,
          position: 'bottom',
        });
      }
    };

    fetchBudget();
  }, [token, categoryId]);

  return budget;
};

export default useBudgetByCategory;
