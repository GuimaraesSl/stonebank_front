import { ApiRequest } from '_config'

export interface GetTagsRequest extends ApiRequest {
  taxId: String | undefined
  tagAmount: number | undefined
}
