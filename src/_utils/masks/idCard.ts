export const maskIdCard = (value: string) =>
  value.replace(/\D/g, '').replace(/(\d{9})\d+?$/, '$1')
