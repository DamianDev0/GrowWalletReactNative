export const validateInputs = (
  formData: {email: string; password: string; name?: string},
  setErrorMessage: (message: string | null) => void,
  requireName: boolean = false,
): boolean => {
  const {email, password, name} = formData;

  if (!email || !password || (requireName && !name)) {
    setErrorMessage('All required fields must be filled.');
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
