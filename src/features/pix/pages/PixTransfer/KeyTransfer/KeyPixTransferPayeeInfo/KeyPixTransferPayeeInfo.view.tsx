/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from "components";
import { cancelLabel } from "constants/buttons/labels";
import { useStyles } from "./KeyPixTransferPayeeInfo.style";
import { AccountRoutes } from "features/account/constants/routes";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";
interface KeyPixTransferPayeeInfoViewProps {
  onCancelButtonClick: VoidFunction;
  payeeName?: string;
  payeePixKeyValueText?: string;
  loading: boolean;
  errorMessage?: string;
  onConfirmButtonClick: VoidFunction;
}
export const KeyPixTransferPayeeInfoView: React.FC<
  KeyPixTransferPayeeInfoViewProps
> = ({
  onCancelButtonClick,
  payeeName,
  payeePixKeyValueText,
  loading,
  errorMessage,
  onConfirmButtonClick,
}) => {
  const styles = useStyles();
  return (
    <PageContainer className={styles.page}>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={AccountRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="inherit" />}
                onClick={onCancelButtonClick}
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Transferência com PIX"
            subtitle="Recebedor"
            description="Confira, cuidadosamente, quem receberá de seu PIX."
          />
        }
        main={
          <Box className={styles.payeeInfo}>
            <Typography variant="h6">{payeeName}</Typography>
            {/* TODO: Parametrizar exibição do tipo de chave */}
            <Typography>{payeePixKeyValueText}</Typography>
          </Box>
        }
        footer={
          <Box className={styles.footer}>
            <ProcessPageFooterButton backButton />
            <ProcessPageFooterButton
              forwardButton
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
