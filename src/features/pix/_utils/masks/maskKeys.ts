import { maskPhone } from "_utils/masks/phone";
import { maskTaxPayer } from "_utils/masks/taxPayer";
import { PixKeyType } from "features/pix/redux/models/pixKeyType";

export const maskKeys = (key: string, keyType: PixKeyType) => {
  switch (keyType) {
    case PixKeyType.Email:
      return key;

    case PixKeyType.RandomKeyCode:
      return key;

    case PixKeyType.PhoneNumber:
      return maskPhone(key.substring(3));

    case PixKeyType.CNPJ:
    case PixKeyType.CPF:
      return maskTaxPayer(key);
  }
};
