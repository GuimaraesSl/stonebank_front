import { TopUpProductValueType, TopUpType } from './enum'

export interface TopUpProduct {
  productKey: string
  batchIdentifier: string
  productType: TopUpType
  productSubType: number
  productValueType: TopUpProductValueType
  productValue: number
  productMinValue: number
  productMaxValue: number
  description: string
}
