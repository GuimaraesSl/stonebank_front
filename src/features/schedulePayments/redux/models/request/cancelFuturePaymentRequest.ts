import { ApiRequest } from '_config/api'

export interface CancelFuturePaymentsRequest extends ApiRequest {
  externalIdentifier?: number
  operationType?: number
}
