import { Account } from './account'
import { UiFunction } from './uiFunction'

export interface AccountDashboard {
  accounts: Account[]
  balance: number
  uiFunctions: UiFunction[]
}
