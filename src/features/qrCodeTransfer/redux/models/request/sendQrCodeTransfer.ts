export interface SendQrCodeTransferRequest {
  accountId: number
  accountKey: string
  userId: number
  toTaxId: string
  transferValue: number
  transferDate: Date | null
  description: string
  tags: string[]
}
