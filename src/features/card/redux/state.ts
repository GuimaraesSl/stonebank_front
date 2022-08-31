import { Card } from './models/card'
import { ChangePinCard } from './models/changePinCard'
import { User } from 'features/authentication/redux/models/user'
import { ReasonCode } from './models/reasonCodeEnum'
import { ActivateCard } from './models/activateCard'
import { BindUnnamedCard } from './models/BindUnnamedCard'

export interface CardState {
  cards?: Card[]
  card?: Card
  changePinCard?: ChangePinCard[]
  activateCard?: ActivateCard
  loading: boolean
  errorMessage?: string
  bindUnnamedCard?: BindUnnamedCard
}
export class InitialCardState implements CardState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public card?: Card,
    public cards?: Card[],
    public changePinCard?: ChangePinCard[],
    public reasonCode?: ReasonCode,
    public activateCard?: ActivateCard,
    public cancelCard?: Card,
    public bindUnnamedCard?: BindUnnamedCard,
  ) {}
}

export class LoadingCardState implements CardState {
  loading: boolean = true
  errorMessage?: string

  constructor(
    public card?: Card,
    public cards?: Card[] | undefined,
    public changePinCard?: ChangePinCard[],
    public activateCard?: ActivateCard,
    public cancelCard?: Card,
    public bindUnnamedCard?: BindUnnamedCard,
  ) {}
}

export class SuccessCardState implements CardState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public cards: Card[],
    public card?: Card,
    public changePinCard?: ChangePinCard[] | undefined,
    public activateCard?: ActivateCard | undefined,
    public inactivateCardAndReissue?: Card | undefined,
    public cancelCard?: Card | undefined,
    public bindUnnamedCard?: BindUnnamedCard,
  ) {}
}

export class BlockAndUnBlockCardsState implements CardState {
  loading: boolean = false
  errorMessage?: string

  constructor(public card?: Card) {}
}

export class InactivateCardAndReissueState implements CardState {
  loading: boolean = false
  errorMessage?: string

  constructor(public card: Card) {}
}
export class SelectedReasonCode implements CardState {
  loading: boolean = false
  errorMessage?: string

  constructor(public card: Card) {}
}
export class UpdateCard implements CardState {
  loading: boolean = false
  errorMessage?: string

  constructor(public card: Card) {}
}
export class FailCardState implements CardState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public cards?: Card[] | undefined,
    public card?: Card | undefined,
    public changePinCard?: ChangePinCard[] | undefined,
    public activateCard?: ActivateCard,
    public inactivateAndReissueCard?: Card | undefined,
    public cancelCard?: Card | undefined,
    public bindUnnamedCard?: BindUnnamedCard,
  ) {}
}
