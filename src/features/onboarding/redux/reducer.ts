import { OnboardingAction, OnboardingActions } from './actionTypes'
import {
  FailOnboardingState,
  InitialOnboardingState,
  InitialValidateCardState,
  LoadingOnboardingState,
  OnboardingState,
  SuccessOnboardingState,
  SuccessVerifyCardState,
} from './state'

const initialState: OnboardingState = new InitialOnboardingState()

export const activateOnboardingReducer = (
  state = initialState,
  action: OnboardingAction,
) => {
  switch (action.type) {
    case OnboardingActions.UPDATE_ONBOARDING_FORM_DATA:
      if (!action.payload) return new InitialOnboardingState()
      else
        return new InitialOnboardingState(
          {
            ...state.onboardingForm,
            ...action.payload,
          },
          { ...state.validateCard },
        )

    case OnboardingActions.UPDATE_VALIDATE_CARD_FORM_DATA:
      if (!action.payload) return new InitialValidateCardState()
      else
        return new InitialValidateCardState({
          ...state.validateCard,
          ...action.payload!,
        })

    case OnboardingActions.VALIDATE_CARD_START:
    case OnboardingActions.CREATE_ACCOUNT_START:
    case OnboardingActions.VALIDATE_ACTIVATION_TOKEN_START:
    case OnboardingActions.GENERATE_AUTHORIZATION_TOKEN_START:
    case OnboardingActions.VALIDATE_AUTHORIZATION_TOKEN_START:
      return new LoadingOnboardingState(
        state.onboardingForm,
        state.validateCard,
      )

    case OnboardingActions.VALIDATE_CARD_SUCCESS:
      return new SuccessVerifyCardState({
        ...state.validateCard,
        isValid: action.payload,
      })

    case OnboardingActions.CREATE_ACCOUNT_SUCCESS:
      return new SuccessOnboardingState(state.onboardingForm)

    case OnboardingActions.VALIDATE_ACTIVATION_TOKEN_SUCCESS:
      return new InitialOnboardingState({
        ...state.onboardingForm,
        phoneNumber: action.payload.phoneNumber,
      })

    case OnboardingActions.GENERATE_AUTHORIZATION_TOKEN_SUCCESS:
      return new InitialOnboardingState(state.onboardingForm)

    case OnboardingActions.VALIDATE_AUTHORIZATION_TOKEN_SUCCESS:
      return new SuccessOnboardingState(state.onboardingForm)

    case OnboardingActions.CREATE_ACCOUNT_FAIL:
    case OnboardingActions.VALIDATE_ACTIVATION_TOKEN_FAIL:
    case OnboardingActions.GENERATE_AUTHORIZATION_TOKEN_FAIL:
    case OnboardingActions.VALIDATE_AUTHORIZATION_TOKEN_FAIL:
      return new FailOnboardingState(action.payload, state.onboardingForm)

    case OnboardingActions.VALIDATE_CARD_FAIL:
      return new SuccessVerifyCardState({
        ...state.validateCard,
        isValid: false,
      })

    case OnboardingActions.CLOSE_ALERT:
      return new InitialOnboardingState(state.onboardingForm)

    default:
      return state
  }
}
