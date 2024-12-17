export type NavigationParams = {
  Home: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Wallet: undefined;
  BudgetAndTransactionScreen: {
    id: string;
    name: string;
    description: string;
    icon: string;
  };
  TransactionDetailsScreen: {
    id: string;
    name: string;
    description: string;
    icon: string;
    date: string;
    amount: string;
    categoryName: string;
  };
};

export type NavigationTab = {
  HomeTab: undefined;
  Chart: undefined;
  Transaction: undefined;
};
