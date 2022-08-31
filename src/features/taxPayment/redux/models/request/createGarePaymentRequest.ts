import { ApiRequest } from '_config'
import { GAREType } from '../enum'

export interface CreateGarePaymentRequest extends ApiRequest {
  taxId: string
  contributorTaxId: string
  referenceNumber: string
  principalValue: number
  fineValue: number
  interestValue: number
  totalValue: number
  rateValue: number
  dueDate: Date
  paymentDate: Date
  tags: string[]
  codeRevenue: string
  stateRegistration: string
  activeDebit: string
  quoteNumberNotification: string
  rateValueType: number
  description: string
  GAREType?: GAREType
}
