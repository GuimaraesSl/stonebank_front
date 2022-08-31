import { Dispatch } from 'redux'
import { v4 as uuid } from 'uuid'
import { getBaseRequestData } from '_utils/http'
import { GetState } from 'redux/state'
import {
  GenerateQrCodeTransferFail,
  GenerateQrCodeTransferStart,
  QrCodeTransferActions,
  GenerateQrCodeTransferSuccess,
  ReadQrCodeTransferStartAction,
  ReadQrCodeTransferSuccessAction,
  ReadQrCodeTransferFailAction,
  SetErrorAction,
  CloseAlertAction,
  UpdateQrCodeTransferStateAction,
  SendQrCodeTransferStartAction,
  SendQrCodeTransferSuccessAction,
  SendQrCodeTransferFailAction,
} from './actionTypes'
import { HttpClient } from '_config/http'
import { ReadQrCodeTransferResponse } from './models/response/readQrCodeTransfer'
import { ReadQrCodeTransferRequest } from './models/request/readQrCodeTransfer'
import { GenerateQrCodeTransferRequest } from './models/request/generateQrCodeTransfer'
import { ApiResponse } from '_config/api'
import { GenerateQrCodeTransferResponse } from './models/response/generateQrCodeTransferResponse'
import { QrCodeTransferState } from './state'
import { SendQrCodeTransferRequest } from './models/request/sendQrCodeTransfer'

export const generateQrCode =
  (value: number) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GenerateQrCodeTransferStart>({
      type: QrCodeTransferActions.GENERATE_QRCODE_TRANSFER_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData('/HashCode/GenerateHashCode', state)

      const data: GenerateQrCodeTransferRequest = {
        identifier: uuid(),
        value,
        userId: userId!,
        accountId: accountId!,
      }

      const response = await HttpClient.post<GenerateQrCodeTransferResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      dispatch<GenerateQrCodeTransferSuccess>({
        type: QrCodeTransferActions.GENERATE_QRCODE_TRANSFER_SUCCESS,
        payload: {
          value,
          qrCodeBase64: response.data.data.qrCodeBase64,
        },
      })
    } catch (error: any) {
      dispatch<GenerateQrCodeTransferFail>({
        type: QrCodeTransferActions.GENERATE_QRCODE_TRANSFER_FAIL,
        payload: error.message,
      })
    }
  }

export const readQrCode =
  (hashcode: string) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ReadQrCodeTransferStartAction>({
      type: QrCodeTransferActions.READ_QRCODE_TRANSFER_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/HashCode/ReadHashCode', state)

      const data: ReadQrCodeTransferRequest = {
        userId: userId!,
        accountId: accountId!,
        hashCode: hashcode,
      }

      const response = await HttpClient.post<ReadQrCodeTransferResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )
      dispatch<ReadQrCodeTransferSuccessAction>({
        type: QrCodeTransferActions.READ_QRCODE_TRANSFER_SUCCESS,
        payload: response.data.data,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<ReadQrCodeTransferFailAction>({
        type: QrCodeTransferActions.READ_QRCODE_TRANSFER_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const sendQrCodeTransfer =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<SendQrCodeTransferStartAction>({
      type: QrCodeTransferActions.SEND_QRCODE_TRANSFER_START,
    })

    try {
      const state = getState()
      const transferenceData = state.qrCodeTransfer.transferenceData!
      const { url, defaultHeaders, accountId, accountKey, userId, token } =
        await getBaseRequestData('/InternalTransfer', state)

      const data: SendQrCodeTransferRequest = {
        userId: userId!,
        accountId: accountId!,
        accountKey: accountKey!,
        toTaxId: transferenceData.accountTaxId,
        description: 'Transferência por QR Code',
        tags: ['QR Code'],
        transferDate: new Date(),
        transferValue: transferenceData.value,
      }

      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<SendQrCodeTransferSuccessAction>({
        type: QrCodeTransferActions.SEND_QRCODE_TRANSFER_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<SendQrCodeTransferFailAction>({
        type: QrCodeTransferActions.SEND_QRCODE_TRANSFER_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const updateQrCodeTransferState =
  (state: QrCodeTransferState) => (dispatch: Dispatch) => {
    dispatch<UpdateQrCodeTransferStateAction>({
      type: QrCodeTransferActions.UPDATE_STATE,
      payload: state,
    })
  }

export const setError = (message: string) => (dispatch: Dispatch) => {
  dispatch<SetErrorAction>({
    type: QrCodeTransferActions.SET_ERROR,
    payload: message,
  })
}

export const closeAlert = () => (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: QrCodeTransferActions.CLOSE_ALERT,
  })
}
