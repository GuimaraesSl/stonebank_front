import { ApiRequest } from '_config/api'
import { PixKeyType } from '../pixKeyType'

export interface CancelPixKeyRequest extends ApiRequest {
  pixKeyValue: string
  pixKeyType: PixKeyType
  taxId: string
  spbBank: string
  spbBankAccount: string
  spbBankBranch: string
  spbBankAccountDigit: string
}
