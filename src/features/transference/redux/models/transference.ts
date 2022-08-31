import { Attachment } from './attachment'
import { AccountType, TransferType } from './enum'

export interface Transference {
  transferType?: TransferType
  transferValue?: number
  bank?: string
  transferDate?: Date | null
  expectedTransferDate?: Date
  toTaxId?: string
  toName?: string
  bankBranch?: string
  bankAccount?: string
  bankAccountDigit?: string
  accountType?: AccountType
  tags?: string[]
  description?: string
  attachments?: Attachment[]
}
