import { useState } from 'react';
import categoryService from '../../../services/category';
import { ApiError } from '../../../utils/errorHandler';
import { useAuth } from '../../../context/useAuthContext';
import { CustomToast } from '../../../components/toastMessage.component';

const useCategory = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<{ name: string; description: string }>({
    name: '',
    description: '',
  });
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const { token } = useAuth();

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleSave = async () => {
    if (!token) {
      CustomToast({
        type: 'error',
        text1: 'Authentication Error',
        text2: 'Token is not available',
      });
      return;
    }

    if (!form.name || !form.description || !selectedValue) {
      CustomToast({
        type: 'error',
        text1: 'Input Error',
        text2: 'Please provide all required fields',
      });
      return;
    }

    try {
      const response = await categoryService.createCategoriesUser(token, {
        name: form.name,
        description: form.description,
        icon: selectedValue,
      });

      if ('message' in response) {
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: (response as ApiError).message,
          position: 'bottom',
        });
      } else {
        CustomToast({
          type: 'success',
          text1: 'Success',
          text2: 'Category created successfully',
          position: 'bottom',
        });

        setForm({ name: '', description: '' });
        setSelectedValue(null);
        closeModal();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'An unexpected error occurred. Please try again.';
      CustomToast({
        type: 'error',
        text1: 'Unexpected Error',
        text2: errorMessage,
      });
    }
  };

  const handleChange = (field: 'name' | 'description', value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  };

  return {
    isVisible,
    openModal,
    closeModal,
    handleSave,
    form,
    handleChange,
    selectedValue,
    setSelectedValue,
  };
};

export default useCategory;
