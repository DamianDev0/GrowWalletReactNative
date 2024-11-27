import {useState} from 'react';
import {CustomToast} from '../../../components/toastMessage.component';
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
    if (!validateInputs(formData, setErrorMessage)) {
      CustomToast({
        type: 'error',
        text1: 'Validation Error',
        text2: errorMessage || 'Invalid inputs.',
      });
      return;
    }
    const {email, password} = formData;

    await login(email, password);

    if (globalErrorMessage) {
      setErrorMessage(globalErrorMessage);
      CustomToast({
        type: 'error',
        text1: 'Login Failed',
        text2: globalErrorMessage,
      });
      return;
    }
    setFormData({email: '', password: ''});
    navigation.navigate('Home');
    setErrorMessage(null);
  };

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
