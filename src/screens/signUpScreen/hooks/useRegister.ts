import { useState } from 'react';
import { useAuth } from '../../../context/useAuthContext';
import useNavigation from '../../../hook/useNavigation';
import { handleChangeInput } from '../../../utils/handleChangeInput';
import { CustomToast } from '../../../components/toastMessage.component';
import { validateInputs } from '../../../utils/validInputs';

const useRegister = () => {
  const { signUp, loading, errorMessage: globalErrorMessage } = useAuth();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!validateInputs(formData, setErrorMessage, true)) {
      CustomToast({
        type: 'error',
        text1: 'Validation Error',
        text2: errorMessage || 'Invalid input.',
      });
      return;
    }

    const { email, password, name } = formData;

    try {
      await signUp(email, password, name);
      setFormData({ email: '', password: '', name: '' });
      navigation.navigate('Home');
      setErrorMessage(null);
      CustomToast({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Your account has been created.',
      });
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const errorMessage = error.message || globalErrorMessage || 'An unexpected error occurred.';
      setErrorMessage(errorMessage);
      CustomToast({
        type: 'error',
        text1: 'Registration Error',
        text2: errorMessage,
      });
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate('Login');
  };

  return {
    formData,
    handleChange: (field: string, value: string) =>
      handleChangeInput(field, value, setFormData),
    handleRegister,
    loading,
    errorMessage,
    handleLoginNavigation,
  };
};

export default useRegister;
