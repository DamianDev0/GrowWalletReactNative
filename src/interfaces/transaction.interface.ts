import {Category} from './category.interface';

export interface Wallet {
  id: string;
  balance: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface DataItem {
  id: string;
  amount: string;
  date: string;
  name: string;
  store: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  wallet: Wallet;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T[];
}

export interface CreateTransactionPayload {
  amount: number;
  budgetId: string;
  name: string;
  description: string;
  store: string;
}


export interface TransactionCreateResponse {
  id: string;
  amount: string;
  date: string;
  name: string;
  store: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  wallet: Wallet;
  user: {
    id: string;
  };
}
