import React from "react";
import { useHistory } from "react-router-dom";
import { CreateEmailPixKeyView } from "./CreateEmailPixKey.view";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "redux/state";
import { PixRoutes } from "features/pix/constants/routes";
import {
  closeAlert,
  createPixKeyAction,
  resendPixKeyTokenAction,
  updateState,
} from "features/pix/redux/actions";
import { PixKeyType } from "features/pix/redux/models/pixKeyType";
import { validateEmail } from "_utils/validate";

export const CreateEmailPixKey: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [mail, setEmail] = React.useState("");
  const [error, setError] = React.useState<boolean>(false);

  const [onShowAlert, setShowAlert] = React.useState(false);
  const { loading, errorMessage, createPixKey, resendPixKeyToken } =
    useSelector((store: StoreState) => store.pix);
  const { account } = useSelector((store: StoreState) => store.account);

  const { user } = useSelector((store: StoreState) => store.auth);

  React.useEffect(() => {
    if (createPixKey !== undefined) {
      dispatch(
        resendPixKeyTokenAction({
          pixKeyValue: mail,
          pixKeyType: PixKeyType.Email,
        })
      );
    }
  }, [createPixKey]);

  React.useEffect(() => {
    if (resendPixKeyToken) {
      history.push(PixRoutes.confirmEmailPixKeyToken, {
        pixKeyValue: mail,
      });
    }
  }, [resendPixKeyToken]);

  React.useEffect(() => {
    if (user?.mail) setEmail(user!.mail);
    else setEmail("");
  }, []);

  React.useEffect(() => {
    validateError();
  }, [mail]);

  const validateError = () => {
    if (validateEmail(mail)) setError(false);
    else setError(true);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

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

  const onConfirmButtonClick = () => {
    dispatch(createPixKeyAction(PixKeyType.Email, mail));
  };

  return (
    <CreateEmailPixKeyView
      onAlertClose={onAlertClose}
      loading={loading}
      errorMessage={errorMessage}
      onShowAlert={onShowAlert}
      onCloseAlert={onCloseAlert}
      onClickAlert={onRedirectAlert}
      inputValue={mail}
      account={account!}
      error={error}
      onEmailChange={onEmailChange}
      onConfirmButtonClick={onConfirmButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onBackButtonClick={onBackButtonClick}
    />
  );
};
