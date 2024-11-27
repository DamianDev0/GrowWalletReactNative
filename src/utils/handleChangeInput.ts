export const handleChangeInput = (
  field: string,
  value: string,
  setFormData: React.Dispatch<React.SetStateAction<any>>,
) => {
  setFormData((prevData: any) => ({
    ...prevData,
    [field]: value,
  }));
};
