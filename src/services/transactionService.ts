/* eslint-disable no-dupe-keys */
import {
  ApiResponse,
  CreateTransactionPayload,
  TransactionCreateResponse,
  DataItem,
} from '../interfaces/transaction.interface';
import {ApiError, handleApiError} from '../utils/errorHandler';
import apiClient from '../api/apiClient';

const transactionService = {
  getTransactions: async (token: string): Promise<DataItem[] | ApiError> => {
    try {
      const response = await apiClient.get<ApiResponse<DataItem>>(
        '/transaction',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  createTransaction: async (
    token: string,
    payload: CreateTransactionPayload,
  ): Promise<TransactionCreateResponse | ApiError> => {
    try {
      const response = await apiClient.post<
        ApiResponse<TransactionCreateResponse>
      >('/transaction', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data.data)) {
        throw new Error('Unexpected array response');
      }

      return response.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default transactionService;
