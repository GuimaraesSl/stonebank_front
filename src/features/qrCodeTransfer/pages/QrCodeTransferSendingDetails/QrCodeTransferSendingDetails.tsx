import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyles } from './QrCodeTransferSendingDetails.style'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { useHistory } from 'react-router-dom'
import { Button } from 'components/Button'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Box, Grid, Typography } from '@material-ui/core'
import { CurrencyFormatter } from '_translate'
import {
  sendQrCodeTransfer,
  updateQrCodeTransferState,
} from 'features/qrCodeTransfer/redux/actions'
import {
  InitialQrCodeTransferState,
  LoadingQrCodeTransferState,
  QrCodeTransferState,
  SuccessQrCodeTransferState,
} from 'features/qrCodeTransfer/redux/state'
import { Loader } from 'components/Loader'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Alert } from 'components/Alert'
import { QrCodeTransferRoutes } from 'features/qrCodeTransfer/constants/routes'
import { usePrevious } from 'hooks/usePrevious'
import { OperationType } from 'features/account/redux/models/operationType'
import { ErrorMessage } from 'components/ErrorMessage'

export const QrCodeTransferSendingDetails: React.FC = () => {
  const [qrCodeTransferState, balance, loading, errorMessage] = useSelector<
    StoreState,
    [QrCodeTransferState, number | undefined, boolean, string | undefined]
  >(state => [
    state.qrCodeTransfer,
    state.account.dashboard?.balance,
    state.qrCodeTransfer.loading,
    state.qrCodeTransfer.errorMessage,
  ])

  const previousQrCodeTransferState = usePrevious(qrCodeTransferState)
  const [balanceIsSufficient, setBalanceIsSufficient] = React.useState(false)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  const history = useHistory()
  const dispatch = useDispatch()
  const styles = useStyles()

  React.useEffect(() => {
    if (
      qrCodeTransferState instanceof SuccessQrCodeTransferState &&
      previousQrCodeTransferState instanceof LoadingQrCodeTransferState
    )
      history.push({
        pathname: QrCodeTransferRoutes.completedTransfer,
        state: OperationType.qrCode,
      })
  }, [history, previousQrCodeTransferState, qrCodeTransferState])

  React.useEffect(() => {
    if (qrCodeTransferState.transferenceData!.value < balance!)
      setBalanceIsSufficient(true)
  }, [qrCodeTransferState])

  const _resetState = () =>
    dispatch(updateQrCodeTransferState(new InitialQrCodeTransferState()))

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    _resetState()
  }

  const onNextButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const onAuthorizationSheetClose = (tokenIsValid: boolean) => {
    setOpenAuthorizationSheet(false)
    if (tokenIsValid) dispatch(sendQrCodeTransfer())
  }

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
          <React.Fragment>
            <ProcessDescriptionHeader title="Enviar transferência via QR code" />
            <Box
              className={`${styles.box} ${styles.valueSection}`}
              data-test-id="qr-code-transference-sending"
            >
              <Typography>Você está pagando</Typography>
              <Typography className={styles.value}>
                {CurrencyFormatter.format(
                  qrCodeTransferState.transferenceData!.value,
                )}
              </Typography>
              {!balanceIsSufficient && (
                <ErrorMessage message={'Seu saldo é insuficiente'} />
              )}
            </Box>
          </React.Fragment>
        }
        main={
          <Box className={styles.box}>
            <Typography>Para</Typography>
            <Typography
              className={styles.value}
              data-test-id="qr-code-transfer-name"
            >
              {qrCodeTransferState.transferenceData!.name}
            </Typography>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={!balanceIsSufficient}
                onClick={onNextButtonClick}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationSheetClose}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
