import { OperationType } from './operationType'

export interface Transaction {
  title: string
  value: number
  stablishment: string
  externalIdentifier: string
  operationType: OperationType
  tags?: string[]
}
