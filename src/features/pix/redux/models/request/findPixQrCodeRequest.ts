import { ApiRequest } from '_config/api'

export interface FindPixQrCodeRequest extends ApiRequest {
  taxId?: string
  externalIdentifier?: number
}
