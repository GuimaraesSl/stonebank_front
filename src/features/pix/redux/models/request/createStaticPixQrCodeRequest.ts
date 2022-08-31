import { ApiRequest } from '_config/api'
import { PixKeyType } from '../pixKeyType'
import { PixTransactionPurpose } from '../pixTransactionPurposeTest'
import { CreateStaticPixQrCodeAdressRequest } from './createStaticPixQrCodeAdressRequest'

export interface CreateStaticPixQrCodeRequest extends ApiRequest {
  principalValue?: number
  pixKeyValue?: string
  address?: CreateStaticPixQrCodeAdressRequest
  additionalData?: string
  pixTransactionPurpose?: PixTransactionPurpose
  pixKeyType?: PixKeyType
  description?: string
}
