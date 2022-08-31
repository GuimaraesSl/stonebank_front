import { GAREType } from './enum'

export interface Gare {
  taxId?: string
  contributorTaxId?: string
  referenceNumber?: string
  principalValue?: number
  fineValue?: number
  interestValue?: number
  totalValue?: number
  rateValue?: number
  dueDate?: Date | null
  paymentDate?: Date | null
  tags?: string[]
  codeRevenue?: string
  stateRegistration?: string
  activeDebit?: string
  quoteNumberNotification?: string
  rateValueType?: number
  description?: string
  GAREType?: GAREType
}
