import { ApiRequest } from '_config/api'
import { PixKeyType } from '../pixKeyType'

export interface ResendPixKeyTokenRequest extends ApiRequest {
  pixKey: string
  taxId?: string
  pixKeyType?: PixKeyType
}
