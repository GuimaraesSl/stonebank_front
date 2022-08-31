import { ApiRequest } from '_config/api'

export interface CancelCardRequest extends ApiRequest {
  identifierCard: string
}
