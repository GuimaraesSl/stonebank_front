import {
  SmsTransferState,
  InitialSmsTransferState,
  LoadingSmsTransferState,
  SuccessSmsTransferState,
  FailSmsTransferState,
} from './state'
import { SmsTransferAction, SmsTransferActions } from './actionTypes'

const initialState: SmsTransferState = new InitialSmsTransferState()

export const smsTransferReducer = (
  state = initialState,
  action: SmsTransferAction,
) => {
  switch (action.type) {
    case SmsTransferActions.GET_ACCOUNTS_BY_PHONE_START:
    case SmsTransferActions.CREATE_SMS_TRANSFER_START:
      return new LoadingSmsTransferState(
        state.smsTransfer,
        state.favoredAccount,
      )

    case SmsTransferActions.GET_ACCOUNTS_BY_PHONE_SUCCESS:
      return new SuccessSmsTransferState(
        {
          ...state.smsTransfer,
          phoneNumber: action.payload.toPhoneNumber,
        },
        action.payload.account,
      )

    case SmsTransferActions.CREATE_SMS_TRANSFER_SUCCESS:
      return new SuccessSmsTransferState(state.smsTransfer)

    case SmsTransferActions.CREATE_SMS_TRANSFER_FAIL:
    case SmsTransferActions.GET_ACCOUNTS_BY_PHONE_FAIL:
      return new FailSmsTransferState(action.payload, state.smsTransfer)

    case SmsTransferActions.UPDATE_SMS_TRANSFER_DATA:
      if (!action.payload) return new InitialSmsTransferState(undefined)
      else
        return new InitialSmsTransferState(
          {
            ...state.smsTransfer,
            ...action.payload!,
          },
          state.favoredAccount,
        )

    default:
      return state
  }
}
