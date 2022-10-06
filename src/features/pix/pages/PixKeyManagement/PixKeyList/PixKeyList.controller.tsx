import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PixKeyListView } from "./PixKeyList.view";
import { PixRoutes } from "features/pix/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelPixKeyAction,
  closeAlert,
  resendPixKeyTokenAction,
  selectPixKey,
  updateState,
} from "features/pix/redux/actions";
import { StoreState } from "redux/state";
import { PixKey } from "features/pix/redux/models/pixKey";
import { PixKeyStatus } from "features/pix/redux/models/pixKeyStatus";
import { PixKeyType } from "features/pix/redux/models/pixKeyType";

export const PixKeyList: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [taxId, setTaxId] = useState("");

  const { user } = useSelector((store: StoreState) => store.auth);
  const pixState = useSelector((state: StoreState) => state.pix);
  const {
    pixKey,
    pixKeyList,
    loading,
    errorMessage,
    resendPixKeyToken,
    cancelPixKey,
  } = pixState;

  const [popUpPixKeyDeletionConfirmation, setPopUpPixKeyDeletionConfirmation] =
    React.useState(false);

  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false);

  const [sentRequest, setSentRequest] = React.useState(false);

  const onSelectPixKeyAction = (pixKey: PixKey) => {
    dispatch(selectPixKey(pixKey));

    if (pixKey.status !== PixKeyStatus.Registering)
      setPopUpPixKeyDeletionConfirmation(true);
  };

  //------------------------------------------------------

  React.useEffect(() => {
    if (
      pixKey &&
      pixKey.pixKeyType === PixKeyType.Email &&
      pixKey.status === PixKeyStatus.Registering
    ) {
      dispatch(resendPixKeyTokenAction(pixState.pixKey));
    }
  }, [pixKey]);

  React.useEffect(() => {
    if (
      pixState.pixKey &&
      pixState.pixKey.pixKeyType === PixKeyType.PhoneNumber
    ) {
      dispatch(resendPixKeyTokenAction(pixState.pixKey));
      setSentRequest(true);
    }
  }, [pixState.pixKey]);

  React.useEffect(() => {
    if (resendPixKeyToken && pixKey!.pixKeyType === PixKeyType.Email)
      history.push(PixRoutes.confirmEmailPixKeyToken, {
        pixKeyValue: pixState.pixKey?.pixKeyValue,
      });
  }, [resendPixKeyToken]);

  React.useEffect(() => {
    if (
      resendPixKeyToken &&
      pixKey!.pixKeyType === PixKeyType.PhoneNumber &&
      pixKey!.status === PixKeyStatus.Registering
    )
      history.push(PixRoutes.confirmPhoneNumberPixKeyToken, {
        pixKeyValue: pixState.pixKey?.pixKeyValue,
      });
  }, [resendPixKeyToken]);

  React.useEffect(() => {
    if (user?.mail) setEmail(user!.mail);
    if (user?.phoneNumber) setPhone(user!.phoneNumber);
    if (user?.taxId) setTaxId(user!.taxId);
  }, []);

  //------------------------------------------------------

  React.useEffect(() => {
    if (cancelPixKey) {
      dispatch(updateState());
      history.push(PixRoutes.pixArea);
    }
  }, [cancelPixKey]);

  const closetPixKeyDeletionConfirmationPopUp = () => {
    setPopUpPixKeyDeletionConfirmation(false);
  };

  const onConfirmPixKeyDeletion = React.useCallback(() => {
    closetPixKeyDeletionConfirmationPopUp();
    setOpenAuthorizationSheet(true);
  }, []);

  const onTaxIdPixKeyClick = React.useCallback(() => {
    dispatch(updateState());
    history.push(PixRoutes.createTaxIdPixKey);
  }, []);

  const onRandomPixKeyClick = React.useCallback(() => {
    dispatch(updateState());
    history.push(PixRoutes.createRandomPixKey);
  }, []);

  const onEmailPixKeyClick = React.useCallback(() => {
    dispatch(updateState());
    history.push(PixRoutes.createEmailPixKey);
  }, []);

  const onPhoneNumberPixKeyClick = React.useCallback(() => {
    dispatch(updateState());
    history.push(PixRoutes.createPhoneNumberPixKey);
  }, []);

  const onAuthorizationSheetClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) dispatch(cancelPixKeyAction(pixState.pixKey!));

    setSentRequest(true);
    setOpenAuthorizationSheet(false);
  };

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updateState());
    history.push(PixRoutes.pixArea);
  }, []);

  const onCloseAlert = () => {
    dispatch(closeAlert());
  };

  return (
    <PixKeyListView
      pixKeyList={pixKeyList}
      onSelectPixKeyAction={onSelectPixKeyAction}
      openPopUpPixKeyDeletionConfirmation={popUpPixKeyDeletionConfirmation}
      closetPixKeyDeletionConfirmationPopUp={
        closetPixKeyDeletionConfirmationPopUp
      }
      onConfirmPixKeyDeletion={onConfirmPixKeyDeletion}
      // loading={loading}
      // showAlert={showAlert}
      // onCloseAlert={onCloseAlert}
      // onClickAlert={onClickAlert}
      // errorMessage={errorMessage}
      onTaxIdPixKeyClick={onTaxIdPixKeyClick}
      onEmailPixKeyClick={onEmailPixKeyClick}
      onPhoneNumberPixKeyClick={onPhoneNumberPixKeyClick}
      onRandomPixKeyClick={onRandomPixKeyClick}
      openAuthorizationSheet={openAuthorizationSheet}
      onAuthorizationSheetClose={onAuthorizationSheetClose}
      loading={loading}
      errorMessage={errorMessage}
      onCloseAlert={onCloseAlert}
      onCancelButtonClick={onCancelButtonClick}
      toRegisterEmail={email}
      toRegisterPhone={phone}
      toRegisterTaxId={taxId}
    />
  );
};
