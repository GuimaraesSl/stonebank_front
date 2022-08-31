import { ApiRequest } from '_config/api'

export interface FindCardListRequest extends ApiRequest {
  taxId: string
}
