import { TaxPaymentAction, TaxPaymentActions } from './actionTypes'
import {
  FailTaxPaymentState,
  InitialTaxPaymentState,
  LoadingTaxPaymentState,
  SuccessTaxPaymentState,
  TaxPaymentState,
} from './state'

const initialState: TaxPaymentState = new InitialTaxPaymentState()

export const taxPaymentReducer = (
  state = initialState,
  action: TaxPaymentAction,
) => {
  switch (action.type) {
    case TaxPaymentActions.CREATE_GARE_PAYMENT_START:
    case TaxPaymentActions.CREATE_FGTS_PAYMENT_START:
    case TaxPaymentActions.CREATE_DARJ_PAYMENT_START:
      return new LoadingTaxPaymentState(state.gare, state.fgts, state.darj)

    case TaxPaymentActions.CREATE_GARE_PAYMENT_SUCCESS:
    case TaxPaymentActions.CREATE_FGTS_PAYMENT_SUCCESS:
    case TaxPaymentActions.CREATE_DARJ_PAYMENT_SUCCESS:
      return new SuccessTaxPaymentState(state.gare, state.fgts, state.darj)

    case TaxPaymentActions.CREATE_GARE_PAYMENT_FAIL:
    case TaxPaymentActions.CREATE_FGTS_PAYMENT_FAIL:
    case TaxPaymentActions.CREATE_DARJ_PAYMENT_FAIL:
      return new FailTaxPaymentState(
        action.payload,
        state.gare,
        state.fgts,
        state.darj,
      )

    case TaxPaymentActions.UPDATE_GARE_PAYMENT_DATA:
      if (!action.payload)
        return new InitialTaxPaymentState(undefined, state.fgts, state.darj)
      else
        return new InitialTaxPaymentState(
          {
            ...state.gare,
            ...action.payload!,
          },
          state.fgts,
          state.darj,
        )

    case TaxPaymentActions.UPDATE_FGTS_PAYMENT_DATA:
      if (!action.payload)
        return new InitialTaxPaymentState(state.gare, undefined, state.darj)
      else
        return new InitialTaxPaymentState(
          state.gare,
          {
            ...state.fgts,
            ...action.payload!,
          },
          state.darj,
        )

    case TaxPaymentActions.UPDATE_DARJ_PAYMENT_DATA:
      if (!action.payload)
        return new InitialTaxPaymentState(state.gare, state.fgts, undefined)
      else
        return new InitialTaxPaymentState(state.gare, state.fgts, {
          ...state.darj,
          ...action.payload!,
        })

    default:
      return state
  }
}
