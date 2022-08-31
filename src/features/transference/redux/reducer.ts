import {
  TransferenceState,
  InitialTransferenceState,
  LoadingTransferenceState,
  SuccessTransferenceState,
  FailTransferenceState,
} from './state'
import { TransferenceAction, TransferenceActions } from './actionTypes'

const initialState: TransferenceState = new InitialTransferenceState()

export const transferenceReducer = (
  state = initialState,
  action: TransferenceAction,
) => {
  switch (action.type) {
    case TransferenceActions.CREATE_INTERNAL_TRANSFER_START:
    case TransferenceActions.CREATE_MONEY_TRANSFER_START:
    case TransferenceActions.LIST_BANKS_START:
    case TransferenceActions.GET_ACCOUNTS_BY_TAX_ID_START:
      return new LoadingTransferenceState(
        state.transference,
        state.banks,
        state.favoredAccounts,
      )

    case TransferenceActions.GET_EXPECTED_TRANSFER_DATE_START:
      return new LoadingTransferenceState({
        ...state.transference,
        expectedTransferDate: undefined,
      })

    case TransferenceActions.CREATE_INTERNAL_TRANSFER_SUCCESS:
      return new SuccessTransferenceState(state.transference)

    case TransferenceActions.CREATE_MONEY_TRANSFER_SUCCESS:
      return new SuccessTransferenceState(state.transference)

    case TransferenceActions.GET_ACCOUNTS_BY_TAX_ID_SUCCESS:
      return new SuccessTransferenceState(
        {
          ...state.transference,
          toTaxId: action.payload.toTaxId,
        },
        state.banks,
        action.payload.accounts,
      )

    case TransferenceActions.GET_EXPECTED_TRANSFER_DATE_SUCCESS:
      return new InitialTransferenceState(
        {
          ...state.transference,
          expectedTransferDate: action.payload,
        },
        state.banks,
      )

    case TransferenceActions.LIST_BANKS_SUCCESS:
      return new SuccessTransferenceState(state.transference, action.payload)

    case TransferenceActions.CREATE_INTERNAL_TRANSFER_FAIL:
    case TransferenceActions.CREATE_MONEY_TRANSFER_FAIL:
    case TransferenceActions.GET_EXPECTED_TRANSFER_DATE_FAIL:
    case TransferenceActions.GET_ACCOUNTS_BY_TAX_ID_FAIL:
    case TransferenceActions.LIST_BANKS_FAIL:
      return new FailTransferenceState(
        action.payload,
        state.transference,
        state.banks,
        state.favoredAccounts,
      )

    case TransferenceActions.UPDATE_TRANSFERENCE_DATA:
      if (!action.payload)
        return new InitialTransferenceState(undefined, state.banks)
      else
        return new InitialTransferenceState(
          {
            ...state.transference,
            ...action.payload!,
          },
          state.banks,
          state.favoredAccounts,
        )

    default:
      return state
  }
}
