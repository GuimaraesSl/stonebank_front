export interface Darj {
  taxId?: string
  contributorTaxId?: string
  referenceNumber?: string
  principalValue?: number
  fineValue?: number
  interestValue?: number
  monetaryValue?: number
  totalValue?: number
  rateValue?: number
  dueDate?: Date | null
  paymentDate?: Date | null
  tags?: string[]
  codeRevenue?: string
  stateRegistration?: string
  originDocument?: number
  rateValueType?: number
  description?: string
}
