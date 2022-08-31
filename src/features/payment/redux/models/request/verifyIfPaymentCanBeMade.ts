import { ApiRequest } from '_config/api'

export interface VerifyIfPaymentCanBeMadeRequest extends ApiRequest {
  barcode?: string
}
