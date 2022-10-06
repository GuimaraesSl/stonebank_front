import { Box, Typography } from "@material-ui/core";
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
  SelectionCard,
} from "components";
import React from "react";
import { maskPhone } from "_utils/masks/phone";
import { maskCnpj, maskCpf } from "_utils/masks/taxPayer";
import { EmptyListMessage } from "./components/EmptyListMessage";
import { useStyles } from "./Keys.styles";
import { PixKeyType } from "features/pix/redux/models/pixKeyType";
import { KeyType } from "features/pix/redux/models/keyType";
import { AccountRoutes } from "features/account/constants/routes";
import { Close } from "@material-ui/icons";
import { cancelLabel } from "constants/buttons/labels";
import { AuthorizationSheet } from "components/AuthorizationSheet";
import { PixKeyStatus } from "features/pix/redux/models/pixKeyStatus";
import { PixKey } from "features/pix/redux/models/pixKey";
import { ConfirmPixKeyDeletionSheet } from "features/pix/components/ConfirmPixKeyDeletionSheet";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";

interface PixKeyListViewProps {
  pixKeyList?: PixKey[];
  onSelectPixKeyAction: (pixKey: PixKey) => void;
  openPopUpPixKeyDeletionConfirmation: boolean;
  closetPixKeyDeletionConfirmationPopUp: VoidFunction;
  onConfirmPixKeyDeletion: any;
  onTaxIdPixKeyClick: VoidFunction;
  onEmailPixKeyClick: VoidFunction;
  onPhoneNumberPixKeyClick: VoidFunction;
  onRandomPixKeyClick: VoidFunction;
  openAuthorizationSheet: boolean;
  onAuthorizationSheetClose: (event: any) => void;
  loading: boolean;
  errorMessage?: string;
  onCloseAlert: VoidFunction;
  onCancelButtonClick: VoidFunction;
  toRegisterEmail: string;
  toRegisterPhone: string;
  toRegisterTaxId: string;
}
export const PixKeyListView: React.FC<PixKeyListViewProps> = ({
  pixKeyList,
  onSelectPixKeyAction,
  openPopUpPixKeyDeletionConfirmation,
  closetPixKeyDeletionConfirmationPopUp,
  onConfirmPixKeyDeletion,
  onTaxIdPixKeyClick,
  onEmailPixKeyClick,
  onPhoneNumberPixKeyClick,
  onRandomPixKeyClick,
  openAuthorizationSheet,
  onAuthorizationSheetClose,
  loading,
  errorMessage,
  onCloseAlert,
  onCancelButtonClick,
  toRegisterEmail,
  toRegisterPhone,
  toRegisterTaxId,
}) => {
  const styles = useStyles();

  const applyMaskPixKey = (keyType: number, keyValue: string) =>
    keyType === PixKeyType.CPF
      ? maskCpf(keyValue)
      : keyType === PixKeyType.CNPJ
      ? maskCnpj(keyValue)
      : maskPhone(keyValue.substring(3));

  const mapPixKeyTypeToIcon = (keyType: number) =>
    PixKeyType.CPF === keyType || PixKeyType.CNPJ === keyType
      ? "pixTaxId"
      : PixKeyType.Email === keyType
      ? "pixMail"
      : PixKeyType.PhoneNumber === keyType
      ? "pixPhone"
      : "pixKey";

  const isRegistered = (keyType?: number) => {
    const verifyIfKeyExist = pixKeyList?.some((pixKey) => {
      if (keyType === 0 && pixKey.pixKeyType === 1) return true;

      return pixKey.pixKeyType === keyType;
    });
    return verifyIfKeyExist;
  };

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
            title="Minhas chaves Pix"
            subtitle="Gerencie e compartilhe suas chaves"
            description="Pode ser para uma conta bancária ou por mensagem de texto no celular, mesmo que o beneficiário não tenha conta bancária."
          />
        }
        main={
          <>
            <Typography className={styles.text}>Chaves cadastradas</Typography>
            <Box
              display="grid"
              gridAutoRows="1fr"
              gridRowGap={1}
              margin="0 -16px"
              className={styles.keyTypesList}
            >
              {pixKeyList?.length ? (
                <>
                  {pixKeyList?.map((pixKey, key) => {
                    return (
                      <SelectionCard
                        variant="pix"
                        title={
                          pixKey.pixKeyType! === PixKeyType.CPF ||
                          pixKey.pixKeyType! === PixKeyType.CNPJ
                            ? "CPF/CNPJ"
                            : pixKey.pixKeyType! === PixKeyType.Email
                            ? "E-mail"
                            : pixKey.pixKeyType! === PixKeyType.PhoneNumber
                            ? "Telefone"
                            : pixKey.pixKeyType! === PixKeyType.RandomKeyCode
                            ? "Chave Randômica"
                            : ""
                        }
                        key={key}
                        subtitle={
                          pixKey.pixKeyType! === PixKeyType.CPF ||
                          pixKey.pixKeyType! === PixKeyType.CNPJ ||
                          pixKey.pixKeyType! === PixKeyType.PhoneNumber
                            ? applyMaskPixKey(
                                pixKey.pixKeyType!,
                                pixKey.pixKeyValue!
                              )
                            : pixKey.pixKeyValue
                        }
                        startIcon={mapPixKeyTypeToIcon(pixKey.pixKeyType!)}
                        endLabel={
                          pixKey.status === PixKeyStatus.Registering
                            ? pixKey.pixKeyType === 2 || pixKey.pixKeyType === 3
                              ? "Confirmar"
                              : "Aguardando confirmação"
                            : "Excluir"
                        }
                        onClick={() => onSelectPixKeyAction(pixKey)}
                      />
                    );
                  })}
                </>
              ) : (
                <EmptyListMessage />
              )}
            </Box>
            <Typography className={styles.text}>
              Chaves que você pode cadastrar
            </Typography>
            <Box
              display="grid"
              gridAutoRows="1fr"
              gridRowGap={1}
              margin="0 -16px"
              className={styles.keyTypesList}
            >
              <SelectionCard
                variant="pix"
                title={KeyType.taxId.displayString}
                subtitle={toRegisterTaxId}
                startIcon={"pixTaxId"}
                onClick={onTaxIdPixKeyClick}
                className={isRegistered(0) ? "displayNone" : ""}
              />
              <SelectionCard
                variant="pix"
                title={KeyType.email.displayString}
                subtitle={toRegisterEmail}
                startIcon={"pixMail"}
                onClick={onEmailPixKeyClick}
                className={isRegistered(2) ? "displayNone" : ""}
              />
              <SelectionCard
                variant="pix"
                title={KeyType.phone.displayString}
                subtitle={toRegisterPhone}
                startIcon={"pixPhone"}
                onClick={onPhoneNumberPixKeyClick}
                className={isRegistered(3) ? "displayNone" : ""}
              />
              <SelectionCard
                variant="pix"
                title={KeyType.random.displayString}
                subtitle="Cadastrar"
                startIcon={"pixKey"}
                onClick={onRandomPixKeyClick}
                className={isRegistered(4) ? "displayNone" : ""}
              />
            </Box>
          </>
        }
        footer={<ProcessPageFooterButton backButton></ProcessPageFooterButton>}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={"error"}
          onClose={onCloseAlert}
        />
      )}
      <ConfirmPixKeyDeletionSheet
        open={openPopUpPixKeyDeletionConfirmation}
        onClose={closetPixKeyDeletionConfirmationPopUp}
        onConfirmPixKeyDeletion={onConfirmPixKeyDeletion}
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationSheetClose}
      />
    </PageContainer>
  );
};
