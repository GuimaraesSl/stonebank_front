import { Bank } from './models/bank'
import { Transference } from './models/transference'
import { Account } from './models/account'

export interface TransferenceState {
  transference?: Transference
  banks?: Bank[]
  favoredAccounts?: Account[]
  loading: boolean
  errorMessage?: string
}

export class InitialTransferenceState implements TransferenceState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public transference?: Transference,
    public banks?: Bank[],
    public favoredAccounts?: Account[],
  ) {}
}

export class LoadingTransferenceState implements TransferenceState {
  loading: boolean = true
  errorMessage?: string

  constructor(
    public transference: Transference | undefined,
    public banks?: Bank[],
    public favoredAccounts?: Account[],
  ) {}
}

export class SuccessTransferenceState implements TransferenceState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public transference: Transference | undefined,
    public banks?: Bank[],
    public favoredAccounts?: Account[],
  ) {}
}

export class FailTransferenceState implements TransferenceState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public transference: Transference | undefined,
    public banks: Bank[] | undefined,
    public favoredAccounts: Account[] | undefined,
  ) {}
}
