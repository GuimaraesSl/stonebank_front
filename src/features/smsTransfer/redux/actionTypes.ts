import { Account } from './models/account'
import { SmsTransfer } from './models/smsTransfer'

export enum SmsTransferActions {
  CREATE_SMS_TRANSFER_START = 'CREATE_SMS_TRANSFER_START',
  CREATE_SMS_TRANSFER_SUCCESS = 'CREATE_SMS_TRANSFER_SUCCESS',
  CREATE_SMS_TRANSFER_FAIL = 'CREATE_SMS_TRANSFER_FAIL',

  CREATE_MONEY_EXTERNAL_SMS_TRANSFER_START = 'CREATE_MONEY_EXTERNAL_TRANSFER_START',
  CREATE_MONEY_EXTERNAL_SMS_TRANSFER_SUCCESS = 'CREATE_MONEY_EXTERNAL_TRANSFER_SUCCESS',
  CREATE_MONEY_EXTERNAL_SMS_TRANSFER_FAIL = 'CREATE_MONEY_EXTERNAL_TRANSFER_FAIL',

  UPDATE_SMS_TRANSFER_DATA = 'UPDATE_SMS_TRANSFER_DATA',
  CLOSE_ALERT = 'CLOSE_ALERT',

  VALIDATE_AUTHORIZATION_TOKEN_START = 'VALIDATE_AUTHORIZATION_TOKEN_START',
  VALIDATE_AUTHORIZATION_TOKEN_LOADING = 'VALIDATE_AUTHORIZATION_TOKEN_LOADING',
  VALIDATE_AUTHORIZATION_TOKEN_SUCESS = 'VALIDATE_AUTHORIZATION_TOKEN_SUCESS',

  GET_ACCOUNTS_BY_PHONE_START = 'GET_ACCOUNTS_BY_PHONE_START',
  GET_ACCOUNTS_BY_PHONE_FAIL = 'GET_ACCOUNTS_BY_PHONE_FAIL',
  GET_ACCOUNTS_BY_PHONE_SUCCESS = 'GET_ACCOUNTS_BY_PHONE_SUCCESS',
}

export interface CreateSmsTransferStartAction {
  type: SmsTransferActions.CREATE_SMS_TRANSFER_START
}

export interface CreateSmsTransferSuccessAction {
  type: SmsTransferActions.CREATE_SMS_TRANSFER_SUCCESS
}

export interface CreateSmsTransferFailAction {
  type: SmsTransferActions.CREATE_SMS_TRANSFER_FAIL
  payload: string
}

export interface CreateMoneyExternalSmETransferStartAction {
  type: SmsTransferActions.CREATE_MONEY_EXTERNAL_SMS_TRANSFER_START
}

export interface CreateMoneyExternalSmTransferSuccessAction {
  type: SmsTransferActions.CREATE_MONEY_EXTERNAL_SMS_TRANSFER_SUCCESS
}

export interface CreateMoneyExternalSmsTransferFailAction {
  type: SmsTransferActions.CREATE_MONEY_EXTERNAL_SMS_TRANSFER_FAIL
  payload: string
}
export interface UpdateSmsTransferDataAction {
  type: SmsTransferActions.UPDATE_SMS_TRANSFER_DATA
  payload?: SmsTransfer
}

export interface CloseAlertAction {
  type: SmsTransferActions.CLOSE_ALERT
}
export interface GetAccountsByPhoneStartAction {
  type: SmsTransferActions.GET_ACCOUNTS_BY_PHONE_START
}

export interface GetAccountsByPhoneSuccessAction {
  type: SmsTransferActions.GET_ACCOUNTS_BY_PHONE_SUCCESS
  payload: {
    account: Account
    toPhoneNumber: string
  }
}

export interface GetAccountsByPhoneFailAction {
  type: SmsTransferActions.GET_ACCOUNTS_BY_PHONE_FAIL
  payload: string
}

export type SmsTransferAction =
  | CreateSmsTransferStartAction
  | CreateSmsTransferSuccessAction
  | CreateSmsTransferFailAction
  | CreateMoneyExternalSmETransferStartAction
  | CreateMoneyExternalSmTransferSuccessAction
  | CreateMoneyExternalSmsTransferFailAction
  | UpdateSmsTransferDataAction
  | GetAccountsByPhoneStartAction
  | GetAccountsByPhoneSuccessAction
  | GetAccountsByPhoneFailAction
  | CloseAlertAction
