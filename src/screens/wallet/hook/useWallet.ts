import { useState } from 'react';
import walletService from '../../../services/walletService';
import { WalletResponse } from '../../../interfaces/wallet.interface';
import { ApiError } from '../../../utils/errorHandler';
import { useAuth } from '../../../context/useAuthContext';
import { CustomToast } from '../../../components/toastMessage.component';
import useNavigation from '../../../hook/useNavigation';

const useCreateWallet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [budget, setBudget] = useState('');
  const { token, email, password, login } = useAuth();
  const navigation = useNavigation();

  const handleCreateWallet = async () => {
    if (!budget) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a budget.',
      });
      return;
    }
    setLoading(true);
    setError(null);
    if (!token || !email || !password) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'No token or credentials provided',
      });
      throw new Error('No token or credentials provided');
    }
    try {
      const response = await walletService.createWallet(
        { balance: parseFloat(budget) },
        token,
      );
      setWallet(response as WalletResponse);
      CustomToast({
        type: 'success',
        text1: 'Success',
        text2: 'Wallet created successfully!',
      });

      await login(email, password);
      navigation.navigate('Home');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: apiError.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { budget, setBudget, handleCreateWallet, wallet, loading, error };
};

export default useCreateWallet;
