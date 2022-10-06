import React from "react";
import { PixRoutes } from "features/pix/constants/routes";
import {
  closeAlert,
  confirmPixKeyHoldAction,
  resendPixKeyTokenAction,
  updateState,
} from "features/pix/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { StoreState } from "redux/state";
import { ConfirmEmailPixKeyView } from "./ConfirmEmailPixKey.view";
import { PixKeyType } from "features/pix/redux/models/pixKeyType";

export const ConfirmEmailPixKey: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();
  const [token, setToken] = React.useState("");
  const [message, setMessage] = React.useState("");
  const pixState = useSelector((store: StoreState) => store.pix);
  const { errorMessage, loading, createPixKey, confirmPixKeyHold } = pixState;

  const { pixKeyValue } = state as any;

  const subtitle = `Confirmar e-mail ${pixKeyValue}`;

  React.useEffect(() => {
    if (confirmPixKeyHold) {
      dispatch(updateState());
      history.replace(PixRoutes.pixArea);
    }
  }, [pixState.confirmPixKeyHold]);

  // React.useEffect(() => {
  //   onResendTokenButtonClick()
  // }, [])

  // const onDefineClick = () => {
  //   dispatch(
  //     confirmPixKeyHold(pixKey?.pixKeyValue!, KeyType.email.value, token),
  //   )
  //   setSentRequest(true)
  // }

  const onCancelButtonClick = () => {
    dispatch(updateState());
    history.replace(PixRoutes.pixArea);
  };

  const onBackButtonClick = () => {
    dispatch(updateState());
    history.goBack();
  };

  const onConfirmButtonClick = () => {
    dispatch(confirmPixKeyHoldAction(pixKeyValue, PixKeyType.Email, token));
  };

  const onTokenChange = (e: string) => setToken(e);

  const onCloseAlert = () => {
    dispatch(closeAlert());
  };

  const onResendTokenButtonClick = async () => {
    dispatch(
      resendPixKeyTokenAction({
        pixKeyValue: createPixKey,
        pixKeyType: PixKeyType.Email,
      })
    );
    setMessage("Token Reenviado");
  };

  return (
    <ConfirmEmailPixKeyView
      subtitle={subtitle}
      token={token}
      onTokenChange={onTokenChange}
      loading={loading}
      message={message}
      errorMessage={errorMessage}
      onCloseAlert={onCloseAlert}
      onResendTokenButtonClick={onResendTokenButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onBackButtonClick={onBackButtonClick}
      onConfirmButtonClick={onConfirmButtonClick}
    />
  );
};
