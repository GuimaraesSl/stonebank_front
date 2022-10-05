import { PixRoutes } from "features/pix/constants/routes";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BankPixTransferSummaryView } from "./BankPixTransferSummary.view";
import { StoreState } from "redux/state";
import {
  createPixTransferAction,
  updateState,
} from "features/pix/redux/actions";

export const BankPixTransferSummary: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [validatedToken, setValidatedToken] = React.useState(false);

  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false);

  const { pixTransfer, createPixTransfer, loading, errorMessage } = useSelector(
    (state: StoreState) => state.pix
  );

  React.useEffect(() => {
    if (validatedToken && createPixTransfer)
      history.replace(PixRoutes.keyPixTransferProcess);
  }, [createPixTransfer]);

  // React.useEffect(() => {
  //   setPixKeyType(pixState.pixKeyType?.displayString!)
  // }, [pixState])

  // React.useEffect(() => {
  //   setPixDate(pixState?.paymentDate!)
  //   setValue(pixState?.value!)
  // }, [pixState])

  const onConfirmButtonClick = () => {
    setOpenAuthorizationSheet(true);
  };

  const onCancelButtonClick = () => {
    dispatch(updateState());
    history.push(PixRoutes.pixArea);
  };

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      setValidatedToken(true);
      dispatch(createPixTransferAction());
    }
    setOpenAuthorizationSheet(false);
  };

  return (
    <BankPixTransferSummaryView
      loading={loading}
      pixTransfer={pixTransfer}
      errorMessage={errorMessage}
      openAuthorizationSheet={openAuthorizationSheet}
      onCancelButtonClick={onCancelButtonClick}
      onConfirmButtonClick={onConfirmButtonClick}
      onAuthorizationClose={onAuthorizationClose}
    />
  );
};
