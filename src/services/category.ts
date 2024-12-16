import { ApiResponse, Category } from '../interfaces/category.interface';
import { ApiError } from '../utils/errorHandler';
import { handleApiError } from '../utils/errorHandler';
import apiClient from '../api/apiClient';

const categoryService = {
  getCategories: async (): Promise<Category[] | ApiError> => {
    try {
      const response = await apiClient.get<ApiResponse<Category[]>>('/category');
      return response.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  createCategoriesUser: async (
    token: string,
    category: Category,
  ): Promise<Category | ApiError> => {
    try {
      const response = await apiClient.post<ApiResponse<Category>>(
        '/category/user',
        category,
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

  getUserCategories: async (token: string): Promise<Category[] | ApiError> => {
    try {
      const response = await apiClient.get<ApiResponse<Category[]>>(
        '/category/user',
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
};

export default categoryService;
