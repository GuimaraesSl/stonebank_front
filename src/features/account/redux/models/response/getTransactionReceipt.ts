export interface GetTransactionReceiptResponse {
  value: number
  toName: string
  taxId: string
  date: Date
  description: string
  controlCode: string
  protocolCode: string
  receiptUrl: string
}
