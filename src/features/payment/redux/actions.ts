import { Dispatch } from 'redux'
import {
  PaymentAction,
  GetDetailsByNumericSequenceStartAction,
  GetDetailsByNumericSequenceSuccessAction,
  GetDetailsByNumericSequenceFailAction,
  CreatePaymentStartAction,
  CreatePaymentSuccessAction,
  CreatePaymentFailAction,
  UpdatePaymentAction,
  CloseAlertAction,
} from './actionTypes'
import { GetDetailsByNumericSequenceRequest } from './models/request/getDetailsByNumericSequence'
import { HttpClient } from '_config/http'
import { ApiResponse } from '_config/api'
import { getBaseRequestData } from '_utils/http'
import { GetState } from 'redux/state'
import { CreatePaymentRequest } from './models/request/createPayment'
import { CreatePaymentResponse } from './models/response/createPayment'
import { GetDetailsByNumericSequenceResponse } from './models/response/getDetailsByNumericSequence'
import { PaymentData } from './models/paymentData'

export const updatePaymentData =
  (paymentData?: PaymentData) => (dispatch: Dispatch) =>
    dispatch<UpdatePaymentAction>({
      type: PaymentAction.UPDATE_PAYMENT,
      payload: paymentData,
    })

export const getDetailsByNumericSequence =
  (barcode: string) => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<GetDetailsByNumericSequenceStartAction>({
        type: PaymentAction.GET_DETAILS_BY_NUMERIC_SEQUENCE_START,
      })

      const state = getState()

      const { url, defaultHeaders, accountId, token, accountTaxId, userId } =
        await getBaseRequestData('/BoletoPayment/FindBoletoInfo', state)

      const data: GetDetailsByNumericSequenceRequest = {
        accountId: accountId!,
        userId: userId!,
        taxId: accountTaxId,
        numericSequence: barcode,
      }

      const response =
        await HttpClient.post<GetDetailsByNumericSequenceResponse>(url, data, {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        })

      let barcodePaymentData = response.data.data

      barcodePaymentData.paymentDate = barcodePaymentData.paymentDate
        ? new Date(barcodePaymentData.paymentDate)
        : undefined

      barcodePaymentData.dueDate = barcodePaymentData.dueDate
        ? new Date(barcodePaymentData.dueDate)
        : undefined

      dispatch<GetDetailsByNumericSequenceSuccessAction>({
        type: PaymentAction.GET_DETAILS_BY_NUMERIC_SEQUENCE_SUCCESS,
        payload: barcodePaymentData,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GetDetailsByNumericSequenceFailAction>({
        type: PaymentAction.GET_DETAILS_BY_NUMERIC_SEQUENCE_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const createPayment =
  () => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<CreatePaymentStartAction>({
        type: PaymentAction.CREATE_PAYMENT_START,
      })

      const state = getState()
      const paymentState = state.payment
      const paymentData = paymentState.paymentData
      const { url, defaultHeaders, token, accountId, userId, accountTaxId } =
        await getBaseRequestData('/BoletoPayment', state)

      const data: CreatePaymentRequest = {
        userId: userId!,
        accountId: accountId!,
        name: state.account.account?.name,
        taxId: accountTaxId,
        receiverName: paymentData?.receiverName,
        receiverTaxId: paymentData?.receiverTaxId,
        payerName: paymentData?.payerName,
        payerTaxId: paymentData?.payerTaxId,
        barcode: paymentState.paymentData?.barcode,
        paymentValue: paymentData?.paymentValue,
        paymentDate: paymentData?.paymentDate,
        tags: paymentData?.tags,
        dueDate: paymentData?.dueDate,
        discountValue: paymentData?.discountValue,
        description: paymentData?.description,
        attachments: paymentData?.attachments!,
      }

      await HttpClient.post<CreatePaymentResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreatePaymentSuccessAction>({
        type: PaymentAction.CREATE_PAYMENT_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreatePaymentFailAction>({
        type: PaymentAction.CREATE_PAYMENT_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const closeAlert = () => (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: PaymentAction.CLOSE_ALERT,
  })
}
