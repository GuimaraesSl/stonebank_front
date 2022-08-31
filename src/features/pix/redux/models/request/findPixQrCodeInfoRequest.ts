import { ApiRequest } from '_config/api'

export interface FindPixQrCodeInfoRequest extends ApiRequest {
  hash?: string
  taxId?: string
}
