import { ApiRequest } from '_config/api'
import { TopUpType } from '../enum'

export interface GenerateTopUpRequest extends ApiRequest {
  productType?: TopUpType
  batchIdentifier: string
  productKey: string
  productValue: number
  contractIdentifier?: string
  originNSU: string
  tags: string[]
  periodicRepetition?: number
  topUpDate: Date
  isRecurrent: boolean
}
