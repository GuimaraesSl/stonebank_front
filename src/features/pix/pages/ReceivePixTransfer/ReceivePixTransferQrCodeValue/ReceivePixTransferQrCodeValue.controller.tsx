import React from "react";
import { useHistory } from "react-router-dom";
import { PixRoutes } from "features/pix";
import { useDispatch, useSelector } from "react-redux";
import { parseCurrency } from "_translate";
import { maskMoney } from "_utils/masks/money";
import { useValue } from "hooks/useValue";
import { StoreState } from "redux/state";
import { ReceivePixTransferQrCodeValueView } from "./ReceivePixTransferQrCodeValue.view";
import {
  createStaticPixQrCodeAction,
  findPixQrCode,
} from "features/pix/redux/actions";

export const ReceivePixTransferQrCodeValue: React.FC = () => {
  const [valueInput, setValueInput] = useValue(maskMoney);
  const [isValidValue, setIsValidValue] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [onNextPixQRCode, setOnNextPixQRCode] = React.useState(false);
  const [optionalIdentifier, setOptionalIdentifier] = React.useState("");

  const [description, setDescription] = React.useState("");
  const [onHelpPixQRCode, setHelpPixQRCode] = React.useState(false);
  const [validatedHelpPixQRCodeSheet, setHelpPixQRCodeSheet] =
    React.useState(false);

  const [sentCreateStaticPixQrCode, setSentCreateStaticPixQrCode] =
    React.useState(false);

  const {
    pixKey,
    staticPixQrCode,
    createStaticPixQrCode,
    loading,
    errorMessage,
  } = useSelector((state: StoreState) => state.pix);

  React.useEffect(() => {
    const parsedValue = parseCurrency(valueInput);
    setIsValidValue(Number.isNaN(parsedValue) || parsedValue <= 0);
  }, [valueInput]);

  const onDoubtClick = () => {
    // history.push(PixRoutes.keyTransferMessage)
  };

  const { balance } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
  }));

  const casting = (valueInString: string) => {
    const valueCents = Number(valueInString.split(",")[1]) / 100 || 0;
    return (
      Number(valueInString.split(",")[0].replace(/[^0-9]+/g, "")) + valueCents
    );
  };

  const Identifier = [
    { id: "0", value: "Compra ou transferência" },
    { id: "1", value: "Retirar" },
    { id: "2", value: "Compra com troco" },
  ];

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const onIdentifierChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOptionalIdentifier(event.target.value);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  };
  const onHelpClick = React.useCallback(() => {
    setHelpPixQRCode(true);
  }, []);

  const onHelpPixQRCodeClose = (HelpPixQRCodeValid: boolean) => {
    if (HelpPixQRCodeValid) setHelpPixQRCodeSheet(true);
    setHelpPixQRCode(false);
  };

  // React.useEffect(() => {
  //   if (onNextPixQRCode && qrCodeState instanceof SuccessPixState) {
  //     history.push(PixRoutes.checkPixQRCode)
  //   }
  // }, [history, onNextPixQRCode, qrCodeState])

  const onAlertClose = () => {
    // dispatch(closeAlert())
  };

  const onSubmit = (e: React.FormEvent) => {
    // e.preventDefault()
    // setOnNextPixQRCode(true)
    // dispatch(
    //   updateStaticPixQRCode({
    //     ...pixQrCodeStatic,
    //     additionalData: description,
    //     pixTransactionPurpose: Number(optionalIdentifier),
    //     principalValue: casting(valueInput),
    //   }),
    // )
    // dispatch(
    //   generateStaticPixQRCode({
    //     additionalData: description,
    //     pixTransactionPurpose: Number(optionalIdentifier),
    //     principalValue: casting(valueInput),
    //   }),
    // )
  };

  //-------------------------------------------------------------------------------------

  const onConfirmButtonClick = () => {
    dispatch(
      createStaticPixQrCodeAction(
        casting(valueInput),
        pixKey?.pixKeyValue,
        pixKey?.pixKeyType,
        undefined,
        Number(optionalIdentifier),
        description
      )
    );
    setSentCreateStaticPixQrCode(true);
  };

  React.useEffect(() => {
    if (createStaticPixQrCode && sentCreateStaticPixQrCode)
      dispatch(findPixQrCode(createStaticPixQrCode));
  }, [createStaticPixQrCode]);

  React.useEffect(() => {
    if (staticPixQrCode && sentCreateStaticPixQrCode) {
      history.push(PixRoutes.receivePixTransferQrCodeCheck, {
        principalValue: casting(valueInput),
      });
    }
  }, [staticPixQrCode]);

  //-------------------------------------------------------------------------------------

  React.useEffect(() => {
    setIsValidValue(!valueInput);
  }, []);

  const onCancelButtonClick = React.useCallback(() => {
    history.replace(PixRoutes.pixArea);
  }, []);

  return (
    <ReceivePixTransferQrCodeValueView
      onValueChange={onValueChange}
      onCancelButtonClick={onCancelButtonClick}
      isValidValue={isValidValue}
      valueInput={valueInput}
      onSubmit={onSubmit}
      onConfirmButtonClick={onConfirmButtonClick}
      onDescriptionChange={onDescriptionChange}
      description={description}
      onIdentifierChange={onIdentifierChange}
      onDoubtClick={onDoubtClick}
      onHelpClick={onHelpClick}
      onHelpPixQRCode={onHelpPixQRCode}
      onHelpPixQRCodeClose={onHelpPixQRCodeClose}
      loading={loading}
      errorMessage={errorMessage}
      onAlertClose={onAlertClose}
      Identifier={Identifier}
      optionalIdentifier={optionalIdentifier}
      pixKey={pixKey!}
    />
  );
};
