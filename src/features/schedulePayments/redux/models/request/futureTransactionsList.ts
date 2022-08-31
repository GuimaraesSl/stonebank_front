import { ApiRequest } from '_config/api'

export interface FutureTransactionsListRequest extends ApiRequest {
  operationType?: number | null
  initialDate?: Date | string | number
  finalDate?: Date | string
  futureTransactionType?: number
}
