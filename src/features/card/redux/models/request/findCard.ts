import { ApiRequest } from '_config/api'

export interface FindCardRequest extends ApiRequest {
  identifierCard?: string
}
