import { FindFuturePaymentsList } from './models/futureTransactions'

export interface FutureTransactionsState {
  futureTransactions?: FindFuturePaymentsList[]
  futureTransaction?: FindFuturePaymentsList
  loading: boolean
  errorMessage?: string
}

export class InitialFutureTransactionsState implements FutureTransactionsState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public futureTransactions?: FindFuturePaymentsList[],
    public futureTransaction?: FindFuturePaymentsList,
  ) {}
}

export class UpdateTransactions implements FutureTransactionsState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public futureTransaction?: FindFuturePaymentsList,
    public futureTransactions?: FindFuturePaymentsList[],
  ) {}
}

export class LoadingFutureTransactionsState implements FutureTransactionsState {
  loading: boolean = true
  errorMessage?: string

  constructor(
    public futureTransactions?: FindFuturePaymentsList[],
    public futureTransaction?: FindFuturePaymentsList,
  ) {}
}

export class SuccessFutureTransactionsState implements FutureTransactionsState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public futureTransactions?: FindFuturePaymentsList[],
    public futureTransaction?: FindFuturePaymentsList,
  ) {}
}

export class SuccessCancelTransactionsState implements FutureTransactionsState {
  loading: boolean = false
  errorMessage?: string

  constructor(public futureTransaction?: FindFuturePaymentsList) {}
}

export class FailFutureTransactionsState implements FutureTransactionsState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public futureTransactions?: FindFuturePaymentsList[],
    public futureTransaction?: FindFuturePaymentsList,
  ) {}
}
