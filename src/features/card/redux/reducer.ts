import {
  FailCardState,
  CardState,
  InitialCardState,
  LoadingCardState,
  SuccessCardState,
  SelectedReasonCode,
  InactivateCardAndReissueState,
} from './state'
import { CardsAction, CardsActions } from './actionTypes'

const initialState: CardState = new InitialCardState()

export const cardReducer = (state = initialState, action: CardsAction) => {
  switch (action.type) {
    case CardsActions.FIND_CARD_LIST_START:
    case CardsActions.CHANGE_PIN_CARD_START:
    case CardsActions.INACTIVATE_AND_REISSUE_CARD_START:
    case CardsActions.FIND_CARD_START:
    case CardsActions.ACTIVATE_CARD_START:
    case CardsActions.BLOCK_START:
    case CardsActions.UNBLOCK_START:
    case CardsActions.CANCEL_CARD_START:
    case CardsActions.BIND_UNNAMED_CARD_START:
    case CardsActions.VALIDATE_CARD_START:
      return new LoadingCardState(
        state.card,
        state.cards,
        undefined,
        state.activateCard,
      )

    case CardsActions.FIND_CARD_LIST_SUCCESS:
      return new SuccessCardState(action.payload)

    case CardsActions.CHANGE_PIN_CARD_SUCCESS:
      return new SuccessCardState(state.cards!)

    case CardsActions.CANCEL_CARD_SUCCESS:
      return new SuccessCardState(state.cards!)

    case CardsActions.ACTIVATE_CARD_SUCCESS:
      return new SuccessCardState(
        state.cards!,
        state.card!,
        state.changePinCard!,
        state.activateCard!,
      )

    case CardsActions.VALIDATE_CARD_SUCCESS:
    case CardsActions.BIND_UNNAMED_CARD_SUCCESS:
      return new SuccessCardState(state.cards!, state.card!)

    case CardsActions.UPDATE_PIN_CARD_DATA:
      return new InitialCardState({ ...state.card!, ...action.payload })

    case CardsActions.BLOCK_SUCCESS:
      return new SuccessCardState(
        state.cards!,
        { ...state.card!, isBlocked: true },
        state.changePinCard,
      )

    case CardsActions.UNBLOCK_SUCCESS:
      return new SuccessCardState(
        state.cards!,
        { ...state.card!, isBlocked: false },
        state.changePinCard,
      )

    case CardsActions.SELECT_CARD:
      return new InitialCardState(
        action.payload,
        state.cards,
        state.changePinCard,
      )

    case CardsActions.SELECTED_REASON:
      return new SelectedReasonCode({
        ...state.card!,
        reasonCode: action.payload,
      })

    case CardsActions.INACTIVATE_AND_REISSUE_CARD_SUCCESS:
      return new InactivateCardAndReissueState({
        ...state.card!,
      })

    case CardsActions.UPDATE_CARD:
      return new InitialCardState(
        {
          ...state.card,
          ...action.payload!,
        },
        state.cards,
        state.changePinCard,
      )

    case CardsActions.CLOSE_ALERT:
      return new InitialCardState(state.card, state.cards, state.changePinCard)

    case CardsActions.INACTIVATE_AND_REISSUE_CARD_FAIL:
    case CardsActions.CHANGE_PIN_CARD_FAIL:
    case CardsActions.FIND_CARD_LIST_FAIL:
    case CardsActions.FIND_CARD_FAIL:
    case CardsActions.ACTIVATE_CARD_FAIL:
    case CardsActions.BLOCK_FAIL:
    case CardsActions.UNBLOCK_FAIL:
    case CardsActions.CANCEL_CARD_FAIL:
    case CardsActions.BIND_UNNAMED_CARD_FAIL:
    case CardsActions.VALIDATE_CARD_FAIL:
      return new FailCardState(
        action.payload,
        state.cards,
        { ...state.card!, confirmationPin: undefined },
        state.changePinCard,
        state.card!,
      )

    default:
      return state
  }
}
