export interface BudgetResponse {
  amount: number;
  startDate: string;
  endDate: string;
  period: string;
  id: string;
  spentAmount: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetStatsData {
  totalBudgetAmount: string;
  totalAmountSpent: number;
  remainingBudgetAmount: number;
  percentageBudgetUsed: number;
  percentageBudgetRemaining: number;
  totalTransactions: number;
  averageSpentPerTransaction: number;
  daysRemaining: number;
  dailySpendingRate: number;
  averageDailySpending: number;
  transactionDays: string[];
}
