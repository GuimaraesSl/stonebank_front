import { Box, Grid, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {
  AppBar,
  Button,
  ButtonWithFloatingIcon,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from 'components'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'
import { cancelLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import React from 'react'
import OtpInput from 'react-otp-input'
import { useStyles } from './ConfirmEmailPixKey.styles'
import { Icon } from 'components/Icon'

interface ConfirmEmailPixKeyProps {
  subtitle: string
  token: string
  onTokenChange: (event: string) => void
  onCloseAlert: VoidFunction
  loading: boolean
  message?: string
  errorMessage?: string
  onResendTokenButtonClick: (event: any) => void
  onCancelButtonClick: VoidFunction
  onBackButtonClick: VoidFunction
  onConfirmButtonClick: VoidFunction
}

export const ConfirmEmailPixKeyView: React.FC<ConfirmEmailPixKeyProps> = ({
  subtitle,
  token,
  onTokenChange,
  loading,
  message,
  errorMessage,
  onCloseAlert,
  onResendTokenButtonClick,
  onCancelButtonClick,
  onBackButtonClick,
  onConfirmButtonClick,
}) => {
  const style = useStyles()
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
            title="Registrar chave PIX"
            subtitle={subtitle}
            description="Insira o código recebido por email para confirmar solicitação"
          />
        }
        main={
          <Box className={style.boxContent}>
            <Typography className={style.label}>Token</Typography>
            <OtpInput
              className={style.tokenInput}
              value={token}
              onChange={onTokenChange}
              isInputNum
              isInputSecure
              numInputs={6}
            />
            <Grid container justify="center" spacing={4}>
              <ButtonWithFloatingIcon
                className={style.buttonWithFloatingIcon}
                onClick={onResendTokenButtonClick}
                data-test-id="resend-token"
                icon={<Icon name="buttonBg" />}
              >
                Reenviar Token
              </ButtonWithFloatingIcon>
            </Grid>
          </Box>
        }
        footer={
          <Box className={style.footer}>
            <ProcessPageFooterButton backButton onClick={onBackButtonClick} />
            <ProcessPageFooterButton
              forwardButton
              disabled={!(token.length === 6)}
              onClick={onConfirmButtonClick}
            />
          </Box>
        }
      />
      <Loader open={loading} />
      {message && (
        <Alert
          title={'Sucesso'}
          message={message}
          severity={'success'}
          onClose={undefined}
        />
      )}
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onCloseAlert}
        />
      )}
    </PageContainer>
  )
}
