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
  store: string
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
