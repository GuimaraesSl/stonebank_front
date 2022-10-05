/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
  TextField,
} from "components";
import { cancelLabel } from "constants/buttons/labels";
import { AccountRoutes } from "features/account/constants/routes";
import { useStyles } from "./BankPixTransferPayeeTaxId.style";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";

interface BankPixTransferPayeeTaxIdViewProps {
  toTaxId: string;
  isValidValue: boolean;
  loading: boolean;
  errorMessage?: string;
  onConfirmButtonClick: VoidFunction;
  onBackButtonClick: VoidFunction;
  onCancelButtonClick: VoidFunction;
  onTaxIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const BankPixTransferPayeeTaxIdView: React.FC<
  BankPixTransferPayeeTaxIdViewProps
> = ({
  toTaxId,
  isValidValue,
  loading,
  errorMessage,
  onConfirmButtonClick,
  onBackButtonClick,
  onCancelButtonClick,
  onTaxIdChange,
}) => {
  const style = useStyles();

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
            title="Transferência com Pix"
            subtitle="Informe o CPF ou CNPJ de quem receberá sua transferência"
          />
        }
        main={
          <Box component="form" onSubmit={onConfirmButtonClick}>
            <TextField
              label="CPF/CNPJ"
              placeholder="Digite aqui"
              inputMode="numeric"
              value={toTaxId}
              onChange={onTaxIdChange}
            />
          </Box>
        }
        footer={
          <Box className={style.footer}>
            <ProcessPageFooterButton backButton onClick={onBackButtonClick} />
            <ProcessPageFooterButton
              forwardButton
              disabled={!isValidValue}
              onClick={onConfirmButtonClick}
            />
          </Box>
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Erro" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  );
};
