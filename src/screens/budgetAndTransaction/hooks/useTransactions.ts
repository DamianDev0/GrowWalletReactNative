import {useState} from 'react';

const useTransaction = () => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return {isVisible, openModal, closeModal};
};

export default useTransaction;
