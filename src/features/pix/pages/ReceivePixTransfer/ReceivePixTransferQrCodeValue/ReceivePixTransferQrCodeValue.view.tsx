import React from "react";
import { AppBar } from "components/AppBar";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { AccountRoutes } from "features/account/constants/routes";
import { cancelLabel } from "constants/buttons/labels";
import { PageContainer } from "components/PageContainer";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { Button } from "components/Button";
import { Close } from "@material-ui/icons";
import { Box, Grid, MenuItem } from "@material-ui/core";
import {
  ProcessPageFooterButton,
  TextField,
  TransparentTextField,
} from "components";
import { ErrorMessage } from "components/ErrorMessage";
import { ActionListItem } from "components/ActionListItem";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";
import { useStyles } from "./ReceivePixTransferQrCodeValue.style";
import { SelectionButton } from "features/pix/components/SelectionButton";
import { maskCnpj, maskCpf } from "_utils/masks/taxPayer";
import { PixKeyType } from "features/pix/redux/models/pixKeyType";
import { maskPhone } from "_utils/masks/phone";
import { Icon } from "components/Icon";
import { HelpPixQrCode } from "./components/HelpPixQrCode";
import { PixKey } from "features/pix/redux/models/pixKey";

interface ReceivePixTransferQrCodeValueViewProps {
  onCancelButtonClick: VoidFunction;
  isValidValue: boolean;
  valueInput: string;
  onSubmit: (e: React.FormEvent) => void;
  onConfirmButtonClick: VoidFunction;
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
  onIdentifierChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDoubtClick: VoidFunction;
  onHelpClick: VoidFunction;
  onHelpPixQRCode: boolean;
  onHelpPixQRCodeClose: Function | ((HelpPixQRCodeValid: boolean) => void);
  loading: boolean;
  errorMessage: string | undefined;
  onAlertClose: VoidFunction;
  Identifier: { id: string; value: string }[];
  optionalIdentifier: string;
  pixKeyType?: number;
  payeeValue?: string;
  pixKey: PixKey;
}

export const ReceivePixTransferQrCodeValueView: React.FC<
  ReceivePixTransferQrCodeValueViewProps
> = ({
  onCancelButtonClick,
  isValidValue,
  valueInput,
  onSubmit,
  onConfirmButtonClick,
  onValueChange,
  onDescriptionChange,
  description,
  onIdentifierChange,
  onHelpClick,
  onHelpPixQRCode,
  onHelpPixQRCodeClose,
  loading,
  errorMessage,
  onAlertClose,
  Identifier,
  optionalIdentifier,
  pixKey,
}) => {
  const styles = useStyles();

  const applyMaskPixKey = (keyType: number, keyValue: string) =>
    keyType === PixKeyType.CPF
      ? maskCpf(keyValue)
      : keyType === PixKeyType.CNPJ
      ? maskCnpj(keyValue)
      : maskPhone(keyValue);

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
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <React.Fragment>
            <ProcessDescriptionHeader title="Receber pagamento via PIX" />
            <Grid
              container
              direction="column"
              spacing={1}
              className={styles.subheader}
            >
              <TransparentTextField
                label="Qual o valor do Pix?"
                value={valueInput}
                onChange={onValueChange}
              />
            </Grid>
          </React.Fragment>
        }
        main={
          <Grid container direction="column">
            <Box className={styles.text}>
              <TextField
                label="Envie uma mensagem(opcional)"
                placeholder="Escreva sua mensagem"
                value={description}
                onChange={onDescriptionChange}
              />
            </Box>

            <Grid item className={styles.optionalIdentifier}>
              <TextField
                label="Identificador"
                value={optionalIdentifier}
                onChange={onIdentifierChange}
                select
              >
                {Identifier.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Box>
              <ActionListItem onClick={onHelpClick}>Dúvida?</ActionListItem>
            </Box>
            <Box className={styles.receiverSection}>
              <SelectionButton
                id="receiver-info-card"
                title="Chave Selecionada"
                subtitle={
                  pixKey.pixKeyType! === PixKeyType.CPF ||
                  pixKey.pixKeyType! === PixKeyType.CNPJ ||
                  pixKey.pixKeyType! === PixKeyType.PhoneNumber
                    ? applyMaskPixKey(pixKey.pixKeyType!, pixKey.pixKeyValue!)
                    : pixKey.pixKeyValue
                }
                startIcon={<Icon name="check" />}
              />
            </Box>
          </Grid>
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
        <Alert
          title="Erro"
          message={errorMessage}
          severity={"error"}
          onClose={onAlertClose}
        />
      )}
      <HelpPixQrCode open={onHelpPixQRCode} onClose={onHelpPixQRCodeClose} />
    </PageContainer>
  );
};
