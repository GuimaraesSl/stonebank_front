export const maskTransference = (value: string) =>
  value.replace(/\D/g, '').replace(/(\d{})\d+?$/, '$1')
