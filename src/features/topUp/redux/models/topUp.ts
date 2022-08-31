import { TopUpProduct } from './topUpProduct'

export interface TopUp {
  phoneNumber?: string
  topUpDate?: Date
  originNSU?: string
  topUpProduct?: TopUpProduct
  tags?: string[]
  periodicRepetition?: number
  isRecurrent?: boolean
}
