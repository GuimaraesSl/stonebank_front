/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { getBaseRequestData } from "_utils/http";
import { HttpClient } from "_config/http";
import { ApiResponse } from "_config/api";
import { ConfirmTokenSheetView } from "./ConfirmTokenSheet.view";
import { useHistory } from "react-router-dom";

interface ConfirmTokenSheetState {
  loading: boolean;
  message?: string;
  success?: boolean;
  validatedToken?: boolean;
}
interface ConfirmTokenSheetProps {
  nextRoute?: string;
  phoneNumber?: string;
  mail?: string;
  taxId?: string;
  sendType?: number;
  open: boolean;
  onClose: Function | ((tokenIsValid: boolean) => void);
}
export const ConfirmTokenSheet: React.FC<ConfirmTokenSheetProps> = ({
  open,
  taxId,
  onClose,
  phoneNumber,
  mail,
  sendType,
}) => {
  const [requestToken, setRequestToken] = React.useState("");
  const [disableConfirmButton, setDisableConfirmButton] = React.useState(true);
  const [state, setState] = React.useState<ConfirmTokenSheetState>({
    loading: false,
  });

  const history = useHistory();

  const { loading, validatedToken } = state;
  React.useEffect(() => {
    if (open) generateToken(sendType);
  }, [open]);

  React.useEffect(() => {
    if (loading) setDisableConfirmButton(true);
    if (requestToken.length === 6 && !loading) setDisableConfirmButton(false);
    else setDisableConfirmButton(true);
  }, [history, loading, requestToken.length]);

  React.useEffect(() => {
    if (validatedToken) onClose(validatedToken);
  }, [validatedToken]);

  const generateToken = async (sendType?: number) => {
    setState({ loading: true });
    try {
      const { url, defaultHeaders } = await getBaseRequestData(
        "/authorizationToken/GenerateUnauthenticatedAuthorizationToken"
      );

      const data = { taxId, phoneNumber, mail, sendType };
      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${requestToken}`,
        },
      });
      setState({
        loading: false,
        success: true,
        message: "Token gerado com sucesso, por favor aguarde o envio.",
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;
      setState({
        loading: false,
        message: response?.message ?? error.message,
      });
    }
  };
  const onConfirmClick = async () => {
    setState({ loading: true });
    try {
      const { url, token, defaultHeaders } = await getBaseRequestData(
        "/authorizationToken/ValidateUnauthenticatedAuthorizationToken"
      );
      const data = {
        code: requestToken,
        taxId,
      };
      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });
      setState({
        loading: false,
        validatedToken: true,
        message: undefined,
      });
    } catch (error: any) {
      setState({
        loading: false,
        validatedToken: false,
        message: "Não foi possível validar seu token.",
      });
    }
  };
  const onTokenChange = (token: string) => {
    setRequestToken(token);
  };

  const _onClose = React.useCallback(() => {
    onClose(validatedToken ?? false);
  }, []);

  const onResendTokenClick = React.useCallback(() => {
    generateToken();
  }, []);

  const onCloseMessage = React.useCallback(() => {
    setState({ ...state, message: undefined });
  }, []);

  return (
    <ConfirmTokenSheetView
      open={open}
      onClose={_onClose}
      token={requestToken}
      onTokenChange={onTokenChange}
      onResendTokenClick={onResendTokenClick}
      disableConfirmButton={disableConfirmButton}
      onConfirmClick={onConfirmClick}
      state={state}
      onCloseMessage={onCloseMessage}
    />
  );
};
