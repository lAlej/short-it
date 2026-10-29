export const validateUrl = (urlToValidate: string): boolean => {
  const urlRegex =
    /^(https?:\/\/)?([^\s@]+@[^\s@]+\.)?[^\s@]+\.[^\s@.]{2,}(:[0-9]{1,5})?(\/[^\s]*)?$/i;
  return urlRegex.test(urlToValidate.trim());
};

export const normalizeUrl = (url: string): string => {
  const trimmed = url.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};
