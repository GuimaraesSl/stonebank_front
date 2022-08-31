import { ApiRequest } from "_config/api";

export interface GetFixedAccountRequest extends ApiRequest {
  isFixed: boolean;
}
