import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { cancelLabel } from 'constants/buttons/labels'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { Box, Typography } from '@material-ui/core'
import { ProcessPageFooterButton, TextField } from 'components'
import { useStyles } from './CreatePhoneNumberPixKey.styles'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { AlertConcluded } from 'components/AlertConcluded'
import { maskTaxId } from '_utils/masks/taxId'
import { Account } from 'features/account/redux/models/account'

interface CreatePhoneNumberPixKeyProps {
  onAlertClose: VoidFunction
  errorMessage?: string
  loading: boolean
  onShowAlert: boolean
  inputValue: string
  account: Account
  onPhoneNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onCloseAlert: VoidFunction
  onClickAlert: VoidFunction
  onConfirmButtonClick: VoidFunction
  onBackButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
}
export const CreatePhoneNumberPixKeyView: React.FC<
  CreatePhoneNumberPixKeyProps
> = ({
  onAlertClose,
  loading,
  errorMessage,
  onShowAlert,
  inputValue,
  account,
  onPhoneNumberChange,
  onCloseAlert,
  onClickAlert,
  onConfirmButtonClick,
  onBackButtonClick,
  onCancelButtonClick,
}) => {
  const styles = useStyles()

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
            subtitle="Registrar seu celular como chave Pix"
            description="Você receberá um código via SMS para confirmar a solicitação"
          />
        }
        main={
          <Box component="form" className={styles.phoneInput}>
            <TextField
              label="Número de celular"
              placeholder="(XX) XXXX.XXXX"
              value={inputValue}
              onChange={onPhoneNumberChange}
              inputMode={'numeric'}
              disabled={inputValue ? true : false}
            />
            <Typography variant="subtitle1" className={styles.importantWarning} data-test-id="section-description">
              <strong>Aviso importante</strong>
            </Typography>
            <Typography className={styles.txtalert} data-test-id="alert-description">
              Todos os demais usuário do Pix poderão saber que você tem uma
              chave Pix de e-mail ou de número de telefone celular registrada,
              porém, sua chave não será exibida. Mesmo usando essa chave para
              realizar uma transferência para você, o pagador verá as seguintes
              informações:
            </Typography>
            <Box>
              <Typography className={styles.componentName} data-test-id="account-name-description">
                {account!.name}
              </Typography>
              <Typography className={styles.componentCpf_Cnpj} data-test-id="identify-description">
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
              disabled={!(inputValue.length === 16)}
              onClick={onConfirmButtonClick}
            />
          </Box>
        }
      />
      <AlertConcluded
        open={onShowAlert}
        onClose={onCloseAlert}
        onClick={onClickAlert}
        title={'Chave Cadastrada'}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  )
}
