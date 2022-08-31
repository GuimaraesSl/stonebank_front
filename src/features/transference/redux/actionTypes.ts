import { Account } from './models/account'
import { Transference } from './models/transference'
import { Bank } from './models/bank'

export enum TransferenceActions {
  CREATE_INTERNAL_TRANSFER_START = 'CREATE_INTERNAL_TRANSFER_START',
  CREATE_INTERNAL_TRANSFER_SUCCESS = 'CREATE_INTERNAL_TRANSFER_SUCCESS',
  CREATE_INTERNAL_TRANSFER_FAIL = 'CREATE_INTERNAL_TRANSFER_FAIL',

  CREATE_MONEY_TRANSFER_START = 'CREATE_MONEY_TRANSFER_START',
  CREATE_MONEY_TRANSFER_SUCCESS = 'CREATE_MONEY_TRANSFER_SUCCESS',
  CREATE_MONEY_TRANSFER_FAIL = 'CREATE_MONEY_TRANSFER_FAIL',

  LIST_BANKS_START = 'LIST_BANKS_START',
  LIST_BANKS_SUCCESS = 'LIST_BANKS_SUCCESS',
  LIST_BANKS_FAIL = 'LIST_BANKS_FAIL',

  GET_EXPECTED_TRANSFER_DATE_START = 'GET_EXPECTED_TRANSFER_DATE_START',
  GET_EXPECTED_TRANSFER_DATE_SUCCESS = 'GET_EXPECTED_TRANSFER_DATE_SUCCESS',
  GET_EXPECTED_TRANSFER_DATE_FAIL = 'GET_EXPECTED_TRANSFER_DATE_FAIL',

  UPDATE_TRANSFERENCE_DATA = 'UPDATE_TRANSFERENCE_DATA',
  CLOSE_ALERT = 'CLOSE_ALERT',

  VALIDATE_AUTHORIZATION_TOKEN_START = 'VALIDATE_AUTHORIZATION_TOKEN_START',
  VALIDATE_AUTHORIZATION_TOKEN_LOADING = 'VALIDATE_AUTHORIZATION_TOKEN_LOADING',
  VALIDATE_AUTHORIZATION_TOKEN_SUCESS = 'VALIDATE_AUTHORIZATION_TOKEN_SUCESS',

  GET_ACCOUNTS_BY_TAX_ID_START = 'GET_ACCOUNTS_BY_TAX_ID_START',
  GET_ACCOUNTS_BY_TAX_ID_FAIL = 'GET_ACCOUNTS_BY_TAX_ID_FAIL',
  GET_ACCOUNTS_BY_TAX_ID_SUCCESS = 'GET_ACCOUNTS_BY_TAX_ID_SUCCESS',
}

export interface CreateInternalTransferStartAction {
  type: TransferenceActions.CREATE_INTERNAL_TRANSFER_START
}

export interface CreateInternalTransferSuccessAction {
  type: TransferenceActions.CREATE_INTERNAL_TRANSFER_SUCCESS
}

export interface CreateInternalTransferFailAction {
  type: TransferenceActions.CREATE_INTERNAL_TRANSFER_FAIL
  payload: string
}

export interface CreateMoneyTransferStartAction {
  type: TransferenceActions.CREATE_MONEY_TRANSFER_START
}

export interface CreateMoneyTransferSuccessAction {
  type: TransferenceActions.CREATE_MONEY_TRANSFER_SUCCESS
}

export interface CreateMoneyTransferFailAction {
  type: TransferenceActions.CREATE_MONEY_TRANSFER_FAIL
  payload: string
}

export interface ListBanksStartAction {
  type: TransferenceActions.LIST_BANKS_START
}

export interface ListBanksSuccessAction {
  type: TransferenceActions.LIST_BANKS_SUCCESS
  payload: Bank[]
}

export interface ListBanksFailAction {
  type: TransferenceActions.LIST_BANKS_FAIL
  payload: string
}

export interface GetExpectedTransferDateStartAction {
  type: TransferenceActions.GET_EXPECTED_TRANSFER_DATE_START
}

export interface GetExpectedTransferDateSuccessAction {
  type: TransferenceActions.GET_EXPECTED_TRANSFER_DATE_SUCCESS
  payload: Date
}

export interface GetExpectedTransferDateFailAction {
  type: TransferenceActions.GET_EXPECTED_TRANSFER_DATE_FAIL
  payload: string
}

export interface GetAccountsByTaxIdStartAction {
  type: TransferenceActions.GET_ACCOUNTS_BY_TAX_ID_START
}

export interface GetAccountsByTaxIdSuccessAction {
  type: TransferenceActions.GET_ACCOUNTS_BY_TAX_ID_SUCCESS
  payload: {
    accounts: Account[]
    toTaxId: string
  }
}

export interface GetAccountsByTaxIdFailAction {
  type: TransferenceActions.GET_ACCOUNTS_BY_TAX_ID_FAIL
  payload: string
}

export interface UpdateTransferenceDataAction {
  type: TransferenceActions.UPDATE_TRANSFERENCE_DATA
  payload?: Transference
}

export interface CloseAlertAction {
  type: TransferenceActions.CLOSE_ALERT
}

export type TransferenceAction =
  | CreateInternalTransferStartAction
  | CreateInternalTransferSuccessAction
  | CreateInternalTransferFailAction
  | CreateMoneyTransferStartAction
  | CreateMoneyTransferSuccessAction
  | CreateMoneyTransferFailAction
  | ListBanksStartAction
  | ListBanksSuccessAction
  | ListBanksFailAction
  | GetExpectedTransferDateStartAction
  | GetExpectedTransferDateSuccessAction
  | GetExpectedTransferDateFailAction
  | GetAccountsByTaxIdStartAction
  | GetAccountsByTaxIdSuccessAction
  | GetAccountsByTaxIdFailAction
  | UpdateTransferenceDataAction
  | CloseAlertAction
