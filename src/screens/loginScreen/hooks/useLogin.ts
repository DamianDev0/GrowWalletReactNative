import {useState, useEffect} from 'react';
import {useAuth} from '../../../context/useAuthContext';
import useNavigation from '../../../hook/useNavigation';
import {validateInputs} from '../../../utils/validInputs';

const useLogin = () => {
  const {login, loading, errorMessage: globalErrorMessage} = useAuth();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!validateInputs(formData, setErrorMessage, 'login')) {
      return;
    }

    const {email, password} = formData;

    try {
      await login(email, password);
      if (!globalErrorMessage) {
        setFormData({email: '', password: ''});
        navigation.navigate('Home');
      } else {
        setErrorMessage(globalErrorMessage);
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
  };

  useEffect(() => {
    if (globalErrorMessage) {
      setErrorMessage(globalErrorMessage);
    }
  }, [globalErrorMessage]);

  const handleSignUpNavigation = () => {
    navigation.navigate('Signup');
  };

  return {
    formData,
    handleChange: (field: string, value: string) =>
      setFormData({...formData, [field]: value}),
    handleLogin,
    loading,
    errorMessage,
    handleSignUpNavigation,
  };
};

export default useLogin;
