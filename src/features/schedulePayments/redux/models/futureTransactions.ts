export interface FindFuturePaymentsList {
  principalValue?: number | bigint
  DocumentNumber?: number
  name?: string
  operationType?: number
  futureTransactionType?: FutureTransactionType
  typeDescription?: string
  paymentDate?: Date
  initialDate?: Date
  finalDate?: Date
  dueDate?: Date
  status?: number
  success?: boolean
}

export enum FutureTransactionType {
  Pay,
  Receive,
}
