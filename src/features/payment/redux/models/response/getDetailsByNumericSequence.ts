import { Attachment } from '../attachments'
import { BoletoType } from '../boletoType'

export interface GetDetailsByNumericSequenceResponse {
  receiverTaxId?: string
  receiverName?: string
  payerTaxId?: string
  payerName?: string
  paymentValue?: number
  originalPaymentValue?: number
  dueDate?: Date
  discountValue?: number
  fineValue?: number
  tags?: string[]
  paymentDate?: Date
  description?: string
  type?: BoletoType
  bankName?: string
  bankCode?: string
  barcode: string
  concessionaireCode?: string
  concessionaireName?: string
  digitableLine?: string
  value?: number
  attachments?: Attachment[]
}
