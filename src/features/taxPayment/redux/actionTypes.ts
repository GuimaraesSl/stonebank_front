import { Fgts } from './models/fgts'
import { Gare } from './models/gare'
import { Darj } from './models/darj'

export enum TaxPaymentActions {
  CREATE_GARE_PAYMENT_START = 'CREATE_GARE_PAYMENT_START',
  CREATE_GARE_PAYMENT_SUCCESS = 'CREATE_GARE_PAYMENT_SUCCESS',
  CREATE_GARE_PAYMENT_FAIL = 'CREATE_GARE_PAYMENT_FAIL',
  UPDATE_GARE_PAYMENT_DATA = 'CREATE_GARE_PAYMENT_DATA',

  CREATE_FGTS_PAYMENT_START = 'CREATE_FGTS_PAYMENT_START',
  CREATE_FGTS_PAYMENT_SUCCESS = 'CREATE_FGTS_PAYMENT_SUCCESS',
  CREATE_FGTS_PAYMENT_FAIL = 'CREATE_FGTS_PAYMENT_FAIL',
  UPDATE_FGTS_PAYMENT_DATA = ' CREATE_FGTS_PAYMENT_DATA',

  CREATE_DARJ_PAYMENT_START = 'CREATE_DARJ_PAYMENT_START',
  CREATE_DARJ_PAYMENT_SUCCESS = 'CREATE_DARJ_PAYMENT_SUCCESS',
  CREATE_DARJ_PAYMENT_FAIL = 'CREATE_DARJ_PAYMENT_FAIL',
  UPDATE_DARJ_PAYMENT_DATA = 'UPDATE_DARJ_PAYMENT_DATA',

  CLOSE_ALERT = 'CLOSE_ALERT',
}

export interface CreateGarePaymentStartAction {
  type: TaxPaymentActions.CREATE_GARE_PAYMENT_START
}

export interface CreateGarePaymentSuccessAction {
  type: TaxPaymentActions.CREATE_GARE_PAYMENT_SUCCESS
}

export interface CreateGarePaymentFailAction {
  type: TaxPaymentActions.CREATE_GARE_PAYMENT_FAIL
  payload: string
}

export interface UpdateGarePaymentDataAction {
  type: TaxPaymentActions.UPDATE_GARE_PAYMENT_DATA
  payload?: Gare
}

export interface CloseAlertAction {
  type: TaxPaymentActions.CLOSE_ALERT
}

export interface CreateFgtsPaymentStartAction {
  type: TaxPaymentActions.CREATE_FGTS_PAYMENT_START
}
export interface CreateFgtsPaymentSuccessAction {
  type: TaxPaymentActions.CREATE_FGTS_PAYMENT_SUCCESS
}
export interface CreateFgtsPaymentFailAction {
  type: TaxPaymentActions.CREATE_FGTS_PAYMENT_FAIL
  payload: string
}
export interface UpdateFgtsPaymentDataAction {
  type: TaxPaymentActions.UPDATE_FGTS_PAYMENT_DATA
  payload?: Fgts
}

export interface CreateDarjPaymentStartAction {
  type: TaxPaymentActions.CREATE_DARJ_PAYMENT_START
}

export interface CreateDarjPaymentSuccessAction {
  type: TaxPaymentActions.CREATE_DARJ_PAYMENT_SUCCESS
}

export interface CreateDarjPaymentFailAction {
  type: TaxPaymentActions.CREATE_DARJ_PAYMENT_FAIL
  payload: string
}

export interface UpdateDarjPaymentDataAction {
  type: TaxPaymentActions.UPDATE_DARJ_PAYMENT_DATA
  payload?: Darj
}

export interface CloseAlertAction {
  type: TaxPaymentActions.CLOSE_ALERT
}

export type TaxPaymentAction =
  | CreateGarePaymentStartAction
  | CreateGarePaymentSuccessAction
  | CreateGarePaymentFailAction
  | UpdateGarePaymentDataAction
  | CreateFgtsPaymentStartAction
  | CreateFgtsPaymentSuccessAction
  | CreateFgtsPaymentFailAction
  | UpdateFgtsPaymentDataAction
  | CreateDarjPaymentStartAction
  | CreateDarjPaymentSuccessAction
  | CreateDarjPaymentFailAction
  | UpdateDarjPaymentDataAction
  | CloseAlertAction
