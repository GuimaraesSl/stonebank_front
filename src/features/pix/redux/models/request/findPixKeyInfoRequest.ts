import { ApiRequest } from "_config/api";
import { PixKeyType } from "../pixKeyType";

export interface FindPixKeyInfoRequest extends ApiRequest {
  pixKeyValue?: string;
  taxId?: string;
  pixKeyType?: PixKeyType;
}
