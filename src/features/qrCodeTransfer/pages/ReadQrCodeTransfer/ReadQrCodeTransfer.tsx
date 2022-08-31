import React from 'react'
import { AppBar } from 'components/AppBar'
import { Close } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AccountRoutes } from 'features/account/constants/routes'
import { QrCodeReader } from 'components/QrCodeReader'
import { useHistory } from 'react-router-dom'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { cancelLabel } from 'constants/buttons/labels'
import { QrCodeTransferRoutes } from 'features/qrCodeTransfer/constants/routes'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './ReadQrCodeTransfer.style'
import { useDispatch, useSelector } from 'react-redux'
import { SuccessQrCodeTransferState } from 'features/qrCodeTransfer/redux/state'
import {
  readQrCode,
  setError,
  closeAlert,
} from 'features/qrCodeTransfer/redux/actions'
import { StoreState } from 'redux/state'
import { LoadingQrCodeTransferState } from 'features/qrCodeTransfer/redux/state'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'

export const ReadQrCodeTransfer: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()
  const qrCodeState = useSelector((state: StoreState) => state.qrCodeTransfer)

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  React.useEffect(() => {
    if (qrCodeState instanceof SuccessQrCodeTransferState) {
      history.replace(QrCodeTransferRoutes.sendQrCodeTransfer)
    }
  }, [qrCodeState, history])

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const handleError = (e: any) => {
    dispatch(setError('Não foi possível realizar a leitura.'))
  }

  const handleScan = (e: string | null) => {
    if (e) dispatch(readQrCode(e))
  }

  return (
    <PageContainer className={styles.container}>
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
          <Typography align="center">
            <ProcessDescriptionHeader
              title="Enviar transferência via QR Code"
              subtitle="Alinhe o QR code do recebedor na marcação da tela"
            />
          </Typography>
        }
        main={
          <Box className={styles.main} data-test-id="camera">
            {qrCodeState.errorMessage && (
              <Alert
                title="Erro"
                message={qrCodeState.errorMessage}
                severity={'error'}
                onClose={onAlertClose}
              />
            )}
            <QrCodeReader
              onScanFail={handleError}
              onScanComplete={handleScan}
            />
          </Box>
        }
        footer={<ProcessPageFooter />}
      />
      <Loader open={qrCodeState instanceof LoadingQrCodeTransferState} />
    </PageContainer>
  )
}
