import { ApiRequest } from '_config/api'

export interface unBlockCardRequest extends ApiRequest {
  identifierCard: string
  pin: string
}
