import { ApiRequest } from '_config/api'

export interface GetTopUpProductListByPhoneNumberRequest extends ApiRequest {
  phoneNumber?: string
  productSubType?: number
}
