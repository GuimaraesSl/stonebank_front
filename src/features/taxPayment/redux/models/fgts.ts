export interface Fgts {
  taxId?: string
  contributorTaxId?: string
  principalValue?: number
  codeRevenue?: string
  barCode?: string
  fgtsIdentifier?: string
  socialConnectivityCode?: number
  socialConnectivityDigit?: number
  paymentDate?: Date | null
  tags?: string[]
  rateValueType?: number
  description?: string
}
