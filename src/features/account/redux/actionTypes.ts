import { DayTransactions } from "./models/dayTransactions";
import { AccountDashboard } from "./models/dashboard";
import { Account } from "./models/account";
import { TransactionDetails } from "./models/transactionDetails";
import { TransactionReceipt } from "./models/transactionReceipt";
import { BankStatementFilters } from "./models/bankStatementFilters";
import { VerifyTransaction } from "./models/verifyTransaction";
export enum AccountActions {
  GET_ACCOUNT_DASHBOARD_START = "GET_ACCOUNT_DASHBOARD_START",
  GET_ACCOUNT_DASHBOARD_SUCCESS = "GET_ACCOUNT_DASHBOARD_SUCCESS",
  GET_ACCOUNT_DASHBOARD_FAIL = "GET_ACCOUNT_DASHBOARD_FAIL",

  GET_BANK_STATEMENT_START = "GET_BANK_STATEMENT_START",
  GET_BANK_STATEMENT_SUCCESS = "GET_BANK_STATEMENT_SUCCESS",
  GET_BANK_STATEMENT_FAIL = "GET_BANK_STATEMENT_FAIL",

  GET_TRANSACTION_DETAILS_START = "GET_TRANSACTION_DETAILS_START",
  GET_TRANSACTION_DETAILS_SUCCESS = "GET_TRANSACTION_DETAILS_SUCCESS",
  GET_TRANSACTION_DETAILS_FAIL = "GET_TRANSACTION_DETAILS_FAIL",
  GET_TRANSACTION_RECEIPT_START = "GET_TRANSACTION_RECEIPT_START",
  GET_TRANSACTION_RECEIPT_SUCCESS = "GET_TRANSACTION_RECEIPT_SUCCESS",
  GET_TRANSACTION_RECEIPT_FAIL = "GET_TRANSACTION_RECEIPT_FAIL",

  GET_ALL_ACCOUNTS_START = "GET_ALL_ACCOUNTS_START",
  GET_ALL_ACCOUNTS_SUCCESS = "GET_ALL_ACCOUNTS_SUCCESS",
  GET_ALL_ACCOUNTS_FAIL = "GET_ALL_ACCOUNTS_FAIL",

  SET_BANK_STATEMENT_FILTERS = "SET_BANK_STATEMENT_FILTERS",
  SELECT_ACCOUNT = "SELECT_ACCOUNT",
  CLOSE_ALERT = "CLOSE_ALERT",

  CHANGE_ACCOUNT_START = "CHANGE_ACCOUNT_START",
  CHANGE_ACCOUNT_SUCCESS = "CHANGE_ACCOUNT_SUCCESS",
  CHANGE_ACCOUNT_FAIL = "CHANGE_ACCOUNT_FAIL",

  FIXED_ACCOUNT_START = "FIXED_ACCOUNT_START",
  FIXED_ACCOUNT_SUCCESS = "FIXED_ACCOUNT_SUCCESS",
  FIXED_ACCOUNT_FAIL = "FIXED_ACCOUNT_FAIL",

  VERIFY_TRANSACTION_START = "VERIFY_TRANSACTION_START",
  VERIFY_TRANSACTION_SUCCESS = "VERIFY_TRANSACTION_SUCCESS",
  VERIFY_TRANSACTION_FAIL = "VERIFY_TRANSACTION_FAIL",
}
export interface GetAccountDashboardStartAction {
  type: AccountActions.GET_ACCOUNT_DASHBOARD_START;
}
export interface GetAccountDashboardSuccessAction {
  type: AccountActions.GET_ACCOUNT_DASHBOARD_SUCCESS;
  payload: {
    account: Account;
    dashboard: AccountDashboard;
  };
}
export interface GetAccountDashboardFailAction {
  type: AccountActions.GET_ACCOUNT_DASHBOARD_FAIL;
  payload: string;
}
export interface GetBankStatementStartAction {
  type: AccountActions.GET_BANK_STATEMENT_START;
}
export interface GetBankStatementSuccessAction {
  type: AccountActions.GET_BANK_STATEMENT_SUCCESS;
  payload?: DayTransactions[];
}
export interface GetBankStatementFailAction {
  type: AccountActions.GET_BANK_STATEMENT_FAIL;
  payload: string;
}
export interface GetTransactionDetailsStartAction {
  type: AccountActions.GET_TRANSACTION_DETAILS_START;
}
export interface GetTransactionDetailsSuccessAction {
  type: AccountActions.GET_TRANSACTION_DETAILS_SUCCESS;
  payload: TransactionDetails;
}
export interface GetTransactionDetailsFailAction {
  type: AccountActions.GET_TRANSACTION_DETAILS_FAIL;
  payload: string;
}
export interface GetTransactionReceiptStartAction {
  type: AccountActions.GET_TRANSACTION_RECEIPT_START;
}
export interface GetTransactionReceiptSuccessAction {
  type: AccountActions.GET_TRANSACTION_RECEIPT_SUCCESS;
  payload: TransactionReceipt;
}
export interface GetTransactionReceiptFailAction {
  type: AccountActions.GET_TRANSACTION_RECEIPT_FAIL;
  payload: string;
}
export interface GetAllAccountsStartAction {
  type: AccountActions.GET_ALL_ACCOUNTS_START;
}
export interface GetAllAccountsSuccessAction {
  type: AccountActions.GET_ALL_ACCOUNTS_SUCCESS;
  payload: Account[];
}
export interface GetAllAccountsFailAction {
  type: AccountActions.GET_ALL_ACCOUNTS_FAIL;
  payload: string;
}
export interface SetBankStatementFiltersAction {
  type: AccountActions.SET_BANK_STATEMENT_FILTERS;
  payload: BankStatementFilters;
}
export interface SelectAccountAction {
  type: AccountActions.SELECT_ACCOUNT;
  payload: number;
}
export interface CloseAlertAction {
  type: AccountActions.CLOSE_ALERT;
}
export interface ChangeAccountStartAction {
  type: AccountActions.CHANGE_ACCOUNT_START;
}
export interface ChangeAccountSuccessAction {
  type: AccountActions.CHANGE_ACCOUNT_SUCCESS;
  payload: Account;
}
export interface ChangeAccountFailAction {
  type: AccountActions.CHANGE_ACCOUNT_FAIL;
  payload: String;
}
export interface FixedAccountStartAction {
  type: AccountActions.FIXED_ACCOUNT_START;
}
export interface FixedAccountSuccessAction {
  type: AccountActions.FIXED_ACCOUNT_SUCCESS;
}
export interface FixedAccountFailAction {
  type: AccountActions.FIXED_ACCOUNT_FAIL;
  payload: String;
}

export interface VerifyTransactionStart {
  type: AccountActions.VERIFY_TRANSACTION_START;
}

export interface VerifyTransactionSuccess {
  type: AccountActions.VERIFY_TRANSACTION_SUCCESS;
  payload?: VerifyTransaction;
}

export interface VerifyTransactionFail {
  type: AccountActions.VERIFY_TRANSACTION_FAIL;
  payload: string;
}

export type AccountAction =
  | GetAccountDashboardStartAction
  | GetAccountDashboardSuccessAction
  | GetAccountDashboardFailAction
  | GetBankStatementStartAction
  | GetBankStatementSuccessAction
  | GetBankStatementFailAction
  | GetTransactionDetailsStartAction
  | GetTransactionDetailsSuccessAction
  | GetTransactionDetailsFailAction
  | GetTransactionReceiptStartAction
  | GetTransactionReceiptSuccessAction
  | GetTransactionReceiptFailAction
  | GetAllAccountsStartAction
  | GetAllAccountsSuccessAction
  | GetAllAccountsFailAction
  | SelectAccountAction
  | SetBankStatementFiltersAction
  | CloseAlertAction
  | ChangeAccountStartAction
  | ChangeAccountSuccessAction
  | ChangeAccountFailAction
  | FixedAccountStartAction
  | FixedAccountSuccessAction
  | FixedAccountFailAction
  | VerifyTransactionStart
  | VerifyTransactionSuccess
  | VerifyTransactionFail;
