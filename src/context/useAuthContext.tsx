/* eslint-disable @typescript-eslint/no-shadow */
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';
import { CustomToast } from '../components/toastMessage.component';
import { handleApiError } from '../utils/errorHandler';
import useNavigation from '../hook/useNavigation';

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  name: string | null;
  walletId: string | null;
  email: string | null;
  password: string | null;
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
  const [name, setName] = useState<string | null>(null);
  const [walletId, setWalletId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadStoredToken();
  }, []);

  // Carga el token y otros datos desde AsyncStorage
  const loadStoredToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedName = await AsyncStorage.getItem('name');
      const storedWalletId = await AsyncStorage.getItem('walletId');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');

      if (
        storedToken &&
        storedUserId &&
        storedName &&
        storedEmail &&
        storedPassword
      ) {
        setToken(storedToken);
        setUserId(storedUserId);
        setName(storedName);
        setWalletId(storedWalletId);
        setEmail(storedEmail);
        setPassword(storedPassword);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    resetMessages();

    try {
      const response = await authService.login({email, password});
      if (response && 'data' in response) {
        const {accessToken, id, name, walletId} = response.data;
        if (accessToken && id && name) {
          await storeToken(accessToken, id, name, walletId, email, password);
          CustomToast({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome back!',
          });
          handleNavigation(walletId);
        } else {
          throw new Error('Invalid login response');
        }
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      const apiError = handleApiError(error);
      handleApiError(apiError);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    resetMessages();

    try {
      const result = await authService.register({email, password, name});
      if ('statusCode' in result && result.statusCode === 409) {
        setErrorMessage('Email already in use. Please try a different one.');
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: 'Email already in use.',
        });
      } else {
        CustomToast({
          type: 'success',
          text1: 'Registration Successful',
          text2: 'Your account has been created.',
        });
        navigation.navigate('Wallet');
      }
    } catch (error) {
      console.error('Sign-up failed:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetMessages = () => setErrorMessage(null);

  const storeToken = async (
    token: string,
    userId: string,
    name: string,
    walletId: string | null,
    email: string,
    password: string,
  ) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('name', name);
      if (walletId) {await AsyncStorage.setItem('walletId', walletId);}
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);

      setToken(token);
      setUserId(userId);
      setName(name);
      setWalletId(walletId);
      setEmail(email);
      setPassword(password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const handleNavigation = (walletId: string | null) => {
    if (!walletId) {
      navigation.navigate('Wallet');
    } else {
      navigation.navigate('Home');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        'token',
        'userId',
        'name',
        'walletId',
        'email',
        'password',
      ]);
      setToken(null);
      setUserId(null);
      setName(null);
      setWalletId(null);
      setEmail(null);
      setPassword(null);
      setIsAuthenticated(false);
      CustomToast({
        type: 'info',
        text1: 'Logged out',
        text2: 'You have been logged out successfully.',
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        name,
        walletId,
        email,
        password,
        isAuthenticated,
        login,
        logout,
        signUp,
        loading,
        errorMessage,
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
