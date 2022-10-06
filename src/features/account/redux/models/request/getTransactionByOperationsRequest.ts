import { OperationType } from "features/account/redux/models/operationType";

export interface GetTransactionByOperationRequest {
  operationId: number;
  operationType: OperationType;
}
