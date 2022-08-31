import {
  FutureTransactionsAction,
  FutureTransactionsActions,
} from './actionTypes'
import {
  FailFutureTransactionsState,
  FutureTransactionsState,
  InitialFutureTransactionsState,
  LoadingFutureTransactionsState,
  SuccessCancelTransactionsState,
  SuccessFutureTransactionsState,
  UpdateTransactions,
} from './state'

const initialState: FutureTransactionsState =
  new InitialFutureTransactionsState()

export const futureTransactionsReducer = (
  state = initialState,
  action: FutureTransactionsAction,
) => {
  switch (action.type) {
    case FutureTransactionsActions.CANCEL_TRANSACTIONS_START:
    case FutureTransactionsActions.FIND_FUTURE_TRANSACTIONS_LIST_START:
      return new LoadingFutureTransactionsState(
        state.futureTransactions,
        state.futureTransaction,
      )

    case FutureTransactionsActions.FIND_FUTURE_TRANSACTIONS_LIST_START:
      return new LoadingFutureTransactionsState(
        state.futureTransactions,
        state.futureTransaction,
      )
    case FutureTransactionsActions.FIND_FUTURE_TRANSACTIONS_LIST_SUCCESS:
      return new SuccessFutureTransactionsState(
        action.payload,
        state.futureTransaction,
      )

    case FutureTransactionsActions.CANCEL_TRANSACTIONS_SUCCESS:
      return new SuccessCancelTransactionsState({
        ...state.futureTransaction,
        success: action.payload,
      })

    case FutureTransactionsActions.UPDATE_TRANSACTIONS:
      return new UpdateTransactions({
        ...action.payload!,
      })

    case FutureTransactionsActions.CANCEL_TRANSACTIONS_FAIL:
    case FutureTransactionsActions.FIND_FUTURE_TRANSACTION_LIST_FAIL:
      return new FailFutureTransactionsState(action.payload)

    case FutureTransactionsActions.SELECT_TRANSACTIONS:
      return new SuccessFutureTransactionsState(
        state.futureTransactions!,
        action.payload,
      )

    default:
      return state
  }
}
