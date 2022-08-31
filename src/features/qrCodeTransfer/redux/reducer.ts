import { QrCodeTransferActions, QrCodeTransferValueAction } from './actionTypes'
import {
  FailQrCodeTransferState,
  InitialQrCodeTransferState,
  LoadingQrCodeTransferState,
  QrCodeTransferState,
  SuccessQrCodeTransferState,
} from './state'

const initialState: QrCodeTransferState = new InitialQrCodeTransferState()

export const QrCodeTransferReducer = (
  state = initialState,
  action: QrCodeTransferValueAction,
) => {
  switch (action.type) {
    case QrCodeTransferActions.GENERATE_QRCODE_TRANSFER_START:
    case QrCodeTransferActions.READ_QRCODE_TRANSFER_START:
    case QrCodeTransferActions.SEND_QRCODE_TRANSFER_START:
      return new LoadingQrCodeTransferState(state.transferenceData)

    case QrCodeTransferActions.GENERATE_QRCODE_TRANSFER_SUCCESS:
      return new SuccessQrCodeTransferState(
        state.transferenceData,
        action.payload.value,
        action.payload.qrCodeBase64,
      )

    case QrCodeTransferActions.READ_QRCODE_TRANSFER_SUCCESS:
      return new SuccessQrCodeTransferState(
        action.payload,
        state.valueToReceive,
        state.qrCodeBase64,
      )

    case QrCodeTransferActions.SEND_QRCODE_TRANSFER_SUCCESS:
      return new SuccessQrCodeTransferState(
        state.transferenceData,
        state.valueToReceive,
        state.qrCodeBase64,
      )

    case QrCodeTransferActions.GENERATE_QRCODE_TRANSFER_FAIL:
    case QrCodeTransferActions.READ_QRCODE_TRANSFER_FAIL:
    case QrCodeTransferActions.SEND_QRCODE_TRANSFER_FAIL:
    case QrCodeTransferActions.SET_ERROR:
      return new FailQrCodeTransferState(action.payload, state.transferenceData)

    case QrCodeTransferActions.UPDATE_STATE:
      return new InitialQrCodeTransferState(
        action.payload.transferenceData,
        action.payload.qrCodeBase64,
        action.payload.errorMessage,
        action.payload.loading,
      )

    case QrCodeTransferActions.CLOSE_ALERT:
      return new InitialQrCodeTransferState()

    default:
      return state
  }
}
