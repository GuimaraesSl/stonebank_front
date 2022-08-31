import { Gender, MaritalStatus } from './Enum'

export interface CardHolder {
  holderTaxId: string
  nationality: string
  motherName: string
  gender: Gender
  fullName: string
  birthDate: string
  maritalStatus: MaritalStatus
}
