import { OnboardingForm } from './models/onboardingForm'
import { ValidateCard } from './models/validateCard'

export interface OnboardingState {
  onboardingForm?: OnboardingForm
  validateCard?: ValidateCard
  errorMessage?: string
  loading: boolean
}

export class InitialOnboardingState implements OnboardingState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public onboardingForm?: OnboardingForm,
    public validateCard?: ValidateCard,
  ) {}
}

export class InitialValidateCardState implements OnboardingState {
  loading: boolean = false
  errorMessage?: string

  constructor(public validateCard?: ValidateCard) {}
}

export class LoadingOnboardingState implements OnboardingState {
  loading: boolean = true
  errorMessage?: string

  constructor(
    public onboardingForm: OnboardingForm | undefined,
    public validateCard: ValidateCard | undefined,
  ) {}
}

export class SuccessOnboardingState implements OnboardingState {
  loading: boolean = false
  errorMessage?: string

  constructor(public onboardingForm: OnboardingForm | undefined) {}
}

export class SuccessVerifyCardState implements OnboardingState {
  loading: boolean = false
  errorMessage?: string

  constructor(public validateCard?: ValidateCard) {}
}

export class FailOnboardingState implements OnboardingState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public onboardingForm: OnboardingForm | undefined,
  ) {}
}
