import { CardHolder } from './CardHolder'
import { CardHolderContact } from './CardHolderContact'
import { CardOwner } from './CardOwner'
import { UsageType } from './Enum'

export interface BindUnnamedCard {
  identifierCard: string
  usageType: UsageType
  cardOwner: CardOwner
  cardHolder: CardHolder
  cardHolderContact: CardHolderContact
}
