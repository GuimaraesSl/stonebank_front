import { TopUpProduct } from './topUpProduct'

export interface Product {
  originNSU: string
  topUpPhoneNumberList: TopUpProduct[]
}
