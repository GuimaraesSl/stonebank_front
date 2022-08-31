export interface TransactionReceipt {
  value: number
  toName: string
  taxId: string
  date: Date | null
  description: string
  controlCode: string
  protocolCode: string
  receiptUrl: string
}
