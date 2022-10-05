import React from "react";
import { useHistory } from "react-router-dom";
import { PixRoutes } from "features/pix";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { ReceivePixTransferQrCodeView } from "./ReceivePixTransferQrCode.view";
// import { SelectPixKey } from 'features/pix/redux/models/selectPixKey'
// import { updatePix, updateStaticPixQRCode } from 'features/pix/redux/actions'

export const ReceivePixTransferQrCode: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pixKey, pixKeyList, staticPixQrCode } = useSelector(
    (state: StoreState) => state.pix
  );

  const [onSharePixQrCode, setSharePixQrCode] = React.useState(false);
  const [validatedSharePixQrCodeSheet, setSharePixQrCodeSheet] =
    React.useState(false);

  const [onPixKeySelection, setPixKeySelection] = React.useState(false);
  const [validatedPixKeySelectionSheet, setPixKeySelectionSheet] =
    React.useState(false);

  const onCancelButtonClick = React.useCallback(() => {
    history.push(PixRoutes.pixArea);
  }, []);

  const onBackButtonClick = () => {
    // dispatch(updatePix())
    // dispatch(updateStaticPixQRCode())
  };

  const onSetValue = () => {
    history.push(PixRoutes.receivePixTransferQrCodeValue);
  };

  const onSharePixQrCodeClick = React.useCallback(() => {
    setSharePixQrCode(true);
  }, []);

  const onSharePixQrCodeClose = (SharePixQrCodeValid: boolean) => {
    if (SharePixQrCodeValid) setSharePixQrCodeSheet(true);
    setSharePixQrCode(false);
  };

  const onPixKeySelectionClick = React.useCallback(() => {
    setPixKeySelection(true);
  }, []);

  const onPixKeySelectionClose = (PixKeySelectionValid: boolean) => {
    if (PixKeySelectionValid) setPixKeySelectionSheet(true);
    setPixKeySelection(false);
  };

  // const onKeyClick = (pix: SelectPixKey) => {
  //   dispatch(updatePix(pix))
  // }

  return (
    <ReceivePixTransferQrCodeView
      onBackButtonClick={onBackButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      staticPixQrCode={staticPixQrCode}
      onSetValue={onSetValue}
      onSharePixQrCodeClick={onSharePixQrCodeClick}
      onSharePixQrCode={onSharePixQrCode}
      onSharePixQrCodeClose={onSharePixQrCodeClose}
      onPixKeySelectionClick={onPixKeySelectionClick}
      onPixKeySelection={onPixKeySelection}
      onPixKeySelectionClose={onPixKeySelectionClose}
      // onKeyClick={onKeyClick}
      pixKeyList={pixKeyList!}
      pixKey={pixKey!}
    />
  );
};
