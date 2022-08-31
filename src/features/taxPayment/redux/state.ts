import { Gare } from './models/gare'
import { Fgts } from './models/fgts'
import { Darj } from './models/darj'

export interface TaxPaymentState {
  gare?: Gare
  fgts?: Fgts
  darj?: Darj
  loading: boolean
  errorMessage?: string
}

export class InitialTaxPaymentState implements TaxPaymentState {
  loading: boolean = false
  errorMessage?: string

  constructor(public gare?: Gare, public fgts?: Fgts, public darj?: Darj) {}
}

export class LoadingTaxPaymentState implements TaxPaymentState {
  loading: boolean = true
  errorMessage?: string

  constructor(
    public gare: Gare | undefined,
    public fgts?: Fgts | undefined,
    public darj?: Darj | undefined,
  ) {}
}

export class SuccessTaxPaymentState implements TaxPaymentState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public gare: Gare | undefined,
    public fgts?: Fgts | undefined,
    public darj?: Darj | undefined,
  ) {}
}

export class FailTaxPaymentState implements TaxPaymentState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public gare: Gare | undefined,
    public fgts?: Fgts | undefined,
    public darj?: Darj | undefined,
  ) {}
}
