import { ApiRequest } from '_config/api'

export interface GetAccountsByPhoneRequest extends ApiRequest {
  phoneNumber: string
}
