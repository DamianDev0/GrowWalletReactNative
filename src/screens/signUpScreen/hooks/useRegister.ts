import {useState} from 'react';
import {useAuth} from '../../../context/useAuthContext';
import useNavigation from '../../../hook/useNavigation';
import {handleChangeInput} from '../../../utils/handleChangeInput';
import {CustomToast} from '../../../components/toastMessage.component';

const useRegister = () => {
  const {signUp, loading, errorMessage: globalErrorMessage} = useAuth();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateInputs = () => {
    const {email, password, name} = formData;

    if (!email || !password || !name) {
      setErrorMessage('Please provide both email, password, and name.');
      CustomToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'All fields are required.',
      });
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please provide a valid email address.');
      CustomToast({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please provide a valid email address.',
      });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) {return;}

    const {email, password, name} = formData;

    await signUp(email, password, name);

    if (globalErrorMessage) {
      setErrorMessage(globalErrorMessage);
      CustomToast({
        type: 'error',
        text1: 'Registration Error',
        text2: globalErrorMessage,
      });
    } else {
      setFormData({email: '', password: '', name: ''});
      navigation.navigate('Home');
      setErrorMessage(null);
      CustomToast({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Your account has been created.',
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
