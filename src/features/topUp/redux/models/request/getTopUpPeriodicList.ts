import { ApiRequest } from '_config/api'


export interface GetTopUpPeriodicList extends ApiRequest {
    userId : number,
    accountId : number
}
