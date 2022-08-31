import { ApiRequest } from '_config/api'

export interface ReadQrCodeTransferRequest extends ApiRequest {
  hashCode: string
}
