import React from "react";
import { useHistory } from "react-router-dom";
import { CreateTaxIdPixKeyView } from "./CreateTaxIdPixKey.view";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { PixRoutes } from "features/pix/constants/routes";
import {
  closeAlert,
  createPixKeyAction,
  updateState,
} from "features/pix/redux/actions";
import { useMask } from "hooks/useMask";
import { maskTaxPayer } from "_utils/masks/taxPayer";

export const CreateTaxIdPixKey: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false);
  const [onShowAlert, setShowAlert] = React.useState(false);
  const [taxId, setTaxId] = useMask(maskTaxPayer);

  const { loading, errorMessage, createPixKey } = useSelector(
    (store: StoreState) => store.pix
  );
  const { account } = useSelector((store: StoreState) => store.account);

  React.useEffect(() => {
    if (createPixKey !== undefined) {
      dispatch(updateState());
      history.push(PixRoutes.pixArea);
    }
  }, [createPixKey]);

  React.useEffect(() => {
    if (account!.taxId) setTaxId(account!.taxId);
    else setTaxId("");
  }, []);

  const onCancelButtonClick = () => {
    history.replace(PixRoutes.pixArea);
  };

  const onBackButtonClick = () => {
    dispatch(updateState());
    history.goBack();
  };

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const onAlertClose = () => {
    dispatch(closeAlert());
  };

  const onRedirectAlert = () => history.replace(PixRoutes.pixKeyList);

  const onConfirmButtonClick = React.useCallback(() => {
    setOpenAuthorizationSheet(true);
  }, []);

  const onAuthorizationSheetClose = (tokenIsValid: boolean) => {
    setOpenAuthorizationSheet(false);
    tokenIsValid && dispatch(createPixKeyAction(undefined, account?.taxId!));
  };

  const onTaxIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTaxId(event.target.value);

  return (
    <CreateTaxIdPixKeyView
      onAlertClose={onAlertClose}
      loading={loading}
      errorMessage={errorMessage}
      onShowAlert={onShowAlert}
      onCloseAlert={onCloseAlert}
      onClickAlert={onRedirectAlert}
      openAuthorizationSheet={openAuthorizationSheet}
      onAuthorizationSheetClose={onAuthorizationSheetClose}
      account={account!}
      inputValue={taxId}
      onTaxIdChange={onTaxIdChange}
      onConfirmButtonClick={onConfirmButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onBackButtonClick={onBackButtonClick}
    />
  );
};
