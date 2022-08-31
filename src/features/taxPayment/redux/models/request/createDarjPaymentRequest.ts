import { ApiRequest } from '_config/api'

export interface createDarjPaymentRequest extends ApiRequest {
  taxId?: string
  contributorTaxId: string
  referenceNumber: string
  principalValue: number
  fineValue: number
  interestValue: number
  monetaryValue: number
  totalValue: number
  rateValue: number
  dueDate: Date
  paymentDate: Date
  tags: string[]
  codeRevenue: string
  stateRegistration: string
  originDocument: number
  rateValueType: number
  description: string
}
