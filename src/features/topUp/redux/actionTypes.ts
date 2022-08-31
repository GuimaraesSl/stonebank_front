import { TopUp } from './models/topUp'
import { Product } from './models/product'
import { getTopUpPeriodic } from './actions'

export enum TopUpActions {
  UPDATE_TOP_UP_DATA = 'UPDATE_TOP_UP_DATA',

  GENERATE_TOP_UP_START = 'GENERATE_TOP_UP_START',
  GENERATE_TOP_UP_SUCCESS = 'GENERATE_TOP_UP_SUCCESS',
  GENERATE_TOP_UP_FAIL = 'GENERATE_TOP_UP_FAIL',

  GET_TOP_UP_PRODUCTS_START = 'GET_TOP_UP_PRODUCTS_START',
  GET_TOP_UP_PRODUCTS_SUCCESS = 'GET_TOP_UP_PRODUCTS_SUCCESS',
  GET_TOP_UP_PRODUCTS_FAIL = 'GET_TOP_UP_PRODUCTS_FAIL',

  GET_PERIODIC_TOP_UP_START = 'GET_PERIODIC_TOP_UP_START',
  GET_PERIODIC_TOP_UP_SUCCESS = 'GET_PERIODIC_TOP_UP_SUCCESS',
  GET_PERIODIC_TOP_UP_FAIL = 'GET_PERIODIC_TOP_UP_FAIL',

  CLOSE_ALERT = 'CLOSE_ALERT',
}

export interface UpdateTopUpDataAction {
  type: TopUpActions.UPDATE_TOP_UP_DATA
  payload?: TopUp
}

export interface GenerateTopUpStartAction {
  type: TopUpActions.GENERATE_TOP_UP_START
}

export interface GenerateTopUpSuccessAction {
  type: TopUpActions.GENERATE_TOP_UP_SUCCESS
}

export interface GenerateTopUpFailAction {
  type: TopUpActions.GENERATE_TOP_UP_FAIL
  payload: string
}

export interface GetTopUpProductsStartAction {
  type: TopUpActions.GET_TOP_UP_PRODUCTS_START
}

export interface GetTopUpProductsSuccessAction {
  type: TopUpActions.GET_TOP_UP_PRODUCTS_SUCCESS
  payload: Product
}

export interface GetTopUpProductsFailAction {
  type: TopUpActions.GET_TOP_UP_PRODUCTS_FAIL
  payload: string
}

export interface GetTopUpPeriodicStartAction {
  type: TopUpActions.GET_PERIODIC_TOP_UP_START
}

export interface GetTopUpPeriodicSuccessAction {
  type: TopUpActions.GET_PERIODIC_TOP_UP_SUCCESS
  payload: TopUp[]
}

export interface GetTopUpPeriodicFailAction {
  type: TopUpActions.GET_PERIODIC_TOP_UP_FAIL
  payload: string
}
export interface CloseAlertAction {
  type: TopUpActions.CLOSE_ALERT
}

export type TopUpAction =
  | UpdateTopUpDataAction
  | GenerateTopUpStartAction
  | GenerateTopUpSuccessAction
  | GenerateTopUpFailAction
  | GetTopUpProductsStartAction
  | GetTopUpProductsSuccessAction
  | GetTopUpProductsFailAction
  | GetTopUpPeriodicStartAction
  | GetTopUpPeriodicSuccessAction
  | GetTopUpPeriodicFailAction
  | CloseAlertAction
