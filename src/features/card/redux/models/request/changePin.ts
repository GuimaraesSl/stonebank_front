import { ApiRequest } from '_config/api'

export interface ChangePinCardRequest extends ApiRequest {
  identifierCard?: string
  currentPin?: string
  pin?: string
  confirmationPin?: string
}
