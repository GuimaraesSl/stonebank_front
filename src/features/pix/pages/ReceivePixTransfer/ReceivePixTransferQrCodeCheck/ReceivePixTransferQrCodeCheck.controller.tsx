import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PixRoutes } from "features/pix";
import { ReceivePixTransferQrCodeCheckView } from "./ReceivePixTransferQrCodeCheck.view";
import { useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { PixKeyType } from "features/pix/redux/models/pixKeyType";

export const ReceivePixTransferQrCodeCheck: React.FC = () => {
  const history = useHistory();

  const { state } = useLocation();

  const { principalValue } = state as any;

  const onCancelButtonClick = React.useCallback(() => {
    history.push(PixRoutes.pixArea);
  }, []);

  const [pixKeyType, setPixKeyType] = React.useState("");
  const [onSharePixQrCode, setSharePixQrCode] = React.useState(false);
  const [validatedSharePixQrCodeSheet, setSharePixQrCodeSheet] =
    React.useState(false);

  const { staticPixQrCode, pixKey } = useSelector(
    (state: StoreState) => state.pix
  );

  React.useEffect(() => {
    switch (pixKey) {
      case PixKeyType.CPF === pixKey?.pixKeyType:
        setPixKeyType("CPF");
        break;
      case PixKeyType.CNPJ === pixKey?.pixKeyType:
        setPixKeyType("CNPJ");
        break;

      case PixKeyType.Email === pixKey?.pixKeyType:
        setPixKeyType("Email");
        break;

      case PixKeyType.PhoneNumber === pixKey?.pixKeyType:
        setPixKeyType("Celular");
        break;
    }
  }, [pixKey]);

  const onBackButtonClick = () => {
    history.push(PixRoutes.pixArea);
  };

  const onSharePixQrCodeClick = React.useCallback(() => {
    setSharePixQrCode(true);
  }, []);

  const onSharePixQrCodeClose = (SharePixQrCodeValid: boolean) => {
    if (SharePixQrCodeValid) setSharePixQrCodeSheet(true);
    setSharePixQrCode(false);
  };

  const onConfirmButtonClick = () => {
    history.push(PixRoutes.pixArea);
  };

  return (
    <ReceivePixTransferQrCodeCheckView
      onBackButtonClick={onBackButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onConfirmButtonClick={onConfirmButtonClick}
      qrCodeBase64={staticPixQrCode?.qrCode}
      value={principalValue!}
      pixKey={pixKey!}
      pixKeyType={pixKeyType!}
      onSharePixQrCodeClick={onSharePixQrCodeClick}
      onSharePixQrCode={onSharePixQrCode}
      onSharePixQrCodeClose={onSharePixQrCodeClose}
    />
  );
};
