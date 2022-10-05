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
import { useStyles } from "./BankDataPixTransferBranch.style";

interface BankDataPixTransferBranchViewProps {
  toBankBranch: string;
  isValidValue: boolean;
  onConfirmButtonClick: VoidFunction;
  onCancelButtonClick: VoidFunction;
  onToBankBranchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const BankDataPixTransferBranchView: React.FC<
  BankDataPixTransferBranchViewProps
> = ({
  toBankBranch,
  isValidValue,
  onConfirmButtonClick,
  onToBankBranchChange,
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
                startIcon={<Close color="inherit" />}
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
            subtitle="Qual o número da agência?"
            description="Informe o número completo da agência, incluindo o dígito."
          />
        }
        main={
          <Box component="form" onSubmit={onConfirmButtonClick}>
            <TextField
              label="Agência"
              placeholder="Digite apenas números"
              inputMode="numeric"
              value={toBankBranch}
              onChange={onToBankBranchChange}
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
