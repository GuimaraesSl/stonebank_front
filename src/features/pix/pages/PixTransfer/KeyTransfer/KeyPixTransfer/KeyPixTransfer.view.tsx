/* eslint-disable no-control-regex */
import React from "react";
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
  TextField,
} from "components";
import { PixKeyTypeButtonList } from "./components";
import { Box } from "@material-ui/core";
import { cancelLabel } from "constants/buttons/labels";
import { Close } from "@material-ui/icons";
import { AccountRoutes } from "features/account/constants/routes";
import { Loader } from "components/Loader";
import { KeyType } from "features/pix/redux/models/keyType";
import { useStyles } from "./KeyPixTransfer.style";
import { Alert } from "components/Alert";

interface KeyPixTransferViewProps {
  pixKeyValue: string;
  onKeyValueChange: React.ChangeEventHandler<HTMLInputElement>;
  selectedKeyType: KeyType;
  onKeyTypeChange: (_: KeyType) => void;
  keyIsValid?: boolean;
  loading: boolean;
  errorMessage?: string;
  // onSubmit: React.FormEventHandler
  onAlertClose: VoidFunction;
  onCancelButtonClick: VoidFunction;
  onConfirmButtonClick: VoidFunction;
}

export const KeyPixTransferView: React.FC<KeyPixTransferViewProps> = ({
  pixKeyValue,
  onKeyValueChange,
  selectedKeyType,
  onKeyTypeChange,
  keyIsValid,
  loading,
  errorMessage,
  // onSubmit,
  onAlertClose,
  onCancelButtonClick,
  onConfirmButtonClick,
}) => {
  const styles = useStyles();
  const placeholder = React.useMemo(() => {
    switch (selectedKeyType) {
      case KeyType.phone:
        return "Celular do destinatário";

      case KeyType.taxId:
        return "CPF/CNPJ do destinatário";

      case KeyType.email:
        return "E-mail do destinatário";

      case KeyType.random:
        return "Chave aleatória do destinatário";
    }
  }, [selectedKeyType]);

  const inputMode = React.useMemo(() => {
    switch (selectedKeyType) {
      case KeyType.phone:
        return "tel";

      case KeyType.taxId:
        return "numeric";

      case KeyType.email:
        return "email";

      case KeyType.random:
        return "text";
    }
  }, [selectedKeyType]);

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={AccountRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="primary" />}
                onClick={onCancelButtonClick}
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Transferência com PIX"
            subtitle="Utilizando chave Pix"
            description="Insira a chave fornecida pelo beneficiário."
          />
        }
        main={
          <Box
            display="grid"
            gridAutoRows="auto"
            component="form"
            // onSubmit={onSubmit}
          >
            <PixKeyTypeButtonList onKeyTypeChange={onKeyTypeChange} />
            <TextField
              label={""}
              inputMode={inputMode}
              placeholder={placeholder}
              value={pixKeyValue}
              onChange={onKeyValueChange}
            />
          </Box>
        }
        footer={
          <Box className={styles.footer}>
            <ProcessPageFooterButton backButton />
            <ProcessPageFooterButton
              forwardButton
              disabled={!keyIsValid}
              onClick={onConfirmButtonClick}
            />
          </Box>
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={"error"}
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  );
};
