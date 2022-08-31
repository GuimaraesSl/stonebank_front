import { OperationType } from './operationType'
import { TransactionType } from './transactionType'

export interface BankStatementFilters {
  startDate?: Date
  endDate?: Date
  transactionType?: TransactionType
  tags?: string[]
  operationType?: OperationType
}
