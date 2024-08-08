export const validateUrl = (urlToValidate: string): boolean => {
  const urlRegex =
    /^(https?:\/\/)?([^\s@]+@[^\s@]+\.)?[^\s@]+\.[^\s@.]{2,}(:[0-9]{1,5})?(\/[^\s]*)?$/i;
  return urlRegex.test(urlToValidate);
};
