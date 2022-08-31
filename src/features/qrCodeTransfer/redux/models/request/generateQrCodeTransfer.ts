import { ApiRequest } from '_config/api'

export interface GenerateQrCodeTransferRequest extends ApiRequest {
  identifier: string
  value: number
}
