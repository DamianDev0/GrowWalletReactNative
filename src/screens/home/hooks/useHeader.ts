import {useState, useEffect} from 'react';
import walletService from '../../../services/walletService';
import {WalletResponse} from '../../../interfaces/wallet.interface';
import {useAuth} from '../../../context/useAuthContext';

const useWalletBalance = () => {
  const {token, logout} = useAuth();
  const [wallet, setWallet] = useState<WalletResponse['data'] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchWalletBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchWalletBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await walletService.getWallet(token!);

      if (response && 'data' in response) {
        setWallet(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch wallet balance');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return {wallet, loading, error, handleLogout, fetchWalletBalance};
};

export default useWalletBalance;
