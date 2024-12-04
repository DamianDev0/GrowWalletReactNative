import {ApiResponse, Category} from '../interfaces/category.interface';
import {ApiError} from '../utils/errorHandler';
import {handleApiError} from '../utils/errorHandler';
import apiClient from '../api/apiClient';

const categoryService = {
  getCategories: async (): Promise<Category[] | ApiError> => {
    try {
      const response = await apiClient.get<ApiResponse>('/category');
      return response.data.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },
};

export default categoryService;
