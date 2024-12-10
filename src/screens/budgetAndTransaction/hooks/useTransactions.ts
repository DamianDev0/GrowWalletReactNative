import {useState} from 'react';
import transactionService from '../../../services/transactionService';
import {CustomToast} from '../../../components/toastMessage.component';
import {useAuth} from '../../../context/useAuthContext';
import useNavigation from '../../../hook/useNavigation';

const useTransaction = (budgetId: string) => {
  const [isVisible, setIsVisible] = useState(false);
  const {token} = useAuth();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    store: '',
    name: '',
  });

  const openModal = () => setIsVisible(true);
  const closeModal = () => {
    setIsVisible(false);
    setFormData({amount: '', description: '', store: '', name: ''});
  };

  const handleChangeInput = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSave = async () => {
    if (!token) {
      return CustomToast({
        type: 'error',
        text1: 'Authentication Error',
        text2: 'Token is not available',
      });
    }

    const payload = {
      ...formData,
      amount: Number(formData.amount),
      budgetId,
    };

    try {
      const result = await transactionService.createTransaction(token, payload);

      if ('id' in result) {
        CustomToast({
          type: 'success',
          text1: 'Transaction Created',
          text2: 'The transaction was created successfully.',
        });
        navigation.goBack();
        closeModal();
      } else if ('message' in result) {
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2:
            result.message || 'There was an error creating the transaction.',
        });
      }
    } catch (error) {
      CustomToast({
        type: 'error',
        text1: 'Unexpected Error',
        text2: 'An unexpected error occurred.',
      });
    }
  };

  return {
    isVisible,
    openModal,
    closeModal,
    handleChangeInput,
    handleSave,
    formData,
  };
};

export default useTransaction;
