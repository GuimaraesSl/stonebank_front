import { UserInformation } from './models/UserInformation'

export enum UserInformationAction {
  GET_USER_INFORMATION_START = 'GET_USER_INFORMATION_START',
  GET_USER_INFORMATION_SUCCESS = 'GET_USER_INFORMATION_SUCCESS',
  GET_USER_INFORMATION_FAIL = 'GET_USER_INFORMATION_FAIL',

  UPDATE_USER_INFORMATION_START = 'UPDATE_USER_INFORMATION_START',
  UPDATE_USER_INFORMATION_SUCCESS = 'UPDATE_USER_INFORMATION_SUCCESS',
  UPDATE_USER_INFORMATION_FAIL = 'UPDATE_USER_INFORMATION_FAIL',

  CLOSE_ALERT = 'CLOSE_ALERT',
}

export interface GetUserInformationStartAction {
  type: UserInformationAction.GET_USER_INFORMATION_START
}

export interface GetUserInformationSuccessAction {
  type: UserInformationAction.GET_USER_INFORMATION_SUCCESS
  payload: UserInformation
}

export interface GetUserInformationFailAction {
  type: UserInformationAction.GET_USER_INFORMATION_FAIL
  payload: string
}

export interface UpdateUserInformationStartAction {
  type: UserInformationAction.UPDATE_USER_INFORMATION_START
}

export interface UpdateUserInformationSuccessAction {
  type: UserInformationAction.UPDATE_USER_INFORMATION_SUCCESS
}

export interface UpdateUserInformationFailAction {
  type: UserInformationAction.UPDATE_USER_INFORMATION_FAIL
  payload: string
}

export interface CloseAlertAction {
  type: UserInformationAction.CLOSE_ALERT
}

export type UserInformationActions =
  | GetUserInformationStartAction
  | GetUserInformationSuccessAction
  | GetUserInformationFailAction
  | UpdateUserInformationStartAction
  | UpdateUserInformationSuccessAction
  | UpdateUserInformationFailAction
  | CloseAlertAction
