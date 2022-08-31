import { ReasonCode } from './models/reasonCodeEnum'
import { Card } from './models/card'

export enum CardsActions {
  FIND_CARD_LIST_START = 'FIND_CARD_LIST_START',
  FIND_CARD_LIST_SUCCESS = 'FIND_CARD_LIST_SUCCESS',
  FIND_CARD_LIST_FAIL = 'FIND_CARD_LIST_FAIL',

  FIND_CARD_START = 'FIND_CARD_START',
  FIND_CARD_SUCCESS = 'FIND_CARD_SUCCESS',
  FIND_CARD_FAIL = 'FIND_CARD_FAIL',

  ACTIVATE_CARD_START = 'ACTIVATE_CARD_START',
  ACTIVATE_CARD_SUCCESS = 'ACTIVATE_CARD_SUCCESS',
  ACTIVATE_CARD_FAIL = 'ACTIVATE_CARD_FAIL',
  UPDATE_ACTIVATE_CARD_DATA = 'UPDATE_ACTIVATE_CARD_DATA',

  CANCEL_CARD_START = 'CANCEL_CARD_START',
  CANCEL_CARD_SUCCESS = 'CANCEL_CARD_SUCCESS',
  CANCEL_CARD_FAIL = 'CANCEL_CARD_FAIL',

  CHANGE_PIN_CARD_START = 'CHANGE_PIN_CARD_START',
  CHANGE_PIN_CARD_SUCCESS = 'CHANGE_PIN_CARD_SUCCESS',
  CHANGE_PIN_CARD_FAIL = 'CHANGE_PIN_CARD_FAIL',

  INACTIVATE_AND_REISSUE_CARD_START = 'INACTIVATE_AND_REISSUE_CARD_START',
  INACTIVATE_AND_REISSUE_CARD_SUCCESS = 'INACTIVATE_AND_REISSUE_CARD_SUCCESS',
  INACTIVATE_AND_REISSUE_CARD_FAIL = 'INACTIVATE_AND_REISSUE_CARD_FAIL',

  BLOCK_START = 'BLOCK_START',
  BLOCK_SUCCESS = 'BLOCK_SUCCESS',
  BLOCK_FAIL = 'BLOCK_FAIL',

  UNBLOCK_START = 'UNBLOCK_START',
  UNBLOCK_SUCCESS = 'UNBLOCK_SUCCESS',
  UNBLOCK_FAIL = 'UNBLOCK_FAIL',

  UPDATE_PIN_CARD_DATA = 'UPDATE_PIN_CARD_DATA',
  SELECT_CARD = 'SELECT_CARD',
  UPDATE_CARD = 'UPDATE_CARD',
  SELECTED_REASON = 'SELECTED_REASON',
  GET_PASSWORD = 'GET_PASSWORD',
  CLOSE_ALERT = 'CLOSE_ALERT',

  BIND_UNNAMED_CARD_START = 'BIND_UNNAMED_CARD_START',
  BIND_UNNAMED_CARD_SUCCESS = 'BIND_UNNAMED_CARD_SUCCESS',
  BIND_UNNAMED_CARD_FAIL = 'BIND_UNNAMED_CARD_FAIL',
  UPDATE_BIND_UNNAMED_CARD_DATA = 'UPDATE_BIND_UNNAMED_CARD_DATA',

  VALIDATE_CARD_START = 'VALIDATE_CARD_START',
  VALIDATE_CARD_SUCCESS = 'VALIDATE_CARD_SUCCESS',
  VALIDATE_CARD_FAIL = 'VALIDATE_CARD_FAIL',
}

export interface FindAllCardsListStartAction {
  type: CardsActions.FIND_CARD_LIST_START
}

export interface FindAllCardsListSuccessAction {
  type: CardsActions.FIND_CARD_LIST_SUCCESS
  payload: Card[]
}

export interface FindAllCardsListFailAction {
  type: CardsActions.FIND_CARD_LIST_FAIL
  payload: string
}

export interface FindCardStartAction {
  type: CardsActions.FIND_CARD_START
}

export interface FindCardSuccessAction {
  type: CardsActions.FIND_CARD_SUCCESS
  payload: Card
}

export interface FindCardFailAction {
  type: CardsActions.FIND_CARD_FAIL
  payload: string
}
export interface UpdatePinCardDataAction {
  type: CardsActions.UPDATE_PIN_CARD_DATA
  payload?: Card
}

export interface UpdateActivateCardDataAction {
  type: CardsActions.UPDATE_ACTIVATE_CARD_DATA
  payload?: Card
}

export interface ChangePinCardStartAction {
  type: CardsActions.CHANGE_PIN_CARD_START
  payload: Card
}

export interface ChangePinCardSuccessAction {
  type: CardsActions.CHANGE_PIN_CARD_SUCCESS
}

export interface ChangePinCardFailAction {
  type: CardsActions.CHANGE_PIN_CARD_FAIL
  payload: string
}

export interface ActivateCardStartAction {
  type: CardsActions.ACTIVATE_CARD_START
}

export interface ActivateCardSuccessAction {
  type: CardsActions.ACTIVATE_CARD_SUCCESS
}

export interface ActivateCardFailAction {
  type: CardsActions.ACTIVATE_CARD_FAIL
  payload: string
}

export interface CancelCardStartAction {
  type: CardsActions.CANCEL_CARD_START
}

export interface CancelCardSuccessAction {
  type: CardsActions.CANCEL_CARD_SUCCESS
}

export interface CancelCardFailAction {
  type: CardsActions.CANCEL_CARD_FAIL
  payload: string
}
export interface BlockStartAction {
  type: CardsActions.BLOCK_START
}

export interface BlockSuccessAction {
  type: CardsActions.BLOCK_SUCCESS
}

export interface BlockFailAction {
  type: CardsActions.BLOCK_FAIL
  payload: string
}

export interface UnblockStartAction {
  type: CardsActions.UNBLOCK_START
}

export interface UnblockSuccessAction {
  type: CardsActions.UNBLOCK_SUCCESS
}

export interface UnblockFailAction {
  type: CardsActions.UNBLOCK_FAIL
  payload: string
}

export interface SelectCardAction {
  type: CardsActions.SELECT_CARD
  payload: Card
}

export interface SelectedReasonAction {
  type: CardsActions.SELECTED_REASON
  payload: ReasonCode
}

export interface UpdateCardAction {
  type: CardsActions.UPDATE_CARD
  payload?: Card
}

export interface InactivateAndReissueCardStartAction {
  type: CardsActions.INACTIVATE_AND_REISSUE_CARD_START
  payload: Card
}

export interface InactivateAndReissueCardSuccessAction {
  type: CardsActions.INACTIVATE_AND_REISSUE_CARD_SUCCESS
  payload?: boolean
}

export interface InactivateAndReissueCardFailAction {
  type: CardsActions.INACTIVATE_AND_REISSUE_CARD_FAIL
  payload: string
}
export interface BindUnnamedCardStartAction {
  type: CardsActions.BIND_UNNAMED_CARD_START
}

export interface BindUnnamedCardSuccessAction {
  type: CardsActions.BIND_UNNAMED_CARD_SUCCESS
}

export interface BindUnnamedCardFailAction {
  type: CardsActions.BIND_UNNAMED_CARD_FAIL
  payload: string
}

export interface ValidateCardStartAction {
  type: CardsActions.VALIDATE_CARD_START
}

export interface ValidateCardSuccessAction {
  type: CardsActions.VALIDATE_CARD_SUCCESS
  payload: boolean
}

export interface ValidateCardFailAction {
  type: CardsActions.VALIDATE_CARD_FAIL
  payload: string
}
export interface CloseAlertAction {
  type: CardsActions.CLOSE_ALERT
}

export type CardsAction =
  | FindAllCardsListStartAction
  | FindAllCardsListSuccessAction
  | FindAllCardsListFailAction
  | InactivateAndReissueCardStartAction
  | InactivateAndReissueCardSuccessAction
  | InactivateAndReissueCardFailAction
  | FindCardStartAction
  | FindCardSuccessAction
  | FindCardFailAction
  | SelectCardAction
  | UpdateCardAction
  | SelectedReasonAction
  | CloseAlertAction
  | BlockStartAction
  | BlockSuccessAction
  | BlockFailAction
  | UnblockStartAction
  | UnblockSuccessAction
  | UnblockFailAction
  | UpdatePinCardDataAction
  | ChangePinCardStartAction
  | ChangePinCardSuccessAction
  | ChangePinCardFailAction
  | CancelCardStartAction
  | CancelCardSuccessAction
  | CancelCardFailAction
  | ActivateCardStartAction
  | ActivateCardSuccessAction
  | ActivateCardFailAction
  | BindUnnamedCardStartAction
  | BindUnnamedCardSuccessAction
  | BindUnnamedCardFailAction
  | CloseAlertAction
  | ValidateCardStartAction
  | ValidateCardSuccessAction
  | ValidateCardFailAction
