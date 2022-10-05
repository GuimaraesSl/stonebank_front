/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useHistory } from "react-router-dom";
import { PixRoutes } from "features/pix";
import { PixTransferHomeView } from "./PixTransferHome.view";
import { AccountRoutes } from "features/account/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "redux/state";
import {
  closeAlert,
  findPixQrCodeInfo,
  updateState,
  updatePixTransfer,
} from "features/pix/redux/actions";
import { AccountType } from "features/pix/redux/models/accountType";

export const PixTransferHome: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [hashValue, setHashValue] = React.useState("");
  const [sentRequest, setSentRequest] = React.useState(false);

  const { pixTransfer, pixQrCodeInfo, loading, errorMessage } = useSelector(
    (state: StoreState) => state.pix
  );

  React.useEffect(() => {
    dispatch(updateState());
  }, []);

  React.useEffect(() => {
    if (sentRequest && pixTransfer)
      pixTransfer?.value
        ? history.push(PixRoutes.qrCodePixTransferSummary)
        : history.push(PixRoutes.qrCodePixTransferValue);
  }, [pixTransfer]);

  React.useEffect(() => {
    if (sentRequest && pixQrCodeInfo)
      dispatch(
        updatePixTransfer({
          toName: pixQrCodeInfo?.receiverName,
          toTaxId: pixQrCodeInfo?.receiverTaxNumber,
          toBank: pixQrCodeInfo?.receiverBank,
          toBankBranch: pixQrCodeInfo?.receiverBankBranch,
          toBankAccount: pixQrCodeInfo?.receiverBankAccount,
          toBankAccountDigit: pixQrCodeInfo?.receiverBankAccountDigit,
          value: parseFloat(pixQrCodeInfo?.originalValue!),
          paymentDate: pixQrCodeInfo?.paymentDate ?? new Date(),
          description: pixQrCodeInfo?.description,
          accountType: convertAccountType(pixQrCodeInfo?.receiverAccountType),
          searchProtocol: pixQrCodeInfo?.searchProtocol,
        })
      );
  }, [pixQrCodeInfo]);

  const convertAccountType = (accountType?: string) => {
    switch (accountType) {
      case "0":
        return AccountType.normal;
      case "1":
        return AccountType.savings;
    }
  };

  const onChangeHashValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashValue(e.target.value);
  };

  const onPixKeyClick = () => {
    history.push(PixRoutes.keyPixTransfer);
  };

  const onHashSearchClick = () => {
    dispatch(findPixQrCodeInfo(hashValue));
    setSentRequest(true);
  };

  const onBankDataClick = () => {
    history.push(PixRoutes.bankPixTransferPayeeName);
  };

  const onCancelButtonClick = () => {
    history.push(PixRoutes.pixArea);
  };

  const onBackButtonClick = () => {
    dispatch(updateState());
    history.push(PixRoutes.pixArea);
  };

  const onAlertClose = () => {
    dispatch(closeAlert());
  };

  return (
    <PixTransferHomeView
      hashValue={hashValue}
      loading={loading}
      errorMessage={errorMessage}
      onPixKeyClick={onPixKeyClick}
      onBankDataClick={onBankDataClick}
      onCancelButtonClick={onCancelButtonClick}
      onBackButtonClick={onBackButtonClick}
      onAlertClose={onAlertClose}
      onHashSearchClick={onHashSearchClick}
      onChangeHashValue={onChangeHashValue}
    />
  );
};
