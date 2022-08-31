import { PixAction, PixActions } from './actionTypes'
import {
  PixState,
  InitialPixState,
  LoadingPixState,
  SuccessPixState,
  FailPixState,
} from './state'

const initialState: PixState = new InitialPixState()

export const pixReducer = (state = initialState, action: PixAction) => {
  switch (action.type) {
    case PixActions.FIND_PIX_KEY_LIST_START:
      return new LoadingPixState(
        undefined,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_PIX_KEY_LIST_SUCCESS:
      return new SuccessPixState(
        undefined,
        action.payload,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_PIX_KEY_LIST_FAIL:
      return new FailPixState(
        action.payload,
        undefined,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.RESEND_PIX_KEY_TOKEN_START:
      return new LoadingPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.RESEND_PIX_KEY_TOKEN_SUCCESS:
      return new SuccessPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        action.payload,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.RESEND_PIX_KEY_TOKEN_FAIL:
      return new FailPixState(
        action.payload,
        undefined,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CANCEL_PIX_KEY_START:
      return new LoadingPixState(
        state.pixKey,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CANCEL_PIX_KEY_SUCCESS:
      return new SuccessPixState(
        undefined,
        state.pixKeyList,
        undefined,
        action.payload,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CANCEL_PIX_KEY_FAIL:
      return new FailPixState(
        action.payload,
        undefined,
        state.pixKeyList,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CREATE_PIX_KEY_START:
      return new LoadingPixState(
        state.pixKey,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CREATE_PIX_KEY_SUCCESS:
      return new SuccessPixState(
        undefined,
        state.pixKeyList,
        action.payload,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CREATE_PIX_KEY_FAIL:
      return new FailPixState(
        action.payload,
        undefined,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CONFIRM_PIX_KEY_HOLD_START:
      return new LoadingPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CONFIRM_PIX_KEY_HOLD_SUCCESS:
      return new SuccessPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        action.payload,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CONFIRM_PIX_KEY_HOLD_FAIL:
      return new FailPixState(
        action.payload,
        undefined,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_PIX_KEY_INFO_START:
      return new LoadingPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_PIX_KEY_INFO_SUCCESS:
      return new SuccessPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        undefined,
        action.payload,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_PIX_KEY_INFO_FAIL:
      return new FailPixState(
        action.payload,
        undefined,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_PIX_QR_CODE_INFO_START:
      return new LoadingPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_PIX_QR_CODE_INFO_SUCCESS:
      return new SuccessPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        undefined,
        undefined,
        action.payload,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_PIX_QR_CODE_INFO_FAIL:
      return new FailPixState(
        action.payload,
        undefined,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.UPDATE_PIX_TRANSFER:
      return new SuccessPixState(
        undefined,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        state.pixKeyInfo,
        state.pixQrCodeInfo,
        action.payload,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CREATE_PIX_TRANSFER_START:
      return new LoadingPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        undefined,
        undefined,
        state.pixQrCodeInfo,
        state.pixTransfer,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CREATE_PIX_TRANSFER_SUCCESS:
      return new SuccessPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        state.pixTransfer,
        action.payload,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CREATE_PIX_TRANSFER_FAIL:
      return new FailPixState(
        action.payload,
        undefined,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        state.pixQrCodeInfo,
        state.pixTransfer,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_BANK_LIST_START:
      return new LoadingPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        undefined,
        undefined,
        state.pixQrCodeInfo,
        state.pixTransfer,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_BANK_LIST_SUCCESS:
      return new SuccessPixState(
        state.pixKey,
        state.pixKeyList,
        state.createPixKey,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        state.pixTransfer,
        undefined,
        action.payload,
        undefined,
        undefined,
      )

    case PixActions.FIND_BANK_LIST_FAIL:
      return new FailPixState(
        action.payload,
        undefined,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        state.pixQrCodeInfo,
        state.pixTransfer,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    //-----------------------------------------------------------------------------

    case PixActions.CREATE_STATIC_PIX_QR_CODE_START:
      return new LoadingPixState(
        state.pixKey,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.CREATE_STATIC_PIX_QR_CODE_SUCCESS:
      return new SuccessPixState(
        state.pixKey,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        action.payload,
      )

    case PixActions.CREATE_STATIC_PIX_QR_CODE_FAIL:
      return new FailPixState(
        action.payload,
        state.pixKey,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    //-----------------------------------------------------------------------------

    case PixActions.FIND_PIX_QR_CODE_START:
      return new LoadingPixState(
        state.pixKey,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_PIX_QR_CODE_SUCCESS:
      return new SuccessPixState(
        state.pixKey,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        action.payload,
        undefined,
      )

    case PixActions.FIND_PIX_QR_CODE_FAIL:
      return new FailPixState(
        action.payload,
        state.pixKey,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    //-----------------------------------------------------------------------------

    case PixActions.CLOSE_ALERT:
    case PixActions.UPDATE_PIX_STATE:
      return new InitialPixState(
        undefined,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.SELECT_PIX_KEY:
      return new SuccessPixState(
        action.payload,
        state.pixKeyList,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    //-----------------------------------------------------------------------------

    case PixActions.FIND_FAVORED_LIST_START:
      return new LoadingPixState(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    case PixActions.FIND_FAVORED_LIST_SUCCESS:
      return new SuccessPixState(
        state.pixKey,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        action.payload,
      )

    case PixActions.FIND_FAVORED_LIST_FAIL:
      return new FailPixState(
        action.payload,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )

    default:
      return state
  }
}
