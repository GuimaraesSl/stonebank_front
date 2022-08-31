import { ApiRequest } from '_config'
export interface CreateFgtsPaymentRequest extends ApiRequest {
  taxId: string
  contributorTaxId: string
  principalValue: number
  codeRevenue: string
  barcode: string
  fgtsIdentifier: string
  socialConnectivityCode: number
  socialConnectivityDigit: number
  paymentDate: Date
  tags: string[]
  rateValueType: number
  description: string
}
