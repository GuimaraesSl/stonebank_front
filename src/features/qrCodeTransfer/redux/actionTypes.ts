import { TransferenceData } from './models/transferenceData'
import { QrCodeTransferState } from './state'

export enum QrCodeTransferActions {
  GENERATE_QRCODE_TRANSFER_START = 'GENERATE_QRCODE_TRANSFER_START',
  GENERATE_QRCODE_TRANSFER_SUCCESS = 'GENERATE_QRCODE_TRANSFER_SUCCESS',
  GENERATE_QRCODE_TRANSFER_FAIL = 'GENERATE_QRCODE_TRANSFER_FAIL',

  READ_QRCODE_TRANSFER_START = 'READ_QRCODE_TRANSFER_START',
  READ_QRCODE_TRANSFER_SUCCESS = 'READ_QRCODE_TRANSFER_SUCCESS',
  READ_QRCODE_TRANSFER_FAIL = 'READ_QRCODE_TRANSFER_FAIL',

  SEND_QRCODE_TRANSFER_START = 'SEND_QRCODE_TRANSFER_START',
  SEND_QRCODE_TRANSFER_SUCCESS = 'SEND_QRCODE_TRANSFER_SUCCESS',
  SEND_QRCODE_TRANSFER_FAIL = 'SEND_QRCODE_TRANSFER_FAIL',

  UPDATE_STATE = 'UPDATE_QRCODE_TRANSFER_STATE',
  SET_ERROR = 'SET_ERROR',
  CLOSE_ALERT = 'CLOSE_ALERT',
}

export interface GenerateQrCodeTransferStart {
  type: QrCodeTransferActions.GENERATE_QRCODE_TRANSFER_START
}

export interface GenerateQrCodeTransferSuccess {
  type: QrCodeTransferActions.GENERATE_QRCODE_TRANSFER_SUCCESS
  payload: {
    value: number
    qrCodeBase64: string
  }
}

export interface GenerateQrCodeTransferFail {
  type: QrCodeTransferActions.GENERATE_QRCODE_TRANSFER_FAIL
  payload?: string
}

export interface ReadQrCodeTransferStartAction {
  type: QrCodeTransferActions.READ_QRCODE_TRANSFER_START
}

export interface ReadQrCodeTransferSuccessAction {
  type: QrCodeTransferActions.READ_QRCODE_TRANSFER_SUCCESS
  payload: TransferenceData
}

export interface ReadQrCodeTransferFailAction {
  type: QrCodeTransferActions.READ_QRCODE_TRANSFER_FAIL
  payload: string
}

export interface SendQrCodeTransferStartAction {
  type: QrCodeTransferActions.SEND_QRCODE_TRANSFER_START
}

export interface SendQrCodeTransferSuccessAction {
  type: QrCodeTransferActions.SEND_QRCODE_TRANSFER_SUCCESS
}

export interface SendQrCodeTransferFailAction {
  type: QrCodeTransferActions.SEND_QRCODE_TRANSFER_FAIL
  payload: string
}

export interface UpdateQrCodeTransferStateAction {
  type: QrCodeTransferActions.UPDATE_STATE
  payload: QrCodeTransferState
}

export interface SetErrorAction {
  type: QrCodeTransferActions.SET_ERROR
  payload: string
}

export interface CloseAlertAction {
  type: QrCodeTransferActions.CLOSE_ALERT
}

export type QrCodeTransferValueAction =
  | GenerateQrCodeTransferStart
  | GenerateQrCodeTransferSuccess
  | GenerateQrCodeTransferFail
  | ReadQrCodeTransferStartAction
  | ReadQrCodeTransferSuccessAction
  | ReadQrCodeTransferFailAction
  | SendQrCodeTransferStartAction
  | SendQrCodeTransferSuccessAction
  | SendQrCodeTransferFailAction
  | UpdateQrCodeTransferStateAction
  | SetErrorAction
  | CloseAlertAction
