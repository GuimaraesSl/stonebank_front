import { TopUp } from './models/topUp'
import { Product } from './models/product'

export interface TopUpState {
  scheduleTopUp?: boolean
  days?: string
  topUp?: TopUp
  topUpPhoneNumberList?: Product
  topUpPeriodicList?: any
  loading: boolean
  errorMessage?: string
}
export class InitialTopUpState implements TopUpState {
  loading: boolean = false
  errorMessage?: string

  constructor(public topUp?: TopUp, public topUpPhoneNumberList?: Product) {}
}

export class LoadingTopUpState implements TopUpState {
  loading: boolean = true
  errorMessage?: string

  constructor(
    public topUp: TopUp | undefined,
    public topUpPhoneNumberList?: Product,
  ) {}
}

export class SuccessTopUpState implements TopUpState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public topUp: TopUp | undefined,
    public topUpPhoneNumberList?: Product,
    public topUpPeriodicList?: TopUp[],
  ) {}
}

export class FailTopUpState implements TopUpState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public topUp: TopUp | undefined,
    public topUpPhoneNumberList: Product | undefined,
  ) {}
}
