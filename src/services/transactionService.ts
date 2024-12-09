/* eslint-disable no-dupe-keys */
import {
  ApiResponse,
  CreateTransactionPayload,
  TransactionCreateResponse,
  DataItem,
} from '../interfaces/transaction.interface';
import { ApiError, handleApiError } from '../utils/errorHandler';
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
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  createTransaction: async (
    token: string,
    payload: CreateTransactionPayload,
  ): Promise<TransactionCreateResponse | ApiError> => {
    try {
      const response = await apiClient.post<ApiResponse<TransactionCreateResponse>>(
        '/transaction',
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.code === 201) {
        return response.data.data[0];  // Devuelve el primer elemento del arreglo
      } else {
        const apiError: ApiError = {
          statusCode: response.data.code || 500,
          message: response.data.message || 'Internal Server Error',
          statusCode: response.data.code || 0,
        };
        return apiError;
      }
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },
};

export default transactionService;
