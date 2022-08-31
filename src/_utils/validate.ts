const numbers = /(?=.*\d)/g
const special = /(?=.*\W)/g
const upperCase = /(?=.*[A-Z])/g
const lowerCase = /(?=.*[a-z])/g
const sequenceLetters = /[A-Za-z]{2}/g
const sequenceNumbers = /\d{2}/g

export const validateLowerCase = (value: string) => {
  return lowerCase.test(value)
}

export const validateUpperCase = (value: string) => {
  return upperCase.test(value)
}

export const validateSpecial = (value: string) => {
  return special.test(value)
}

export const validateNumbers = (value: string) => {
  return numbers.test(value)
}

export const validateLowerUpperNumber = (value: string) => {
  return numbers.test(value) && lowerCase.test(value) && upperCase.test(value)
}

export const validateLength = (value: string) => {
  return value.length > 7 && value.length < 17
}

export const validateSequenceLength = (value: string) => {
  if (value === '') return false
  return !value.match(sequenceLetters) && !value.match(sequenceNumbers)
}

export const validateEmail = (email: string) => {
  const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/i
  return re.test(email)
}
