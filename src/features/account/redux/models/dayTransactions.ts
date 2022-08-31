import { Transaction } from './transaction'

export interface DayTransactions {
  balance: number
  day: number
  month: string
  transactions?: Transaction[]
}
