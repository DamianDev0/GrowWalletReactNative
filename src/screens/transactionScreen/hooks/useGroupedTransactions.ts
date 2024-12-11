import  useTransactions  from '../hooks/useTransaction';
import { DataItem } from '../../../interfaces/transaction.interface';
import { format } from 'date-fns';

export const useGroupedTransactions = () => {
  const { transactions, loading, error } = useTransactions();

  const transactionsByDay = transactions.reduce(
    (acc: { [key: string]: DataItem[] }, transaction: DataItem) => {
      const transactionDate = new Date(transaction.date);
      const dayOfWeek = format(transactionDate, 'EEEE');

      if (!acc[dayOfWeek]) {
        acc[dayOfWeek] = [];
      }
      acc[dayOfWeek].push(transaction);
      return acc;
    },
    {},
  );

  const sections = Object.keys(transactionsByDay).map(day => ({
    title: day,
    data: transactionsByDay[day],
  }));

  return { sections, loading, error };
};
