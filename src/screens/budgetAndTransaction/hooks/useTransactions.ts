import { useState } from 'react';
import transactionService from '../../../services/transactionService';
import { CustomToast } from '../../../components/toastMessage.component';
import { handleChangeInput } from '../../../utils/handleChangeInput';
import { useAuth } from '../../../context/useAuthContext';

const useTransaction = (budgetId: string) => {
  const [isVisible, setIsVisible] = useState(false);
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    store: '',
    name: '',
  });

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  const handleSave = async () => {
    const payload = {
      ...formData,
      amount: Number(formData.amount),
      budgetId,
    };
    if (!token) {
      CustomToast({
        type: 'error',
        text1: 'Authentication Error',
        text2: 'Token is not available',
      });
      return;
    }

    try {
      const result = await transactionService.createTransaction(token, payload);

      if (typeof result === 'object' && result !== null && 'id' in result) {
        // Si la respuesta tiene un id, significa que la transacción se creó correctamente.
        CustomToast({
          type: 'success',
          text1: 'Transaction Created',
          text2: 'The transaction was created successfully.',
        });
        closeModal();
      } else if (typeof result === 'object' && result !== null && 'message' in result) {
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: result.message || 'There was an error creating the transaction.',
        });
        console.error(result);
      }
    } catch (error) {
      CustomToast({
        type: 'error',
        text1: 'Unexpected Error',
        text2: 'An unexpected error occurred.',
      });
      console.error(error);
    }
  };

  return {
    isVisible,
    openModal,
    closeModal,
    handleChangeInput,
    handleSave,
    formData,
    setFormData,
  };
};

export default useTransaction;
