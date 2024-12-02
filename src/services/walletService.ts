import apiClient from '../api/apiClient';
import {WalletRequest, WalletResponse} from '../interfaces/wallet.interface';
import {handleApiError, ApiError} from '../utils/errorHandler';

const walletService = {
  createWallet: async (
    data: WalletRequest,
    token: string,
  ): Promise<WalletResponse | ApiError> => {
    try {
      const response = await apiClient.post<WalletResponse>('/wallet', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  getWallet: async (token: string): Promise<WalletResponse | ApiError> => {
    try {
      const response = await apiClient.get<WalletResponse>('/wallet/balance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },
};

export default walletService;
