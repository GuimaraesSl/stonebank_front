import { AccountType, TransferType } from './enum'
export interface SmsTransfer {
  transferType?: TransferType
  transferValue?: number
  bank?: string
  phoneNumber?: string
  value?: number
  toName?: string
  bankBranch?: string
  bankAccount?: string
  bankAccountDigit?: string
  accountType?: AccountType
  tags?: string[]
  description?: string
}
