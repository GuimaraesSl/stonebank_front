import { Dispatch } from 'redux'
import { GetState } from 'redux/state'
import { ApiResponse } from '_config/api'
import { HttpClient } from '_config/http'
import { getBaseRequestData } from '_utils/http'
import {
  FutureTransactionsActions,
  FindFutureTransactionsListStartAction,
  FindFutureTransactionsListSuccessAction,
  FindFutureTransactionsListFailAction,
  CloseAlertAction,
  UpdateTransactionsAction,
  SelectTransaction,
  CancelTransactionsStartAction,
  CancelFutureTransactionsSuccessAction,
  CancelFutureTransactionsFailAction,
} from './actionTypes'
import { FindFuturePaymentsList } from './models/futureTransactions'
import { FutureTransactionsListRequest } from './models/request/futureTransactionsList'
import { CancelFuturePaymentsRequest } from './models/request/cancelFuturePaymentRequest'
import { FutureTransactionsListResponse } from './models/response/futureTransactionsList'

export const getFutureTransactions =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindFutureTransactionsListStartAction>({
      type: FutureTransactionsActions.FIND_FUTURE_TRANSACTIONS_LIST_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, accountId, userId, token } =
        await getBaseRequestData(
          '/FutureTransactions/FindFutureTransactionsList',
          state,
        )

      const filters: FindFuturePaymentsList = Object.create(
        state.futureTransactions.futureTransaction ?? null,
      )

      if (!filters.finalDate) {
        filters.finalDate = new Date()
        filters.finalDate.setDate(filters.finalDate.getDate() + 30)
      }

      filters.initialDate = filters.initialDate ?? new Date()

      const futureTransaction: FindFuturePaymentsList =
        state.futureTransactions.futureTransaction!

      const data: FutureTransactionsListRequest = {
        accountId: accountId!,
        userId: userId!,
        operationType:
          futureTransaction?.operationType === 99
            ? null
            : futureTransaction?.operationType,
        futureTransactionType: filters.futureTransactionType,
        initialDate: filters.initialDate,
        finalDate: filters.finalDate,
      }

      const response = await HttpClient.post<FutureTransactionsListResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const responseData = response.data.data

      dispatch<FindFutureTransactionsListSuccessAction>({
        type: FutureTransactionsActions.FIND_FUTURE_TRANSACTIONS_LIST_SUCCESS,
        payload: responseData.transactions,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<FindFutureTransactionsListFailAction>({
        type: FutureTransactionsActions.FIND_FUTURE_TRANSACTION_LIST_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const closeAlert = () => (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: FutureTransactionsActions.CLOSE_ALERT,
  })
}

export const updateTransactions =
  (futureTransaction?: FindFuturePaymentsList) =>
  async (dispatch: Dispatch) => {
    dispatch<UpdateTransactionsAction>({
      type: FutureTransactionsActions.UPDATE_TRANSACTIONS,
      payload: futureTransaction,
    })
  }

export const selectPayment =
  (futureTransaction?: FindFuturePaymentsList) =>
  async (dispatch: Dispatch) => {
    dispatch<SelectTransaction>({
      type: FutureTransactionsActions.SELECT_TRANSACTIONS,
      payload: futureTransaction!,
    })
  }

export const getCancelPayments =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CancelTransactionsStartAction>({
      type: FutureTransactionsActions.CANCEL_TRANSACTIONS_START,
    })
    try {
      const state = getState()
      const { url, defaultHeaders, accountId, userId, token } =
        await getBaseRequestData(
          '/FutureTransactions/CancelFuturePayment',
          state,
        )

      const futureTransaction: FindFuturePaymentsList =
        state.futureTransactions.futureTransaction!

      const data: CancelFuturePaymentsRequest = {
        accountId: accountId!,
        userId: userId!,
        externalIdentifier: futureTransaction?.DocumentNumber,
        operationType: futureTransaction.operationType,
      }

      const response = await HttpClient.post<FutureTransactionsListResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const responseData = response.data.success

      dispatch<CancelFutureTransactionsSuccessAction>({
        type: FutureTransactionsActions.CANCEL_TRANSACTIONS_SUCCESS,
        payload: responseData,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CancelFutureTransactionsFailAction>({
        type: FutureTransactionsActions.CANCEL_TRANSACTIONS_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }
