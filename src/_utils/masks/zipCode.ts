export const maskZipCode = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d{3})/, '$1-$2')
    .replace(/(.\d{4})(-)(\d{3})\d+?$/, '$1$2$3')
