import { ApiRequest } from '_config/api'

export interface GetAccountsByTaxIdRequest extends ApiRequest {
  taxId: string
}
