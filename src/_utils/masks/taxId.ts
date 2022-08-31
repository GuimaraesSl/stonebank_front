export const maskTaxId = (value: string) =>
  value.length <= 14 ? maskCpf(value) : maskCnpj(value)

export const maskCpf = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, 'XXX.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-XX')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const maskCnpj = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, 'XX.$2')
    .replace(/(\d{3})(\d)/, 'XXX.$2')
    .replace(/(\d{3})(\d)/, 'XXX/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '-XX')
