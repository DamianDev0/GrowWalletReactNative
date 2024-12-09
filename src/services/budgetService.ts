import {ApiResponse} from '../interfaces/transaction.interface';
import {ApiError} from '../utils/errorHandler';
import {handleApiError} from '../utils/errorHandler';
import apiClient from '../api/apiClient';
import {BudgetResponse, BudgetStatsData} from '../interfaces/budget.interface';

const budgetService = {
  createBudget: async (
    token: string,
    budgetData: {amount: number; categoryId: string; period: string},
  ): Promise<BudgetResponse | ApiError> => {
    try {
      const response = await apiClient.post<ApiResponse<BudgetResponse>>(
        '/budget',
        budgetData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (Array.isArray(response.data.data)) {
        throw new Error('Unexpected array response');
      }

      return response.data.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  getAmount: async (
    token: string,
    budgetId: string,
  ): Promise<BudgetResponse | ApiError> => {
    try {
      const response = await apiClient.get<ApiResponse<BudgetResponse>>(
        `/budget/${budgetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (Array.isArray(response.data.data)) {
        throw new Error('Unexpected array response');
      }

      return response.data.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  getBudgetByCategory: async (
    token: string,
    categoryId: string,
  ): Promise<BudgetResponse | ApiError> => {
    try {
      const response = await apiClient.get<ApiResponse<BudgetResponse>>(
        `/budget/category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (Array.isArray(response.data.data)) {
        throw new Error('Unexpected array response');
      }

      return response.data.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  getBudgetStats: async (
    token: string,
    budgetId: string,
  ): Promise<BudgetStatsData | ApiError> => {
    try {
      const response = await apiClient.get<ApiResponse<BudgetStatsData>>(
        `/budget/stats/${budgetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (Array.isArray(response.data.data)) {
        throw new Error('Unexpected array response');
      }

      return response.data.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },
};

export default budgetService;
