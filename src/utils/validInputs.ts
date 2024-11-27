export const validateInputs = (
  formData: {email: string; password: string; name?: string},
  setErrorMessage: (message: string | null) => void,
  context: 'login' | 'register' = 'login',
): boolean => {
  const {email, password, name} = formData;

  if (!email || !password || (context === 'register' && !name)) {
    const message =
      context === 'register'
        ? 'All fields must be filled for registration.'
        : 'All required fields must be filled for login.';
    setErrorMessage(message);
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    setErrorMessage('Please provide a valid email address.');
    return false;
  }

  setErrorMessage(null);
  return true;
};
