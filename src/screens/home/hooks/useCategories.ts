import {useState, useEffect} from 'react';
import categoryService from '../../../services/category';
import {Category} from '../../../interfaces/category.interface';
import {ApiError} from '../../../utils/errorHandler';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await categoryService.getCategories();
        if (Array.isArray(result) && result.length > 0) {
          setCategories(result);
        } else {
          setError({message: 'No categories found', statusCode: 404});
        }
      } catch (err) {
        setError({message: 'Failed to fetch categories', statusCode: 500});
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {categories, error, loading};
};

export default useCategories;
