import { TopUpProduct } from '../topUpProduct'

export interface GetTopUpProductListByPhoneNumberResponse {
  originNSU: string
  topUpPhoneNumberList: TopUpProduct[]
}
