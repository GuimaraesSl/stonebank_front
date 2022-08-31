import { OnboardingForm } from './models/onboardingForm'
import { ValidateCard } from './models/validateCard'
import { ValidateActivationTokenResponse } from './models/response/validateActivationToken'

export enum OnboardingActions {
  UPDATE_ONBOARDING_FORM_DATA = 'UPDATE_ONBOARDING_FORM_DATA',

  UPDATE_VALIDATE_CARD_FORM_DATA = 'UPDATE_VALIDATE_CARD_FORM_DATA',

  VALIDATE_CARD_START = 'VALIDATE_CARD_START',
  VALIDATE_CARD_SUCCESS = 'VALIDATE_CARD_SUCCESS',
  VALIDATE_CARD_FAIL = 'VALIDATE_CARD_FAIL',

  CREATE_ACCOUNT_START = 'CREATE_ACCOUNT_START',
  CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS',
  CREATE_ACCOUNT_FAIL = 'CREATE_ACCOUNT_FAIL',

  VALIDATE_ACTIVATION_TOKEN_START = 'VALIDATE_ACTIVATION_TOKEN_START',
  VALIDATE_ACTIVATION_TOKEN_SUCCESS = 'VALIDATE_ACTIVATION_TOKEN_SUCCESS',
  VALIDATE_ACTIVATION_TOKEN_FAIL = 'VALIDATE_ACTIVATION_TOKEN_FAIL',

  GENERATE_AUTHORIZATION_TOKEN_START = 'GENERATE_AUTHORIZATION_TOKEN_START',
  GENERATE_AUTHORIZATION_TOKEN_SUCCESS = 'GENERATE_AUTHORIZATION_TOKEN_SUCCESS',
  GENERATE_AUTHORIZATION_TOKEN_FAIL = 'GENERATE_AUTHORIZATION_TOKEN_FAIL',

  VALIDATE_AUTHORIZATION_TOKEN_START = 'VALIDATE_AUTHORIZATION_TOKEN_START',
  VALIDATE_AUTHORIZATION_TOKEN_SUCCESS = 'VALIDATE_AUTHORIZATION_TOKEN_SUCCESS',
  VALIDATE_AUTHORIZATION_TOKEN_FAIL = 'VALIDATE_AUTHORIZATION_TOKEN_FAIL',

  CLOSE_ALERT = 'CLOSE_ALERT',
}

export interface UpdateOnboardingFormDataAction {
  type: OnboardingActions.UPDATE_ONBOARDING_FORM_DATA
  payload?: OnboardingForm
}

export interface UpdateValidateCardFormDataAction {
  type: OnboardingActions.UPDATE_VALIDATE_CARD_FORM_DATA
  payload?: ValidateCard
}

export interface ValidateCardStartAction {
  type: OnboardingActions.VALIDATE_CARD_START
}

export interface ValidateCardSuccessAction {
  type: OnboardingActions.VALIDATE_CARD_SUCCESS
  payload: boolean
}

export interface ValidateCardFailAction {
  type: OnboardingActions.VALIDATE_CARD_FAIL
  payload: string
}

export interface CreateAccountStartAction {
  type: OnboardingActions.CREATE_ACCOUNT_START
}

export interface CreateAccountSuccessAction {
  type: OnboardingActions.CREATE_ACCOUNT_SUCCESS
}

export interface CreateAccountFailAction {
  type: OnboardingActions.CREATE_ACCOUNT_FAIL
  payload: string
}

export interface ValidateTokenStartAction {
  type: OnboardingActions.VALIDATE_ACTIVATION_TOKEN_START
}

export interface ValidateTokenSuccessAction {
  type: OnboardingActions.VALIDATE_ACTIVATION_TOKEN_SUCCESS
  payload: ValidateActivationTokenResponse
}

export interface ValidateTokenFailAction {
  type: OnboardingActions.VALIDATE_ACTIVATION_TOKEN_FAIL
  payload: string
}

export interface GenerateAuthorizationTokenStartAction {
  type: OnboardingActions.GENERATE_AUTHORIZATION_TOKEN_START
}

export interface GenerateAuthorizationTokenSuccessAction {
  type: OnboardingActions.GENERATE_AUTHORIZATION_TOKEN_SUCCESS
}

export interface GenerateAuthorizationTokenFailAction {
  type: OnboardingActions.GENERATE_AUTHORIZATION_TOKEN_FAIL
  payload: string
}

export interface ValidateAuthorizationTokenStartAction {
  type: OnboardingActions.VALIDATE_AUTHORIZATION_TOKEN_START
}

export interface ValidateAuthorizationTokenSuccessAction {
  type: OnboardingActions.VALIDATE_AUTHORIZATION_TOKEN_SUCCESS
}

export interface ValidateAuthorizationTokenFailAction {
  type: OnboardingActions.VALIDATE_AUTHORIZATION_TOKEN_FAIL
  payload: string
}

export interface CloseAlertAction {
  type: OnboardingActions.CLOSE_ALERT
}

export type OnboardingAction =
  | UpdateOnboardingFormDataAction
  | UpdateValidateCardFormDataAction
  | ValidateCardStartAction
  | ValidateCardSuccessAction
  | ValidateCardFailAction
  | CreateAccountStartAction
  | CreateAccountSuccessAction
  | CreateAccountFailAction
  | GenerateAuthorizationTokenStartAction
  | GenerateAuthorizationTokenSuccessAction
  | GenerateAuthorizationTokenFailAction
  | ValidateAuthorizationTokenStartAction
  | ValidateAuthorizationTokenSuccessAction
  | ValidateAuthorizationTokenFailAction
  | ValidateTokenStartAction
  | ValidateTokenSuccessAction
  | ValidateTokenFailAction
  | CloseAlertAction
