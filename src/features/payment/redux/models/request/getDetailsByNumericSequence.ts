import { ApiRequest } from '_config/api'

export interface GetDetailsByNumericSequenceRequest extends ApiRequest {
  numericSequence: string
  taxId?: string
}
