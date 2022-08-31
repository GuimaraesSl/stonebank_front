import { AccountState, InitialAccountState } from 'features/account/redux/state'

import {
  InitialQrCodeTransferState,
  QrCodeTransferState,
} from 'features/qrCodeTransfer/redux/state'

import {
  AuthState,
  UnauthenticatedState,
} from '../features/authentication/redux/state'

import {
  InitialPaymentState,
  PaymentState,
} from '../features/payment/redux/state'

import {
  TransferenceState,
  InitialTransferenceState,
} from '../features/transference/redux/state'

import {
  InitialUserInformationState,
  UserInformationState,
} from 'features/user/redux/state'

import { CardState, InitialCardState } from 'features/card/redux/state'

import { InitialTagsState, TagsState } from 'features/tags/redux/state'

import {
  OnboardingState,
  InitialOnboardingState,
} from 'features/onboarding/redux/state'

import { InitialTopUpState, TopUpState } from 'features/topUp/redux/state'

import {
  InitialTaxPaymentState,
  TaxPaymentState,
} from 'features/taxPayment/redux/state'

import {
  InitialSmsTransferState,
  SmsTransferState,
} from 'features/smsTransfer/redux/state'

import {
  InitialFutureTransactionsState,
  FutureTransactionsState,
} from 'features/schedulePayments/redux/state'

import { InitialPixState, PixState } from 'features/pix/redux/state'

export interface StoreState {
  auth: AuthState
  account: AccountState
  userInformation: UserInformationState
  tags: TagsState
  payment: PaymentState
  qrCodeTransfer: QrCodeTransferState
  transference: TransferenceState
  card: CardState
  onboarding: OnboardingState
  topUp: TopUpState
  taxPayment: TaxPaymentState
  smsTransfer: SmsTransferState
  futureTransactions: FutureTransactionsState
  pix: PixState
}

export const initialStoreState: StoreState = {
  auth: new UnauthenticatedState(),
  account: new InitialAccountState(),
  userInformation: new InitialUserInformationState(),
  tags: new InitialTagsState(),
  payment: new InitialPaymentState(),
  qrCodeTransfer: new InitialQrCodeTransferState(),
  transference: new InitialTransferenceState(),
  card: new InitialCardState(),
  onboarding: new InitialOnboardingState(),
  topUp: new InitialTopUpState(),
  taxPayment: new InitialTaxPaymentState(),
  smsTransfer: new InitialSmsTransferState(),
  futureTransactions: new InitialFutureTransactionsState(),
  pix: new InitialPixState(),
}

export type GetState = () => StoreState
