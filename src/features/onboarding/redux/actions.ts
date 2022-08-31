import { Dispatch } from 'redux'
import { GetState } from 'redux/state'
import { ApiResponse } from '_config/api'
import { HttpClient } from '_config/http'
import { getBaseRequestData } from '_utils/http'
import {
  CloseAlertAction,
  CreateAccountFailAction,
  CreateAccountStartAction,
  CreateAccountSuccessAction,
  GenerateAuthorizationTokenFailAction,
  GenerateAuthorizationTokenStartAction,
  GenerateAuthorizationTokenSuccessAction,
  OnboardingActions,
  UpdateValidateCardFormDataAction,
  UpdateOnboardingFormDataAction,
  ValidateCardFailAction,
  ValidateCardStartAction,
  ValidateCardSuccessAction,
  ValidateAuthorizationTokenFailAction,
  ValidateAuthorizationTokenStartAction,
  ValidateAuthorizationTokenSuccessAction,
  ValidateTokenFailAction,
  ValidateTokenStartAction,
  ValidateTokenSuccessAction,
} from './actionTypes'
import { CreateAccountRequest } from './models/request/createAccountRequest'
import { ValidateCardRequest } from './models/request/validateCardRequest'
import { GenerateAuthorizationTokenRequest } from './models/request/generateAuthorizationToken'
import { ValidateAuthorizationTokenRequest } from './models/request/validateAuthorizationToken'
import { ValidateTokenRequest } from './models/request/validateActivationToken'
import { ValidateActivationTokenResponse } from './models/response/validateActivationToken'
import { OnboardingForm } from './models/onboardingForm'
import { ValidateCard } from './models/validateCard'

export const updateOnboardingForm =
  (data?: OnboardingForm) => (dispatch: Dispatch) => {
    dispatch<UpdateOnboardingFormDataAction>({
      type: OnboardingActions.UPDATE_ONBOARDING_FORM_DATA,
      payload: data,
    })
  }

export const updateValidateCardForm =
  (data?: ValidateCard) => async (dispatch: Dispatch) => {
    dispatch<UpdateValidateCardFormDataAction>({
      type: OnboardingActions.UPDATE_VALIDATE_CARD_FORM_DATA,
      payload: data,
    })
  }

export const validateCardOnboarding =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ValidateCardStartAction>({
      type: OnboardingActions.VALIDATE_CARD_START,
    })
    try {
      const state = getState()
      const { url, defaultHeaders, token } = await getBaseRequestData(
        '/Card/VerifyCard',
        state,
      )

      const data: ValidateCardRequest = {
        identifierCard: state.onboarding.validateCard?.identifierCard,
        panLastDigits: state.onboarding.validateCard?.panLastDigits,
        taxId: state.onboarding.validateCard?.taxId,
      }

      const response = await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data.success

      dispatch<ValidateCardSuccessAction>({
        type: OnboardingActions.VALIDATE_CARD_SUCCESS,
        payload: responseData,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<ValidateCardFailAction>({
        type: OnboardingActions.VALIDATE_CARD_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const createAccount =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CreateAccountStartAction>({
      type: OnboardingActions.CREATE_ACCOUNT_START,
    })
    try {
      const state = getState()
      const { url, defaultHeaders, token } = await getBaseRequestData(
        '/limitedAccount',
        state,
      )

      const data: CreateAccountRequest = {
        ...state.onboarding.onboardingForm!,
      }

      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreateAccountSuccessAction>({
        type: OnboardingActions.CREATE_ACCOUNT_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreateAccountFailAction>({
        type: OnboardingActions.CREATE_ACCOUNT_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const validateActivationToken =
  (activationToken: string) => async (dispatch: Dispatch) => {
    dispatch<ValidateTokenStartAction>({
      type: OnboardingActions.VALIDATE_ACTIVATION_TOKEN_START,
    })

    try {
      const { url, defaultHeaders, token } = await getBaseRequestData(
        '/internalTransfer/findPendingInternalTransfer',
      )

      const data: ValidateTokenRequest = {
        verificationCode: activationToken,
      }

      const response = await HttpClient.post<ValidateActivationTokenResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.data.success) throw new Error(response.data.message)

      dispatch<ValidateTokenSuccessAction>({
        type: OnboardingActions.VALIDATE_ACTIVATION_TOKEN_SUCCESS,
        payload: response.data.data,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<ValidateTokenFailAction>({
        type: OnboardingActions.VALIDATE_ACTIVATION_TOKEN_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const generateAuthorizationToken =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GenerateAuthorizationTokenStartAction>({
      type: OnboardingActions.GENERATE_AUTHORIZATION_TOKEN_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, token } = await getBaseRequestData(
        '/authorizationToken/GenerateOnboardingAuthorizationToken',
        state,
      )
      const data: GenerateAuthorizationTokenRequest = {
        phoneNumber: state.onboarding.onboardingForm!.phoneNumber!,
      }

      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<GenerateAuthorizationTokenSuccessAction>({
        type: OnboardingActions.GENERATE_AUTHORIZATION_TOKEN_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<GenerateAuthorizationTokenFailAction>({
        type: OnboardingActions.GENERATE_AUTHORIZATION_TOKEN_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const validateAuthorizationToken =
  (authorizationToken: string) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ValidateAuthorizationTokenStartAction>({
      type: OnboardingActions.VALIDATE_AUTHORIZATION_TOKEN_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, token } = await getBaseRequestData(
        '/authorizationToken/ValidateOnboardingAuthorizationToken',
        state,
      )
      const data: ValidateAuthorizationTokenRequest = {
        code: authorizationToken,
        phoneNumber: state.onboarding.onboardingForm!.phoneNumber!,
      }

      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<ValidateAuthorizationTokenSuccessAction>({
        type: OnboardingActions.VALIDATE_AUTHORIZATION_TOKEN_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<ValidateAuthorizationTokenFailAction>({
        type: OnboardingActions.VALIDATE_AUTHORIZATION_TOKEN_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const closeAlert = () => (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: OnboardingActions.CLOSE_ALERT,
  })
}
