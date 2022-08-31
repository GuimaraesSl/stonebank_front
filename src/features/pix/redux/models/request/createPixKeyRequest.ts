import { ApiRequest } from '_config/api'
import { PixKeyType } from '../pixKeyType'

export interface CreatePixKeyRequest extends ApiRequest {
  pixKey?: string
  pixKeyType?: PixKeyType
  taxId?: string
  spbBank?: string
  spbBankAccount?: string
  spbBankBranch?: string
  spbBankAccountDigit?: string
}
