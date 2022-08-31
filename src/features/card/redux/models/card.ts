import { ReasonCode } from 'features/card/redux/models/reasonCodeEnum'
import { Gender, MaritalStatus } from './Enum'
export interface Card {
  identifierCard: string
  toTaxId: string
  fullName: string
  status: number
  panLastDigits: number
  isBlocked: boolean
  flagName: string
  currentPin?: string
  pin?: string
  confirmationPin?: string
  reasonCode?: ReasonCode
  gender?: Gender
  nationality?: string
  motherName?: string
  birthDate?: string
  maritalStatus?: MaritalStatus
}
