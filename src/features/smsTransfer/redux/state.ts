import { StoreState } from 'redux/state'
import { Account } from './models/account'
import { SmsTransfer } from './models/smsTransfer'

export interface SmsTransferState {
  smsTransfer?: SmsTransfer
  loading: boolean
  errorMessage?: string
  storeState?: StoreState
  favoredAccount?: Account
}

export class InitialSmsTransferState implements SmsTransferState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public smsTransfer?: SmsTransfer,
    public favoredAccount?: Account,
  ) {}
}

export class LoadingSmsTransferState implements SmsTransferState {
  loading: boolean = true
  errorMessage?: string

  constructor(
    public smsTransfer: SmsTransfer | undefined,
    public favoredAccount?: Account,
  ) {}
}

export class SuccessSmsTransferState implements SmsTransferState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public smsTransfer: SmsTransfer | undefined,
    public favoredAccount?: Account,
  ) {}
}

export class FailSmsTransferState implements SmsTransferState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public smsTransfer: SmsTransfer | undefined,
    public favoredAccount?: Account,
  ) {}
}
