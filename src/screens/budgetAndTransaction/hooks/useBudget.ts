import {useState} from 'react';
import budgetService from '../../../services/budgetService';
import {ApiError} from '../../../utils/errorHandler';
import {useAuth} from '../../../context/useAuthContext';
import Toast from 'react-native-toast-message';
import useNavigation from '../../../hook/useNavigation';

const useBudget = (categoryId: string) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const {token} = useAuth();
  const navigation = useNavigation();

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleSave = async () => {
    if (!token) {
      Toast.show({
        type: 'error',
        text1: 'Authentication Error',
        text2: 'Token is not available',
      });
      return;
    }

    if (!amount || !selectedValue) {
      Toast.show({
        type: 'error',
        text1: 'Input Error',
        text2: 'Please provide all required fields',
      });
      return;
    }

    try {
      const response = await budgetService.createBudget(token, {
        amount: Number(amount),
        categoryId,
        period: selectedValue,
      });

      if ('message' in response) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: (response as ApiError).message,
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Budget created successfully',
          position: 'bottom',
        });
        navigation.goBack();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'An unexpected error occurred. Please try again.';
      Toast.show({
        type: 'error',
        text1: 'Unexpected Error',
        text2: errorMessage,
      });
    }
  };

  return {
    isVisible,
    openModal,
    closeModal,
    handleSave,
    selectedValue,
    setSelectedValue,
    amount,
    setAmount,
  };
};

export default useBudget;
