import { CancelCardRequest } from './models/request/cancelCardRequest'
import { Dispatch } from 'redux'
import { ApiResponse } from '_config/api'
import { HttpClient } from '_config/http'
import {
  CardsActions,
  FindAllCardsListFailAction,
  FindAllCardsListStartAction,
  FindAllCardsListSuccessAction,
  ChangePinCardStartAction,
  ChangePinCardSuccessAction,
  ChangePinCardFailAction,
  SelectCardAction,
  UpdateCardAction,
  SelectedReasonAction,
  InactivateAndReissueCardStartAction,
  InactivateAndReissueCardSuccessAction,
  InactivateAndReissueCardFailAction,
  FindCardSuccessAction,
  FindCardFailAction,
  FindCardStartAction,
  ActivateCardStartAction,
  ActivateCardSuccessAction,
  ActivateCardFailAction,
  BlockStartAction,
  BlockSuccessAction,
  BlockFailAction,
  UnblockStartAction,
  UnblockFailAction,
  UnblockSuccessAction,
  CloseAlertAction,
  CancelCardStartAction,
  CancelCardFailAction,
  CancelCardSuccessAction,
  BindUnnamedCardStartAction,
  BindUnnamedCardSuccessAction,
  BindUnnamedCardFailAction,
  ValidateCardStartAction,
  ValidateCardSuccessAction,
  ValidateCardFailAction,
} from './actionTypes'
import { GetState } from 'redux/state'
import { getBaseRequestData } from '_utils/http'
import { FindCardListResponse } from './models/response/findCardListResponse'
import { InactivateAndReissueCardRequest } from './models/request/InactivateAndReissueCardRequest'
import { Card } from './models/card'
import { InactivateAndReissueCardResponse } from './models/response/inactivateAndReissueCardResponse'
import { ReasonCode } from './models/reasonCodeEnum'
import { FindCardListRequest } from './models/request/getCardList'
import { BlockCardRequest } from './models/request/blockCard'
import { unBlockCardRequest } from './models/request/unblockCard'
import { ChangePinCardRequest } from './models/request/changePin'
import { FindCardRequest } from './models/request/findCard'
import { FindCardCardResponse } from './models/response/findCard'
import { ActivateCardRequest } from './models/request/activateCard'
import { ActivateCardResponse } from './models/response/activateCard'
import { BindUnnamedCardRequest } from './models/request/BindUnnamedCardRequest'
import { Gender, MaritalStatus, UsageType } from './models/Enum'
import { BindUnnamedCardResponse } from './models/response/BindUnnamedCard'
import { ConfigProvider } from '_config'
import { ValidateCardRequest } from './models/request/validateCardRequest'
import { decryptPassword, decryptNewPassword } from '_utils/cryptography'

export const findCardList =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindAllCardsListStartAction>({
      type: CardsActions.FIND_CARD_LIST_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Card/FindCardList', state)

      const data: FindCardListRequest = {
        taxId: state.account.account?.taxId!,
        accountId: accountId!,
        userId: userId!,
      }

      const response = await HttpClient.post<FindCardListResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data.data
      const cards = responseData.cards
      dispatch<FindAllCardsListSuccessAction>({
        type: CardsActions.FIND_CARD_LIST_SUCCESS,
        payload: cards!,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<FindAllCardsListFailAction>({
        type: CardsActions.FIND_CARD_LIST_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const validateCard =
  (panLastDigits: string) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ValidateCardStartAction>({
      type: CardsActions.VALIDATE_CARD_START,
    })
    try {
      const state = getState()
      const { url, defaultHeaders, token } = await getBaseRequestData(
        '/Card/VerifyCard',
        state,
      )

      const data: ValidateCardRequest = {
        identifierCard: state.card.card?.identifierCard,
        panLastDigits: panLastDigits,
        taxId: state.account.account?.taxId!,
      }

      const response = await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data.success

      dispatch<ValidateCardSuccessAction>({
        type: CardsActions.VALIDATE_CARD_SUCCESS,
        payload: responseData,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<ValidateCardFailAction>({
        type: CardsActions.VALIDATE_CARD_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const findCard =
  (identifierCard?: string) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindCardStartAction>({
      type: CardsActions.FIND_CARD_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Card/FindCard', state)

      const data: FindCardRequest = {
        accountId: accountId!,
        userId: userId!,
        identifierCard: identifierCard,
      }

      const response = await HttpClient.post<FindCardCardResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data.data
      const card = responseData.card
      dispatch<FindCardSuccessAction>({
        type: CardsActions.FIND_CARD_SUCCESS,
        payload: card!,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<FindCardFailAction>({
        type: CardsActions.FIND_CARD_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const block =
  (identifierCard: string, pin: string) =>
  async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<BlockStartAction>({
        type: CardsActions.BLOCK_START,
      })

      const state = getState()
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Card/Block', state)

      const data: BlockCardRequest = {
        accountId: accountId!,
        userId: userId!,
        identifierCard: identifierCard!,
        pin: pin!,
      }

      const response = await HttpClient.post<BlockCardRequest>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.data.success) throw new Error(response.data.message)

      dispatch<BlockSuccessAction>({
        type: CardsActions.BLOCK_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<BlockFailAction>({
        type: CardsActions.BLOCK_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const unblock =
  (identifierCard: string, pin: string) =>
  async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<UnblockStartAction>({
        type: CardsActions.UNBLOCK_START,
      })

      const state = getState()
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Card/Unblock', state)

      const data: unBlockCardRequest = {
        accountId: accountId!,
        userId: userId!,
        identifierCard: identifierCard!,
        pin: pin!,
      }

      const response = await HttpClient.post<unBlockCardRequest>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.data.success) throw new Error(response.data.message)

      dispatch<UnblockSuccessAction>({
        type: CardsActions.UNBLOCK_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<UnblockFailAction>({
        type: CardsActions.UNBLOCK_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const activateCard =
  () => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<ActivateCardStartAction>({
        type: CardsActions.ACTIVATE_CARD_START,
      })

      const state = getState()

      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Card/Activate', state)

      const data: ActivateCardRequest = {
        accountId: accountId!,
        userId: userId!,
        identifierCard: state.card!.card!.identifierCard!.toString(),
      }

      const response = await HttpClient.post<ActivateCardResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.data.success) throw new Error(response.data.message)

      dispatch<ActivateCardSuccessAction>({
        type: CardsActions.ACTIVATE_CARD_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<ActivateCardFailAction>({
        type: CardsActions.ACTIVATE_CARD_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const inactivateAndReissueCard =
  (identifierCard: string, pin: string, reasonCode: number) =>
  async (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    dispatch<InactivateAndReissueCardStartAction>({
      type: CardsActions.INACTIVATE_AND_REISSUE_CARD_START,
      payload: { ...state.card.card! },
    })

    try {
      const state = getState()
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Card/InactivateAndReissue', state)

      const data: InactivateAndReissueCardRequest = {
        accountId: accountId!,
        userId: userId!,
        identifierCard: identifierCard,
        pin: pin,
        reasonCode: reasonCode,
        cardDeliveryAddress: {
          street: state.auth.user?.street!,
          number: state.auth.user?.number!,
          district: state.auth.user?.district!,
          complement: state.auth.user?.complement!,
          city: state.auth.user?.city!,
          state: state.auth.user?.state!, 
          zipCode: state.auth.user?.zipCode!,
          reference: state.auth.user?.reference!,
          country: state.auth.user?.country!,
        },
      }

      const response = await HttpClient.post<InactivateAndReissueCardResponse>(
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

      dispatch<InactivateAndReissueCardSuccessAction>({
        type: CardsActions.INACTIVATE_AND_REISSUE_CARD_SUCCESS,
        payload: response.data.success!,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<InactivateAndReissueCardFailAction>({
        type: CardsActions.INACTIVATE_AND_REISSUE_CARD_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const selectedReason =
  (reasonCode?: ReasonCode) => (dispatch: Dispatch) => {
    dispatch<SelectedReasonAction>({
      type: CardsActions.SELECTED_REASON,
      payload: reasonCode!,
    })
  }

export const selectCard = (card?: Card) => (dispatch: Dispatch) => {
  dispatch<SelectCardAction>({
    type: CardsActions.SELECT_CARD,
    payload: card!,
  })
}

export const updateCard = (card?: Card) => (dispatch: Dispatch) => {
  dispatch<UpdateCardAction>({
    type: CardsActions.UPDATE_CARD,
    payload: card,
  })
}

export const changePinCard =
  (changePinCard?: Card) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ChangePinCardStartAction>({
      type: CardsActions.CHANGE_PIN_CARD_START,
      payload: changePinCard!,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Card/ChangePinCard', state)

      const data: ChangePinCardRequest = {
        identifierCard: state.card?.card?.identifierCard,
        accountId: accountId!,
        userId: userId!,
        currentPin: decryptPassword(),
        pin: decryptNewPassword(),
        confirmationPin: decryptNewPassword(),
      }

      const response = await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.data.success) throw new Error(response.data.message)

      dispatch<ChangePinCardSuccessAction>({
        type: CardsActions.CHANGE_PIN_CARD_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<ChangePinCardFailAction>({
        type: CardsActions.CHANGE_PIN_CARD_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const closeAlert = () => (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: CardsActions.CLOSE_ALERT,
  })
}

export const cancelCard =
  (identifierCard: string) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CancelCardStartAction>({
      type: CardsActions.CANCEL_CARD_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Card/CancelCard', state)

      const data: CancelCardRequest = {
        accountId: accountId!,
        userId: userId!,
        identifierCard: identifierCard!,
      }

      const response = await HttpClient.post<CancelCardRequest>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.data.success) throw new Error(response.data.message)

      dispatch<CancelCardSuccessAction>({
        type: CardsActions.CANCEL_CARD_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CancelCardFailAction>({
        type: CardsActions.CANCEL_CARD_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const bindUnnamedCard =
  () => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch<BindUnnamedCardStartAction>({
        type: CardsActions.BIND_UNNAMED_CARD_START,
      })

      const state = getState()

      const { url, defaultHeaders, token, accountId, userId, accountTaxId } =
        await getBaseRequestData('/Card/BindUnnamedCard', state)

      const data: BindUnnamedCardRequest = {
        accountId: accountId!,
        userId: userId!,
        identifierCard: state.card!.card!.identifierCard!,
        usageType: UsageType.balance,
        cardOwner: {
          ownerTaxId: ConfigProvider.config.company.taxId!,
          fullName: ConfigProvider.config.company.name,
          phone: ConfigProvider.config.company.phone,
          mail: ConfigProvider.config.company.email,
          bank: state.account.account?.bank!,
          bankBranch: state.account?.account?.bankBranch!,
          bankAccount: state.account?.account?.bankAccount!,
          bankAccountDigit: state.account.account?.bankAccountDigit!,
        },
        cardHolder: {
          holderTaxId: accountTaxId!,
          nationality: state.card!.card!.nationality!,
          motherName: state.card!.card!.motherName!,
          gender: state.card!.card!.gender!,
          fullName: state.card!.card!.fullName!,
          birthDate: state.card!.card!.birthDate!,
          maritalStatus: state.card!.card!.maritalStatus!,
        },
        cardHolderContact: {
          phone: state.auth.user?.phoneNumber!,
          mail: state.auth.user?.mail!, 
        },
      }

      const response = await HttpClient.post<BindUnnamedCardResponse>(
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

      dispatch<BindUnnamedCardSuccessAction>({
        type: CardsActions.BIND_UNNAMED_CARD_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<BindUnnamedCardFailAction>({
        type: CardsActions.BIND_UNNAMED_CARD_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }
