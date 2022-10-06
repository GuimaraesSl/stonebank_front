import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PixAreaView } from "./PixArea.view";
import { PixRoutes } from "features/pix/constants/routes";
import { AccountRoutes } from "features/account/constants/routes";
import {
  closeAlert,
  createStaticPixQrCodeAction,
  findFavoredListByAccountIdAndOperationType,
  findPixKeyList,
  findPixQrCode,
  selectPixKey,
  updatePixTransfer,
  updateState,
} from "features/pix/redux/actions";
import { StoreState } from "redux/state";
import { PixTransactionPurpose } from "features/pix/redux/models/pixTransactionPurposeTest";
import { PixKeyStatus } from "features/pix/redux/models/pixKeyStatus";
import { Favored } from "features/pix/redux/models/favored";

export const PixArea: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    pixKey,
    pixKeyList,
    createStaticPixQrCode,
    staticPixQrCode,
    favored,
    loading,
    errorMessage,
  } = useSelector((state: StoreState) => state.pix);
  const [sentFindPixKeyListRequest, setFindPixKeyListRequest] =
    React.useState(false);
  const [sentCreateStaticPixQrCode, setSentCreateStaticPixQrCode] =
    React.useState(false);

  React.useEffect(() => {
    dispatch(updateState());
  }, []);

  React.useEffect(() => {
    if (pixKeyList && sentFindPixKeyListRequest)
      history.push(PixRoutes.pixKeyList);
  }, [pixKeyList]);

  React.useEffect(() => {
    if (pixKeyList && sentCreateStaticPixQrCode)
      dispatch(
        selectPixKey(
          pixKeyList.find((x) => x.status === PixKeyStatus.Registered)
        )
      );
  }, [pixKeyList]);

  React.useEffect(() => {
    if (pixKeyList && pixKey)
      if (pixKeyList && pixKey && sentCreateStaticPixQrCode)
        dispatch(
          createStaticPixQrCodeAction(
            undefined,
            pixKey.pixKeyValue,
            pixKey.pixKeyType,
            undefined,
            PixTransactionPurpose.PurchaseOrTransfer
          )
        );
  }, [pixKey]);

  React.useEffect(() => {
    if (createStaticPixQrCode) {
      dispatch(findPixQrCode(createStaticPixQrCode));
    }
  }, [createStaticPixQrCode]);

  React.useEffect(() => {
    if (staticPixQrCode && sentCreateStaticPixQrCode)
      history.push(PixRoutes.receivePixTransferQrCode);
  }, [staticPixQrCode]);

  React.useEffect(() => {
    dispatch(findFavoredListByAccountIdAndOperationType());
  }, []);

  const onCloseAlert = () => {
    dispatch(closeAlert());
  };

  const onCancelButton = () => {
    history.push(AccountRoutes.home);
  };

  const onBackToHome = () => {
    history.push(AccountRoutes.home);
  };

  const onTransferWithKeyClick = () => {
    history.push(PixRoutes.pixTransferHome);
  };

  const onCopyPasteTransferClick = () => {
    history.push(PixRoutes.pixTransferHome);
  };

  const onQrCodeTransferClick = () => {
    history.push(PixRoutes.qrCodePixTransferScanner);
  };

  const onPixKeyListClick = () => {
    dispatch(findPixKeyList());
    setFindPixKeyListRequest(true);
  };

  const onReceivePixQRCodeClick = () => {
    dispatch(findPixKeyList());
    setSentCreateStaticPixQrCode(true);
  };

  const onSelectFavored = (favored?: Favored) => {
    dispatch(
      updatePixTransfer({
        toTaxId: favored!.taxId,
        toBankName: favored?.bankName,
        toBank: favored?.bank,
        toBankBranch: favored?.bankBranch,
        toBankAccount: favored?.bankAccount,
        toBankAccountDigit: favored?.bankAccountDigit,
        toName: favored?.name,
      })
    );
    history.push(PixRoutes.bankPixTransferValue);
  };

  return (
    <PixAreaView
      onReceivePixQRCodeClick={onReceivePixQRCodeClick}
      // onHelpClick={onHelpClick}
      // onMyLimitsPix={onMyLimitsPix}
      loading={loading}
      onQrCodeTransferClick={onQrCodeTransferClick}
      onPixKeyListClick={onPixKeyListClick}
      onTransferWithKeyClick={onTransferWithKeyClick}
      onCopyPasteTransferClick={onCopyPasteTransferClick}
      onSelectFavored={onSelectFavored}
      favored={favored!}
      errorMessage={errorMessage}
      onCloseAlert={onCloseAlert}
      onCancelButton={onCancelButton}
      onBackToHome={onBackToHome}
    />
  );
};
