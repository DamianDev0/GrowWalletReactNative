import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';
import {CustomToast} from '../components/toastMessage.component';
import {handleApiError, ApiError} from '../utils/errorHandler';

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  errorMessage: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    const storedUserId = await AsyncStorage.getItem('userId');
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    resetMessages();

    try {
      const response = await authService.login({email, password});

      if (response && 'data' in response) {
        const {accessToken, id} = response.data;
        if (accessToken && id) {
          await storeToken(accessToken, id);
          CustomToast({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome back!',
          });
        } else {
          throw new Error('Invalid login response');
        }
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error: unknown) {
      const apiError = handleApiError(error);
      handleError(apiError);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    resetMessages();

    try {
      const result = await authService.register({email, password, name});

      if ('statusCode' in result) {
        setErrorMessage(
          result.message || 'An error occurred during registration.',
        );
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: result.message || 'An error occurred during registration.',
        });
      } else {
        CustomToast({
          type: 'success',
          text1: 'Registration Successful',
          text2: 'Your account has been created.',
        });
      }
    } catch (error) {
      console.error('Sign-up failed:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error: ApiError) => {
    setErrorMessage(error.message || 'An unexpected error occurred.');
    CustomToast({
      type: 'error',
      text1: 'Error',
      text2: error.message || 'An unexpected error occurred.',
    });
  };

  const resetMessages = () => {
    setErrorMessage(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const storeToken = async (token: string, userId: string) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userId', userId);
    setToken(token);
    setUserId(userId);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'userId']);
    setUserId(null);
    setIsAuthenticated(false);
    setToken(null);
    CustomToast({
      type: 'info',
      text1: 'Logged out',
      text2: 'You have been logged out successfully.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isAuthenticated,
        login,
        logout,
        loading,
        errorMessage,
        signUp,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
