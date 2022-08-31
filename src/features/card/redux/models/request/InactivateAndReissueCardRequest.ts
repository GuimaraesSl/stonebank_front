import { ApiRequest } from '_config/api'
import { ReasonCode } from 'features/card/redux/models/reasonCodeEnum'
import { CardDeliveryAddress } from 'features/card/redux/models/CardDeliveryAddress'

export interface InactivateAndReissueCardRequest extends ApiRequest {
  identifierCard: string
  pin: string
  reasonCode: ReasonCode
  cardDeliveryAddress: CardDeliveryAddress
}
