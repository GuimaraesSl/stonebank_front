import { Attachment } from './attachments'

export interface CreatePaymentData {
  tags?: string[]
  paymentDate?: Date
  description?: string
  paymentValue?: number
  originalPaymentValue?: number
  barcode?: string
  minimumPaymentDate?: Date
  attachments?: Attachment[]
}
