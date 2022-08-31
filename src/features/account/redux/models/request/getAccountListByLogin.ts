import { ApiRequest } from '_config/api'

export interface GetAccountListByLoginRequest extends ApiRequest {
  login: string
}
