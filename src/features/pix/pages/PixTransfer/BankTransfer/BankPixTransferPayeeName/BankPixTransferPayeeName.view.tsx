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
import { useStyles } from "./BankPixTransferPayeeName.style";
import { AccountRoutes } from "features/account/constants/routes";

interface BankPixTransferPayeeNameViewProps {
  toName: string;
  isValidValue: boolean;
  onConfirmButtonClick: VoidFunction;
  onCancelButtonClick: VoidFunction;
  onToNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const BankPixTransferPayeeNameView: React.FC<
  BankPixTransferPayeeNameViewProps
> = ({
  toName,
  isValidValue,
  onConfirmButtonClick,
  onToNameChange,
  onCancelButtonClick,
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
            subtitle="Você pode fazer um PIX inserindo os dados bancários completos"
            description="Primeiro, qual o nome de quem receberá seu Pix?"
          />
        }
        main={
          <Box component="form" onSubmit={onConfirmButtonClick}>
            <TextField
              label="Nome completo"
              placeholder="Digite aqui"
              value={toName}
              onChange={onToNameChange}
            />
          </Box>
        }
        footer={
          <Box className={style.footer}>
            <ProcessPageFooterButton backButton />
            <ProcessPageFooterButton
              forwardButton
              disabled={isValidValue}
              onClick={onConfirmButtonClick}
            />
          </Box>
        }
      />
    </PageContainer>
  );
};
