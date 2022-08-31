import { ApiRequest } from '_config'
import { CardHolder } from '../CardHolder'
import { CardHolderContact } from '../CardHolderContact'
import { CardOwner } from '../CardOwner'
import { UsageType } from '../Enum'

export interface BindUnnamedCardRequest extends ApiRequest {
  identifierCard: string
  usageType: UsageType
  cardOwner: CardOwner
  cardHolder: CardHolder
  cardHolderContact: CardHolderContact
}
