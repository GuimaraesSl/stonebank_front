import { PaymentAction, PaymentActions } from './actionTypes'

import {
  PaymentState,
  ErrorPaymentState,
  InitialPaymentState,
  LoadingPaymentState,
  SuccessPaymentState,
} from './state'

const initialState: PaymentState = new InitialPaymentState()

export const paymentReducer = (
  state = initialState,
  action: PaymentActions,
) => {
  switch (action.type) {
    case PaymentAction.GET_DETAILS_BY_NUMERIC_SEQUENCE_START:
    case PaymentAction.CREATE_PAYMENT_START:
      return new LoadingPaymentState(state.paymentData)

    case PaymentAction.GET_DETAILS_BY_NUMERIC_SEQUENCE_SUCCESS:
      return new SuccessPaymentState(action.payload)

    case PaymentAction.CREATE_PAYMENT_SUCCESS:
      return new SuccessPaymentState(action.payload)

    case PaymentAction.GET_DETAILS_BY_NUMERIC_SEQUENCE_FAIL:
    case PaymentAction.CREATE_PAYMENT_FAIL:
      return new ErrorPaymentState(action.payload, state.paymentData)

    case PaymentAction.UPDATE_PAYMENT:
      if (!action.payload) return new InitialPaymentState()

      return new InitialPaymentState({
        ...state.paymentData,
        ...action.payload,
      })

    default:
      return state
  }
}
