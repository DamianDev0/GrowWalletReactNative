import {useEffect, useState, useCallback} from 'react';
import {useAuth} from '../../../context/useAuthContext';
import {Category} from '../../../interfaces/category.interface';
import categoryService from '../../../services/category';

const useCategoriesUser = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {token} = useAuth();

  const fetchCategories = useCallback(async () => {
    if (!token) {
      setError(null);
      setLoading(false);
      return;
    }

    try {
      const result = await categoryService.getUserCategories(token);
      if (Array.isArray(result)) {
        setCategories(result);
      } else {
        setError(result.message || 'Failed to fetch categories');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [token, fetchCategories]);

  return {categories, error, loading, fetchCategories};
};

export default useCategoriesUser;
