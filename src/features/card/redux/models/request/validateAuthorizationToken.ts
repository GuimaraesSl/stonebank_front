import { ApiRequest } from '_config/api'

export interface ValidateAuthorizationTokenRequest extends ApiRequest {
  code: string
  phoneNumber: string
}
