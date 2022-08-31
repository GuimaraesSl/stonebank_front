import { ApiRequest } from '_config/api'

export interface CreateSmsTransferRequest extends ApiRequest {
  toTaxId?: string
  transferValue?: number
  bank?: String
  bankBranch?: String
  bankAccount?: String
  bankAccountDigit?: String
  transferDate?: Date | null
  tags?: string[]
  description?: string
  phoneNumber?: string
}

export interface CreatePendingSmsTransferRequest extends ApiRequest {
  phoneNumber?: string
  value?: number
}
