import { DayTransactions } from '../dayTransactions'

export interface GetBankStatementResponse {
  transactions?: DayTransactions[]
}
