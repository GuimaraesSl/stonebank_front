import { OperationType } from "features/account/redux/models/operationType";
import { ApiRequest } from "_config";

export interface FavoredListRequest extends ApiRequest {
  operationType?: OperationType;
}
