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
import { useStyles } from './CreateEmailPixKey.styles'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { AlertConcluded } from 'components/AlertConcluded'
import { maskTaxId } from '_utils/masks/taxId'
import { Account } from 'features/account/redux/models/account'

interface CreateEmailPixKeyProps {
  onAlertClose: VoidFunction
  errorMessage?: string
  loading: boolean
  onShowAlert: boolean
  inputValue: string
  account: Account
  error: boolean
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onCloseAlert: VoidFunction
  onClickAlert: VoidFunction
  onConfirmButtonClick: VoidFunction
  onBackButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
}
export const CreateEmailPixKeyView: React.FC<CreateEmailPixKeyProps> = ({
  onAlertClose,
  loading,
  errorMessage,
  onShowAlert,
  inputValue,
  account,
  error,
  onEmailChange,
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
            subtitle="Registrar seu E-mail como chave Pix"
            description="Você receberá um código via E-mail para confirmar a solicitação"
          />
        }
        main={
          <Box component="form" className={styles.emailInput} data-test-id="description-section">
            <TextField
              label="Email"
              placeholder="seuemail@email.com"
              inputMode="email"
              value={inputValue}
              onChange={onEmailChange}
              error={inputValue ? error : false}
              variant="outlined"
              disabled={inputValue ? true : false}
            />
            {inputValue.length > 0 && error && (
              <span className={styles.inputError}>E-mail inválido</span>
            )}
            <Typography variant="subtitle1" className={styles.importantWarning} data-test-id="section-description">
              <strong>Aviso importante</strong>
            </Typography>
            <Typography className={styles.txtalert} data-test-id="alert-description">
              Mesmo usando essa chave para realizar uma Transferência para você,
              será possível ver as seguintes informações:
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
              disabled={!inputValue}
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
