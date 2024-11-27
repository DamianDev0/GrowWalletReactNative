import apiClient from '../api/apiClient';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../interfaces/auth.interface';
import {handleApiError, ApiError} from '../utils/errorHandler';

const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse | ApiError> => {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', data);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  register: async (
    data: RegisterRequest,
  ): Promise<RegisterResponse | ApiError> => {
    try {
      const response = await apiClient.post<RegisterResponse>(
        '/auth/register',
        data,
      );
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },
};

export default authService;
