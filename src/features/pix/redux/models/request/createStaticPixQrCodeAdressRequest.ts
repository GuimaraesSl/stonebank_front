import { AddressType } from "../addressType";

export interface CreateStaticPixQrCodeAdressRequest {
  addressLine1?: string;
  addressLine2?: string;
  zipCode?: string;
  neighborhood?: string;
  cityName?: string;
  state?: string;
  addressType?: AddressType;
  country?: string;
  complement?: string;
}
