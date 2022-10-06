import {
  AccountState,
  FailAccountState,
  InitialAccountState,
  LoadingAccountState,
  SuccessAccountState,
} from "./state";
import { AccountAction, AccountActions } from "./actionTypes";

const initialState: AccountState = new InitialAccountState();

export const accountReducer = (state = initialState, action: AccountAction) => {
  switch (action.type) {
    case AccountActions.GET_ACCOUNT_DASHBOARD_START:
    case AccountActions.GET_TRANSACTION_DETAILS_START:
    case AccountActions.GET_TRANSACTION_RECEIPT_START:
    case AccountActions.GET_ALL_ACCOUNTS_START:
    case AccountActions.GET_BANK_STATEMENT_START:
    case AccountActions.FIXED_ACCOUNT_START:
    case AccountActions.VERIFY_TRANSACTION_START:
      return new LoadingAccountState(
        state.account,
        state.dashboard,
        state.bankStatement,
        state.bankStatementFilters
      );

    case AccountActions.GET_ACCOUNT_DASHBOARD_SUCCESS:
      const { account, dashboard } = action.payload;
      return new SuccessAccountState(
        account,
        dashboard,
        state.bankStatement,
        state.transactionDetails,
        state.transactionReceipt,
        state.bankStatementFilters
      );

    case AccountActions.VERIFY_TRANSACTION_SUCCESS:
      return new SuccessAccountState(
        state.account!,
        state.dashboard!,
        state.bankStatement,
        state.transactionDetails,
        state.transactionReceipt,
        state.bankStatementFilters,
        action.payload
      );

    case AccountActions.GET_BANK_STATEMENT_SUCCESS:
      return new SuccessAccountState(
        state.account!,
        state.dashboard!,
        action.payload,
        state.transactionDetails,
        state.transactionReceipt,
        state.bankStatementFilters
      );

    case AccountActions.GET_ALL_ACCOUNTS_SUCCESS:
      return new SuccessAccountState(
        action.payload[0],
        { ...state.dashboard!, accounts: action.payload },
        state.bankStatement,
        state.transactionDetails,
        state.transactionReceipt,
        state.bankStatementFilters
      );

    case AccountActions.GET_TRANSACTION_DETAILS_SUCCESS:
      return new SuccessAccountState(
        state.account!,
        state.dashboard!,
        state.bankStatement!,
        action.payload,
        state.transactionReceipt,
        state.bankStatementFilters
      );

    case AccountActions.CHANGE_ACCOUNT_SUCCESS:
      return new SuccessAccountState(
        action.payload,
        state.dashboard!,
        state.bankStatement!,
        state.transactionDetails,
        state.transactionReceipt,
        state.bankStatementFilters
      );

    case AccountActions.GET_TRANSACTION_RECEIPT_SUCCESS:
      return new SuccessAccountState(
        state.account!,
        state.dashboard!,
        state.bankStatement!,
        state.transactionDetails,
        action.payload,
        state.bankStatementFilters
      );

    case AccountActions.GET_ACCOUNT_DASHBOARD_FAIL:
    case AccountActions.GET_BANK_STATEMENT_FAIL:
    case AccountActions.GET_TRANSACTION_DETAILS_FAIL:
    case AccountActions.GET_TRANSACTION_RECEIPT_FAIL:
    case AccountActions.VERIFY_TRANSACTION_FAIL:
      return new FailAccountState(
        action.payload,
        state.account,
        state.dashboard,
        state.bankStatement,
        state.bankStatementFilters
      );

    case AccountActions.SET_BANK_STATEMENT_FILTERS:
      return new InitialAccountState(
        state.account,
        state.dashboard,
        state.bankStatement,
        action.payload
      );

    case AccountActions.SELECT_ACCOUNT:
      return new InitialAccountState(
        state.dashboard!.accounts.find((x) => x.accountId === action.payload)!,
        state.dashboard,
        state.bankStatement,
        state.bankStatementFilters
      );

    case AccountActions.CLOSE_ALERT:
      return new InitialAccountState(
        state.account!,
        state.dashboard!,
        state.bankStatement,
        state.bankStatementFilters
      );

    default:
      return state;
  }
};
