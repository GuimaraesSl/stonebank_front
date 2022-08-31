import { ApiRequest } from '_config/api'

export interface ActivateCardRequest extends ApiRequest {
  identifierCard?: string
}
