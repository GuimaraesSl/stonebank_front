import { FindFuturePaymentsList } from '../redux/models/futureTransactions'

export enum FutureTransactionsActions {
  FIND_FUTURE_TRANSACTIONS_LIST_START = 'FIND_FUTURE_TRANSACTIONS_LIST_START',
  FIND_FUTURE_TRANSACTIONS_LIST_SUCCESS = 'FIND_FUTURE_TRANSACTIONS_LIST_SUCCESS',
  FIND_FUTURE_TRANSACTION_LIST_FAIL = 'FIND_FUTURE_TRANSACTION_LIST_FAIL',
  CANCEL_TRANSACTIONS_START = 'CANCEL_TRANSACTIONS_START',
  CANCEL_TRANSACTIONS_SUCCESS = 'CANCEL_TRANSACTIONS_SUCCESS',
  CANCEL_TRANSACTIONS_FAIL = 'CANCEL_TRANSACTIONS_FAIL',

  UPDATE_TRANSACTIONS = 'UPDATE_TRANSACTIONS',

  SELECT_TRANSACTIONS = 'SELECT_TRANSACTIONS',
  CLOSE_ALERT = 'CLOSE_ALERT',
}

export interface FindFutureTransactionsListStartAction {
  type: FutureTransactionsActions.FIND_FUTURE_TRANSACTIONS_LIST_START
}

export interface FindFutureTransactionsListSuccessAction {
  type: FutureTransactionsActions.FIND_FUTURE_TRANSACTIONS_LIST_SUCCESS
  payload: FindFuturePaymentsList[]
}

export interface FindFutureTransactionsListFailAction {
  type: FutureTransactionsActions.FIND_FUTURE_TRANSACTION_LIST_FAIL
  payload: string
}

export interface CancelTransactionsStartAction {
  type: FutureTransactionsActions.CANCEL_TRANSACTIONS_START
}

export interface CancelFutureTransactionsSuccessAction {
  type: FutureTransactionsActions.CANCEL_TRANSACTIONS_SUCCESS
  payload: boolean
}

export interface CancelFutureTransactionsFailAction {
  type: FutureTransactionsActions.CANCEL_TRANSACTIONS_FAIL
  payload: string
}
export interface UpdateTransactionsAction {
  type: FutureTransactionsActions.UPDATE_TRANSACTIONS
  payload?: FindFuturePaymentsList
}

export interface CloseAlertAction {
  type: FutureTransactionsActions.CLOSE_ALERT
}

export interface SelectTransaction {
  type: FutureTransactionsActions.SELECT_TRANSACTIONS
  payload: FindFuturePaymentsList
}

export type FutureTransactionsAction =
  | FindFutureTransactionsListStartAction
  | FindFutureTransactionsListSuccessAction
  | FindFutureTransactionsListFailAction
  | CancelTransactionsStartAction
  | CancelFutureTransactionsSuccessAction
  | CancelFutureTransactionsFailAction
  | UpdateTransactionsAction
  | SelectTransaction
