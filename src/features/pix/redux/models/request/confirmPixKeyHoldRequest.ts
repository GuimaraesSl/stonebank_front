import { ApiRequest } from '_config/api'
import { PixKeyType } from '../pixKeyType'

export interface ConfirmPixKeyHoldRequest extends ApiRequest {
  pixKeyValue: string
  pixKeyType?: PixKeyType
  taxId?: string
  confirmationCode?: string
}
