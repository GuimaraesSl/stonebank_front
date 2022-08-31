import { PixKeyStatus } from './pixKeyStatus'

export interface PixKey {
  pixKeyValue?: string
  pixKeyType?: number
  status?: PixKeyStatus
  bank?: string
  bankBranch?: string
  bankAccount?: string
  bankAccountDigit?: string
}
