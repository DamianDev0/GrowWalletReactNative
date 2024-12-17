import useTransactions from '../hooks/useTransaction';
import {DataItem} from '../../../interfaces/transaction.interface';
import {format} from 'date-fns';

export const useGroupedTransactions = () => {
  const {transactions, loading, error} = useTransactions();

  const sortedTransactions = transactions.sort((a: DataItem, b: DataItem) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const transactionsByDay = sortedTransactions.reduce(
    (acc: {[key: string]: DataItem[]}, transaction: DataItem) => {
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

  const currentMonth = format(new Date(), 'MMMM yyyy'); // Add current month

  return {sections, loading, error, currentMonth};
};
