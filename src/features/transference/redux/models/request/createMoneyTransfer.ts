import { ApiRequest } from '_config/api'
import { Attachment } from '../attachment'
export interface CreateMoneyTransferRequest extends ApiRequest {
  accountId: number
  transferValue: number
  transferDate: Date
  description?: string
  tags?: string[]
  toTaxId: string
  toName: string
  toBank: string
  toBankBranch: string
  toBankAccount: string
  toBankAccountDigit: string
  attachments?: Attachment[]
}
