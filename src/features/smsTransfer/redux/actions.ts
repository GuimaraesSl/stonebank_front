import { Dispatch } from 'redux'
import { GetState } from 'redux/state'
import { ApiResponse } from '_config/api'
import { HttpClient } from '_config/http'
import { getBaseRequestData } from '_utils/http'
import {
  CreateSmsTransferStartAction,
  CreateSmsTransferSuccessAction,
  CreateSmsTransferFailAction,
  UpdateSmsTransferDataAction,
  CloseAlertAction,
  SmsTransferActions,
  GetAccountsByPhoneStartAction,
  GetAccountsByPhoneSuccessAction,
  GetAccountsByPhoneFailAction,
} from './actionTypes'
import {
  CreateSmsTransferRequest,
  CreatePendingSmsTransferRequest,
} from './models/request/createSmsTransfer'
import { CreateSmsTransferResponse } from './models/response/createSmsTransfer'
import { SmsTransfer } from './models/smsTransfer'
import { GetAccountsByPhoneRequest } from './models/request/getAccountsByPhone'
import { GetAccountsByPhoneResponse } from './models/response/getAccountsByPhone'

export const updateSmsTransferData =
  (smsTransfer?: SmsTransfer) => (dispatch: Dispatch) => {
    dispatch<UpdateSmsTransferDataAction>({
      type: SmsTransferActions.UPDATE_SMS_TRANSFER_DATA,
      payload: smsTransfer,
    })
  }

export const createSmsTransfer =
  () => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<CreateSmsTransferStartAction>({
        type: SmsTransferActions.CREATE_SMS_TRANSFER_START,
      })

      const state = getState()
      const { smsTransfer, favoredAccount } = state.smsTransfer!

      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/InternalTransfer', state)

      const data: CreateSmsTransferRequest = {
        accountId: accountId!,
        userId: userId!,
        toTaxId: favoredAccount?.taxId,
        transferValue: smsTransfer?.value,
        transferDate: new Date(Date.now()),
        bank: smsTransfer?.bank,
        bankBranch: smsTransfer?.bankBranch,
        bankAccount: smsTransfer?.bankAccount,
        bankAccountDigit: smsTransfer?.bankAccountDigit,
        tags: smsTransfer?.tags,
        description: smsTransfer?.description,
      }

      await HttpClient.post<CreateSmsTransferResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreateSmsTransferSuccessAction>({
        type: SmsTransferActions.CREATE_SMS_TRANSFER_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreateSmsTransferFailAction>({
        type: SmsTransferActions.CREATE_SMS_TRANSFER_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const createPendingSmsTransfer =
  () => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<CreateSmsTransferStartAction>({
        type: SmsTransferActions.CREATE_SMS_TRANSFER_START,
      })

      const state = getState()
      const smsTransferData: SmsTransfer = state.smsTransfer.smsTransfer!

      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData(
          '/InternalTransfer/CreatePendingInternalTransfer',
          state,
        )

      const data: CreatePendingSmsTransferRequest = {
        accountId: accountId!,
        userId: userId!,
        phoneNumber: smsTransferData.phoneNumber,
        value: smsTransferData.value,
      }

      await HttpClient.post<CreateSmsTransferResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreateSmsTransferSuccessAction>({
        type: SmsTransferActions.CREATE_SMS_TRANSFER_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreateSmsTransferFailAction>({
        type: SmsTransferActions.CREATE_SMS_TRANSFER_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const closeAlert = () => (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: SmsTransferActions.CLOSE_ALERT,
  })
}

export const getAccountsByPhone =
  (phoneNumber: string) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GetAccountsByPhoneStartAction>({
      type: SmsTransferActions.GET_ACCOUNTS_BY_PHONE_START,
    })
    try {
      const state = getState()

      const { token, url, defaultHeaders, accountId, userId } =
        await getBaseRequestData('/Account/FindAccountByPhoneNumber', state)

      const data: GetAccountsByPhoneRequest = {
        accountId: accountId!,
        userId: userId!,
        phoneNumber: phoneNumber,
      }

      const response = await HttpClient.post<GetAccountsByPhoneResponse>(
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
      dispatch<GetAccountsByPhoneSuccessAction>({
        type: SmsTransferActions.GET_ACCOUNTS_BY_PHONE_SUCCESS,
        payload: {
          account: responseData,
          toPhoneNumber: phoneNumber,
        },
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetAccountsByPhoneFailAction>({
        type: SmsTransferActions.GET_ACCOUNTS_BY_PHONE_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }
