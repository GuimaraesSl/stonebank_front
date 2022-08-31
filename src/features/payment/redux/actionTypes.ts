import { PaymentData } from './models/paymentData'

export enum PaymentAction {
  GET_DETAILS_BY_NUMERIC_SEQUENCE_START = 'GET_DETAILS_BY_NUMERIC_SEQUENCE_START',
  GET_DETAILS_BY_NUMERIC_SEQUENCE_SUCCESS = 'GET_DETAILS_BY_NUMERIC_SEQUENCE_SUCCESS',
  GET_DETAILS_BY_NUMERIC_SEQUENCE_FAIL = 'GET_DETAILS_BY_NUMERIC_SEQUENCE_FAIL',

  VERIFY_IF_PAYMENT_CAN_BE_MADE_START = 'VERIFY_IF_PAYMENT_CAN_BE_MADE_START',
  VERIFY_IF_PAYMENT_CAN_BE_MADE_SUCCESS = 'VERIFY_IF_PAYMENT_CAN_BE_MADE_SUCCESS',
  VERIFY_IF_PAYMENT_CAN_BE_MADE_FAIL = 'VERIFY_IF_PAYMENT_CAN_BE_MADE_FAIL',

  CREATE_PAYMENT_START = 'CREATE_PAYMENT_START',
  CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS',
  CREATE_PAYMENT_FAIL = 'CREATE_PAYMENT_FAIL',

  UPDATE_PAYMENT = 'UPDATE_PAYMENT',
  CLOSE_ALERT = 'CLOSE_ALERT',
}

export interface GetDetailsByNumericSequenceStartAction {
  type: PaymentAction.GET_DETAILS_BY_NUMERIC_SEQUENCE_START
}

export interface GetDetailsByNumericSequenceSuccessAction {
  type: PaymentAction.GET_DETAILS_BY_NUMERIC_SEQUENCE_SUCCESS
  payload: PaymentData
}

export interface GetDetailsByNumericSequenceFailAction {
  type: PaymentAction.GET_DETAILS_BY_NUMERIC_SEQUENCE_FAIL
  payload: string
}

export interface CreatePaymentStartAction {
  type: PaymentAction.CREATE_PAYMENT_START
}

export interface CreatePaymentSuccessAction {
  type: PaymentAction.CREATE_PAYMENT_SUCCESS
  payload?: PaymentData
}

export interface CreatePaymentFailAction {
  type: PaymentAction.CREATE_PAYMENT_FAIL
  payload: string
}

export interface UpdatePaymentAction {
  type: PaymentAction.UPDATE_PAYMENT
  payload?: PaymentData
}

export interface CloseAlertAction {
  type: PaymentAction.CLOSE_ALERT
}

export type PaymentActions =
  | GetDetailsByNumericSequenceStartAction
  | GetDetailsByNumericSequenceSuccessAction
  | GetDetailsByNumericSequenceFailAction
  | CreatePaymentStartAction
  | CreatePaymentSuccessAction
  | CreatePaymentFailAction
  | UpdatePaymentAction
  | CloseAlertAction
