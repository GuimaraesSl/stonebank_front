export interface LoginResponse {
  userId: number
  taxId: string
  name: string
  mail: string
  phoneNumber: string
  zipCode: string
  street: string
  number: string
  district: string
  complement: string
  city: string
  state: string
  reference: string
  country: string
  token: string
  isFirstAccess: boolean
  acceptedTerms: boolean
  tokenAccess: string
}
