import { PaymentData } from './models/paymentData'

export interface PaymentState {
  barcode?: string
  paymentData?: PaymentData
  loading: boolean
  errorMessage?: string
}
export class InitialPaymentState implements PaymentState {
  loading: boolean = false
  errorMessage?: string

  constructor(public paymentData?: PaymentData) {}
}

export class LoadingPaymentState implements PaymentState {
  loading: boolean = true
  errorMessage: undefined

  constructor(public paymentData?: PaymentData) {}
}

export class SuccessPaymentState implements PaymentState {
  loading: boolean = false
  errorMessage?: string

  constructor(public paymentData?: PaymentData) {}
}

export class ErrorPaymentState implements PaymentState {
  loading: boolean = false

  constructor(public errorMessage: string, public paymentData?: PaymentData) {}
}
