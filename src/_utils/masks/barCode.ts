export const maskBarcode = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{11})(\d)(\d{1})/, '$1 $2 $3')
    .replace(/(\d{11})(\d)(\d{1})/, '$1 $2 $3')
    .replace(/(\d{11})(\d)(\d{1})/, '$1 $2 $3')
    .replace(/(.\d{11})(\d)+?$/, '$1 $2')

export const MaskBarCodeFgts = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{10})(\d)/, '$1 $2 ')
    .replace(/(\d{10})(\d)/, '$1 $2 ')
    .replace(/(\d{10})(\d)/, '$1 $2 ')
    .replace(/(.\d{10})(\d)+?$/, '$1 $2')
