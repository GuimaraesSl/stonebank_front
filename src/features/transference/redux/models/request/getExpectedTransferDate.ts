import { ApiRequest } from '_config/api'

export interface GetExpectedTransferDateRequest extends ApiRequest {
  actualTransferDate: Date
  bankCode: string
  accountType: string
  customFormatDate: true
}
