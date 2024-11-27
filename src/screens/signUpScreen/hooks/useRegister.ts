import {useState} from 'react';
import {useAuth} from '../../../context/useAuthContext';
import useNavigation from '../../../hook/useNavigation';
import {handleChangeInput} from '../../../utils/handleChangeInput';
import {validateInputs} from '../../../utils/validInputs';

const useRegister = () => {
  const {signUp, loading, errorMessage: globalErrorMessage} = useAuth();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!validateInputs(formData, setErrorMessage, 'register')) {
      setErrorMessage('Validation Error: Invalid input.');
      return;
    }

    const {email, password, name} = formData;

    try {
      await signUp(email, password, name);
      if (!globalErrorMessage) {
        setFormData({email: '', password: '', name: ''});
        setErrorMessage(null);
        navigation.navigate('Home');
      } else {
        setErrorMessage(globalErrorMessage);
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || globalErrorMessage || 'An unexpected error occurred.',
      );
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
