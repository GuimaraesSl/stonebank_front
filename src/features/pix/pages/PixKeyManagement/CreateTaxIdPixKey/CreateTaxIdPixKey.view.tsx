import React from "react";
import { PageContainer } from "components/PageContainer";
import { AccountRoutes } from "features/account/constants/routes";
import { AppBar } from "components/AppBar";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { cancelLabel } from "constants/buttons/labels";
import { Button } from "components/Button";
import { Close } from "@material-ui/icons";
import { Box, Typography } from "@material-ui/core";
import { ProcessPageFooterButton, TextField } from "components";
import { useStyles } from "./CreateTaxIdPixKey.styles";
import { AuthorizationSheet } from "components/AuthorizationSheet";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";
import { AlertConcluded } from "components/AlertConcluded";
import { maskTaxId } from "_utils/masks/taxId";
import { Account } from "features/account/redux/models/account";

interface CreateTaxIdPixKeyProps {
  openAuthorizationSheet: boolean;
  onAlertClose: VoidFunction;
  onAuthorizationSheetClose: (event: any) => void;
  errorMessage?: string;
  loading: boolean;
  onShowAlert: boolean;
  account: Account;
  inputValue: string;
  onTaxIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseAlert: VoidFunction;
  onClickAlert: VoidFunction;
  onConfirmButtonClick: VoidFunction;
  onBackButtonClick: VoidFunction;
  onCancelButtonClick: VoidFunction;
}
export const CreateTaxIdPixKeyView: React.FC<CreateTaxIdPixKeyProps> = ({
  openAuthorizationSheet,
  onAuthorizationSheetClose,
  onAlertClose,
  loading,
  errorMessage,
  onShowAlert,
  account,
  inputValue,
  onTaxIdChange,
  onCloseAlert,
  onClickAlert,
  onConfirmButtonClick,
  onBackButtonClick,
  onCancelButtonClick,
}) => {
  const styles = useStyles();

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
            title="Registrar Chave Pix"
            subtitle="Registrar seu CPF/CNPJ como chave Pix"
            description="Informe o CPF ou CNPJ"
          />
        }
        main={
          <Box
            component="form"
            onSubmit={onConfirmButtonClick}
            className={styles.taxIdInput}
          >
            <TextField
              label="CPF ou CNPJ"
              placeholder="Digite apenas números"
              inputMode="numeric"
              value={inputValue}
              onChange={onTaxIdChange}
              disabled={inputValue ? true : false}
            />
            <Typography
              variant="subtitle1"
              className={styles.importantWarning}
              data-test-id="section-description"
            >
              <strong>Aviso importante</strong>
            </Typography>
            <Typography
              className={styles.txtalert}
              data-test-id="alert-description"
            >
              Mesmo usando essa chave para realizar uma Transferência para você,
              será possível ver as seguintes informações
            </Typography>
            <Box>
              <Typography
                className={styles.componentName}
                data-test-id="account-name-description"
              >
                {account!.name}
              </Typography>
              <Typography
                className={styles.componentCpf_Cnpj}
                data-test-id="identify-description"
              >
                CPF/CNPJ:{maskTaxId(account!.taxId)}
              </Typography>
            </Box>
          </Box>
        }
        footer={
          <Box className={styles.footer}>
            <ProcessPageFooterButton backButton onClick={onBackButtonClick} />
            <ProcessPageFooterButton
              forwardButton
              disabled={!(inputValue.length === 14 || inputValue.length === 18)}
              onClick={onConfirmButtonClick}
            />
          </Box>
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationSheetClose}
      />
      <AlertConcluded
        open={onShowAlert}
        onClose={onCloseAlert}
        onClick={onClickAlert}
        title={"Chave Cadastrada"}
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
