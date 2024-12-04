import {ApiResponse} from '../interfaces/transaction.interface';
import {ApiError} from '../utils/errorHandler';
import {handleApiError} from '../utils/errorHandler';
import apiClient from '../api/apiClient';
import {DataItem} from '../interfaces/transaction.interface';

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
};

export default transactionService;
