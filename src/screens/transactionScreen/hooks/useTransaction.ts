import { useEffect, useState, useCallback } from 'react';
import transactionService from '../../../services/transactionService';
import { DataItem } from '../../../interfaces/transaction.interface';
import { ApiError } from '../../../utils/errorHandler';
import { useAuth } from '../../../context/useAuthContext';

const useTransactions = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    if (token) {
      try {
        const data = await transactionService.getTransactions(token);
        if (data instanceof Array) {
          setTransactions(data);
        } else {
          setError(data);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError({ message: 'Token is null', statusCode: 401 });
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, fetchTransactions };
};

export default useTransactions;
