export const formatCurrency = (amount: string, currency: string) => {
  const numericAmount = parseFloat(amount);
  return numericAmount.toLocaleString('es-CO', {
    style: 'currency',
    currency: currency,
  });
};
