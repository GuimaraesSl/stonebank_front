import { ApiRequest } from '_config/api'

export interface BlockCardRequest extends ApiRequest {
  identifierCard: string
  pin: string
}
