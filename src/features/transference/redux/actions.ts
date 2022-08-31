import { Dispatch } from 'redux'
import { GetState } from 'redux/state'
import { ApiResponse } from '_config/api'
import { HttpClient } from '_config/http'
import { getBaseRequestData } from '_utils/http'
import {
  CreateInternalTransferFailAction,
  CreateInternalTransferStartAction,
  CreateInternalTransferSuccessAction,
  UpdateTransferenceDataAction,
  TransferenceActions,
  CreateMoneyTransferStartAction,
  CreateMoneyTransferSuccessAction,
  CreateMoneyTransferFailAction,
  CloseAlertAction,
  ListBanksStartAction,
  ListBanksSuccessAction,
  ListBanksFailAction,
  GetExpectedTransferDateStartAction,
  GetExpectedTransferDateSuccessAction,
  GetExpectedTransferDateFailAction,
  GetAccountsByTaxIdStartAction,
  GetAccountsByTaxIdSuccessAction,
  GetAccountsByTaxIdFailAction,
} from './actionTypes'
import { CreateInternalTransferRequest } from './models/request/createInternalTransfer'
import { CreateInternalTransferResponse } from './models/response/createInternalTransfer'
import { CreateMoneyTransferRequest } from './models/request/createMoneyTransfer'
import { CreateMoneyTransferResponse } from './models/response/createMoneyTransfer'
import { GetExpectedTransferDateRequest } from './models/request/getExpectedTransferDate'
import { GetExpectedTransferDateResponse } from './models/response/getExpectedTransferDate'
import { ListBanksRequest } from './models/request/listBanks'
import { ListBanksResponse } from './models/response/listBanks'
import { Transference } from './models/transference'
import { GetAccountsByTaxIdRequest } from './models/request/getAccountsByTaxId'
import { GetAccountsByTaxIdResponse } from './models/response/getAccountsByTaxId'

export const updateTransferenceData =
  (transference?: Transference) => (dispatch: Dispatch) => {
    dispatch<UpdateTransferenceDataAction>({
      type: TransferenceActions.UPDATE_TRANSFERENCE_DATA,
      payload: transference,
    })
  }

export const getExpectedTransferDate =
  (chosenDate?: Date | null) =>
  async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<GetExpectedTransferDateStartAction>({
        type: TransferenceActions.GET_EXPECTED_TRANSFER_DATE_START,
      })

      const state = getState()
      const { accountType, bank } = state.transference.transference!
      const { url, defaultHeaders, token, userId, accountId } =
        await getBaseRequestData(
          '/MoneyTransfer/FindExpectedTransferDate',
          state,
        )

      const data: GetExpectedTransferDateRequest = {
        accountId: accountId!,
        userId: userId!,
        accountType: accountType!.toString(),
        actualTransferDate: chosenDate ?? new Date(),
        bankCode: bank!,
        customFormatDate: true,
      }

      const response = await HttpClient.post<GetExpectedTransferDateResponse>(
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
      const expectedTransferDate = responseData.expectedTransferDate
        ? new Date(responseData.expectedTransferDate)
        : new Date()

      dispatch<GetExpectedTransferDateSuccessAction>({
        type: TransferenceActions.GET_EXPECTED_TRANSFER_DATE_SUCCESS,
        payload: expectedTransferDate,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetExpectedTransferDateFailAction>({
        type: TransferenceActions.GET_EXPECTED_TRANSFER_DATE_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const createInternalTransfer =
  () => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<CreateInternalTransferStartAction>({
        type: TransferenceActions.CREATE_INTERNAL_TRANSFER_START,
      })

      const state = getState()
      const transferData: Transference = state.transference.transference!

      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/InternalTransfer', state)

      const data: CreateInternalTransferRequest = {
        accountId: accountId!,
        userId: userId!,
        toTaxId: transferData.toTaxId,
        transferValue: transferData.transferValue,
        transferDate: transferData.transferDate,
        bank: transferData.bank,
        bankBranch: transferData.bankBranch,
        bankAccount: transferData.bankAccount,
        bankAccountDigit: transferData.bankAccountDigit,
        tags: transferData.tags,
        description: transferData.description,
        attachments: transferData.attachments,
      }

      await HttpClient.post<CreateInternalTransferResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreateInternalTransferSuccessAction>({
        type: TransferenceActions.CREATE_INTERNAL_TRANSFER_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreateInternalTransferFailAction>({
        type: TransferenceActions.CREATE_INTERNAL_TRANSFER_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const createMoneyTransfer =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CreateMoneyTransferStartAction>({
      type: TransferenceActions.CREATE_MONEY_TRANSFER_START,
    })

    try {
      const state = getState()
      const {
        transferValue,
        transferDate,
        toTaxId,
        toName,
        bank,
        bankBranch,
        bankAccount,
        bankAccountDigit,
        tags,
        description,
        attachments,
      } = state.transference.transference!
      const { url, defaultHeaders, token, userId, accountId } =
        await getBaseRequestData('/MoneyTransfer', state)

      const data: CreateMoneyTransferRequest = {
        accountId: accountId!,
        userId: userId!,
        transferValue: transferValue!,
        transferDate: transferDate!,
        toTaxId: toTaxId!,
        toName: toName!,
        toBank: bank!,
        toBankBranch: bankBranch!,
        toBankAccount: bankAccount!,
        toBankAccountDigit: bankAccountDigit!,
        tags,
        description,
        attachments: attachments!,
      }

      await HttpClient.post<CreateMoneyTransferResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreateMoneyTransferSuccessAction>({
        type: TransferenceActions.CREATE_MONEY_TRANSFER_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreateMoneyTransferFailAction>({
        type: TransferenceActions.CREATE_MONEY_TRANSFER_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const listBanks =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ListBanksStartAction>({
      type: TransferenceActions.LIST_BANKS_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Bank/FindBanks', state)

      const data: ListBanksRequest = {
        accountId: accountId!,
        userId: userId!,
      }

      const response = await HttpClient.post<ListBanksResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data.data
      responseData.banks = responseData.banks.filter(
        (v, i, a) => a.findIndex(t => t.code === v.code) === i,
      )

      dispatch<ListBanksSuccessAction>({
        type: TransferenceActions.LIST_BANKS_SUCCESS,
        payload: responseData.banks,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<ListBanksFailAction>({
        type: TransferenceActions.LIST_BANKS_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const closeAlert = () => (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: TransferenceActions.CLOSE_ALERT,
  })
}

export const getAccountsByTaxId =
  (taxId: string) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GetAccountsByTaxIdStartAction>({
      type: TransferenceActions.GET_ACCOUNTS_BY_TAX_ID_START,
    })
    try {
      const state = getState()

      const { url, defaultHeaders, accountId, userId } =
        await getBaseRequestData('/Account/FindAccountListByTaxId', state)

      const requestToken = state.auth.token

      const data: GetAccountsByTaxIdRequest = {
        accountId: accountId!,
        userId: userId!,
        taxId: taxId,
      }

      const response = await HttpClient.post<GetAccountsByTaxIdResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${requestToken}`,
          },
        },
      )

      const responseData = response.data.data
      dispatch<GetAccountsByTaxIdSuccessAction>({
        type: TransferenceActions.GET_ACCOUNTS_BY_TAX_ID_SUCCESS,
        payload: {
          accounts: responseData.accountList,
          toTaxId: taxId,
        },
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetAccountsByTaxIdFailAction>({
        type: TransferenceActions.GET_ACCOUNTS_BY_TAX_ID_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }
