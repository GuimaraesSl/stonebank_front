import { ApiRequest } from '_config/api'

export interface FindPixKeyListRequest extends ApiRequest {
  taxId: string
  bank?: string
  bankBranch?: string
  bankAccount?: string
  bankAccountDigit?: string
}
