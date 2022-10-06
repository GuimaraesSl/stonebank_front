import { Account } from "./models/account";
import { BankStatementFilters } from "./models/bankStatementFilters";
import { AccountDashboard } from "./models/dashboard";
import { DayTransactions } from "./models/dayTransactions";
import { TransactionDetails } from "./models/transactionDetails";
import { TransactionReceipt } from "./models/transactionReceipt";
import { VerifyTransaction } from "./models/verifyTransaction";
import { User } from "features/authentication/redux/models/user";

export interface AccountState {
  account?: Account;
  dashboard?: AccountDashboard;
  bankStatement?: DayTransactions[];
  bankStatementFilters?: BankStatementFilters;
  transactionDetails?: TransactionDetails;
  transactionReceipt?: TransactionReceipt;
  verifyTransaction?: VerifyTransaction;
  loading: boolean;
  errorMessage?: string;
  user?: User;
}

export class InitialAccountState implements AccountState {
  errorMessage?: string;
  transactionDetails?: TransactionDetails;
  transactionReceipt?: TransactionReceipt;
  loading: boolean = false;

  constructor(
    public account?: Account,
    public dashboard?: AccountDashboard,
    public bankStatement?: DayTransactions[],
    public bankStatementFilters?: BankStatementFilters
  ) {}
}

export class LoadingAccountState implements AccountState {
  loading: boolean = true;
  transactionDetails?: TransactionDetails;
  transactionReceipt?: TransactionReceipt;
  errorMessage?: string | undefined;

  constructor(
    public account: Account | undefined,
    public dashboard: AccountDashboard | undefined,
    public bankStatement: DayTransactions[] | undefined,
    public bankStatementFilters?: BankStatementFilters
  ) {}
}

export class SuccessAccountState implements AccountState {
  loading: boolean = false;
  errorMessage?: string;

  constructor(
    public account: Account,
    public dashboard: AccountDashboard,
    public bankStatement?: DayTransactions[],
    public transactionDetails?: TransactionDetails,
    public transactionReceipt?: TransactionReceipt,
    public bankStatementFilters?: BankStatementFilters,
    public verifyTransaction?: VerifyTransaction
  ) {}
}

export class FailAccountState implements AccountState {
  loading: boolean = false;

  constructor(
    public errorMessage: string,
    public account?: Account,
    public dashboard?: AccountDashboard,
    public bankStatement?: DayTransactions[],
    public bankStatementFilters?: BankStatementFilters
  ) {}
}

export interface TransferState {
  account?: Account;
  user?: User;
}
