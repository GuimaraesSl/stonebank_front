import { Account } from '../account'
import { UiFunction } from '../uiFunction'

export interface GetAccountDashboardResponse {
  account: Account
  balance: number
  accounts: Account[]
  uiFunctions: UiFunction[]
}
