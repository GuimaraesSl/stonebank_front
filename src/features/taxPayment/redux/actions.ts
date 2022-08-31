import { Dispatch } from 'redux'
import { GetState } from 'redux/state'
import { ApiResponse } from '_config'
import { HttpClient } from '_config/http'
import { getBaseRequestData } from '_utils/http'
import {
  CloseAlertAction,
  CreateDarjPaymentFailAction,
  CreateDarjPaymentStartAction,
  CreateDarjPaymentSuccessAction,
  CreateFgtsPaymentFailAction,
  CreateFgtsPaymentStartAction,
  CreateFgtsPaymentSuccessAction,
  CreateGarePaymentFailAction,
  CreateGarePaymentStartAction,
  CreateGarePaymentSuccessAction,
  TaxPaymentActions,
  UpdateDarjPaymentDataAction,
  UpdateFgtsPaymentDataAction,
  UpdateGarePaymentDataAction,
} from './actionTypes'
import { Darj } from './models/darj'
import { Fgts } from './models/fgts'
import { Gare } from './models/gare'
import { createDarjPaymentRequest } from './models/request/createDarjPaymentRequest'
import { CreateFgtsPaymentRequest } from './models/request/createFgtsPaymentRequest'
import { CreateGarePaymentRequest } from './models/request/createGarePaymentRequest'
import { createDarjPaymentResponse } from './models/response/createDarjPaymentResponse'
import { CreateFgtsPaymentResponse } from './models/response/createFgtsPaymentResponse'
import { CreateGarePaymentResponse } from './models/response/createGarePaymentResponse'

export const updateGarePaymentData = (gare?: Gare) => (dispatch: Dispatch) => {
  dispatch<UpdateGarePaymentDataAction>({
    type: TaxPaymentActions.UPDATE_GARE_PAYMENT_DATA,
    payload: gare,
  })
}

export const createGarePayment =
  () => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<CreateGarePaymentStartAction>({
        type: TaxPaymentActions.CREATE_GARE_PAYMENT_START,
      })

      const state = getState()
      const garePaymentData = state.taxPayment.gare!

      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/TaxPayment/CreateGAREPayment', state)

      const data: CreateGarePaymentRequest = {
        accountId: accountId!,
        codeRevenue: garePaymentData?.codeRevenue!,
        activeDebit: garePaymentData?.activeDebit!,
        contributorTaxId: garePaymentData.contributorTaxId!,
        description: garePaymentData?.description!,
        dueDate: garePaymentData?.dueDate!,
        fineValue: garePaymentData?.fineValue!,
        interestValue: garePaymentData?.interestValue!,
        paymentDate: garePaymentData?.paymentDate!,
        principalValue: garePaymentData?.principalValue!,
        quoteNumberNotification: garePaymentData?.quoteNumberNotification!,
        rateValue: garePaymentData?.rateValue!,
        rateValueType: garePaymentData?.rateValueType!,
        referenceNumber: garePaymentData?.referenceNumber!,
        stateRegistration: garePaymentData?.stateRegistration!,
        tags: garePaymentData?.tags!,
        taxId: state.auth.user?.taxId!,
        totalValue: garePaymentData?.totalValue!,
        userId: userId!,
        GAREType: garePaymentData?.GAREType!,
      }

      await HttpClient.post<CreateGarePaymentResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreateGarePaymentSuccessAction>({
        type: TaxPaymentActions.CREATE_GARE_PAYMENT_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreateGarePaymentFailAction>({
        type: TaxPaymentActions.CREATE_GARE_PAYMENT_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const updateFgtsPaymentData = (fgts?: Fgts) => (dispatch: Dispatch) => {
  dispatch<UpdateFgtsPaymentDataAction>({
    type: TaxPaymentActions.UPDATE_FGTS_PAYMENT_DATA,
    payload: fgts,
  })
}

export const createFgtsPayment =
  () => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<CreateFgtsPaymentStartAction>({
        type: TaxPaymentActions.CREATE_FGTS_PAYMENT_START,
      })

      const state = getState()

      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/TaxPayment/CreateFGTSPayment', state)

      const data: CreateFgtsPaymentRequest = {
        accountId: accountId!,
        codeRevenue: state.taxPayment.fgts?.codeRevenue!,
        barcode: state.taxPayment.fgts?.barCode!,
        contributorTaxId: state.taxPayment.fgts?.contributorTaxId!,
        description: state.taxPayment.fgts?.description!,
        fgtsIdentifier: state.taxPayment.fgts?.fgtsIdentifier!,
        paymentDate: state.taxPayment.fgts?.paymentDate!,
        principalValue: state.taxPayment.fgts?.principalValue!,
        rateValueType: state.taxPayment.fgts?.rateValueType!,
        socialConnectivityCode: state.taxPayment.fgts?.socialConnectivityCode!,
        socialConnectivityDigit:
          state.taxPayment.fgts?.socialConnectivityDigit!,
        tags: state.taxPayment.fgts?.tags!,
        taxId: state.auth.user?.taxId!,
        userId: userId!,
      }

      await HttpClient.post<CreateFgtsPaymentResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreateFgtsPaymentSuccessAction>({
        type: TaxPaymentActions.CREATE_FGTS_PAYMENT_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreateFgtsPaymentFailAction>({
        type: TaxPaymentActions.CREATE_FGTS_PAYMENT_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const updateDarjPaymentData = (darj?: Darj) => (dispatch: Dispatch) => {
  dispatch<UpdateDarjPaymentDataAction>({
    type: TaxPaymentActions.UPDATE_DARJ_PAYMENT_DATA,
    payload: darj,
  })
}

export const createDarjPayment =
  () => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<CreateDarjPaymentStartAction>({
        type: TaxPaymentActions.CREATE_DARJ_PAYMENT_START,
      })

      const state = getState()
      const darj = state.taxPayment.darj!

      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/TaxPayment/CreateDARJPayment', state)

      const data: createDarjPaymentRequest = {
        accountId: accountId!,
        userId: userId!,
        contributorTaxId: darj.contributorTaxId!,
        referenceNumber: darj.referenceNumber!,
        principalValue: darj.principalValue!,
        fineValue: darj.fineValue!,
        interestValue: darj.interestValue!,
        monetaryValue: darj.monetaryValue!,
        totalValue: darj.totalValue!,
        rateValue: darj.rateValue!,
        dueDate: darj.dueDate!,
        paymentDate: darj.paymentDate!,
        tags: darj.tags!,
        codeRevenue: darj.codeRevenue!,
        stateRegistration: darj.stateRegistration!,
        originDocument: darj.originDocument!,
        rateValueType: darj.rateValueType!,
        description: darj.description!,
        taxId: state.auth.user?.taxId,
      }

      await HttpClient.post<createDarjPaymentResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreateDarjPaymentSuccessAction>({
        type: TaxPaymentActions.CREATE_DARJ_PAYMENT_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreateDarjPaymentFailAction>({
        type: TaxPaymentActions.CREATE_DARJ_PAYMENT_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const closeAlert = (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: TaxPaymentActions.CLOSE_ALERT,
  })
}
