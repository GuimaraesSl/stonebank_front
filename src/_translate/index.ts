import { ptBR } from 'date-fns/locale'

export const locale = 'pt-BR'
export const datePickerLocale = ptBR
export const currency = 'BRL'
export const currencySymbol = 'R$'
export const LEGAL_AGE = 18

export const CurrencyFormatter = Intl.NumberFormat(locale, {
  style: 'currency',
  currency: currency,
})

export const DateFormatter = Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  weekday: 'long',
})

export const WeekdayFormatter = Intl.DateTimeFormat(locale, {
  weekday: 'long',
})

export const ShortDateFormatter = Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export const parseCurrency = (value: string) => {
  const arr = Array.from(value).reverse()
  const point = arr.indexOf('.')
  const comma = arr.indexOf(',')
  let commaSeparated = point < comma
  if (point === -1) commaSeparated = point > comma

  const regex = commaSeparated
    ? /[ a-zA-ZЁёА-яء-يčƒ$,\p{Sc}]/g
    : /[ a-zA-ZЁёА-яء-يčƒ$.\p{Sc}]/g
  let result = value.replace(regex, '')
  if (!commaSeparated) result = result.replace(/[,]/g, '.')

  return parseFloat(parseFloat(result).toFixed(2))
}
