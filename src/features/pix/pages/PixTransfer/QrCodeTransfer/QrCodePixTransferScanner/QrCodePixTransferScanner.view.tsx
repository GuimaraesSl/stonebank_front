import React from 'react'
import { AppBar } from 'components/AppBar'
import { Close } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AccountRoutes } from 'features/account/constants/routes'
import { QrCodeReader } from 'components/QrCodeReader'
import { Button } from 'components/Button'
import { cancelLabel } from 'constants/buttons/labels'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './QrCodePixTransferScanner.style'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { ProcessPageFooterButton } from 'components'

interface QrCodePixTransferScannerViewProps {
  loading: boolean
  errorMessage?: string
  onAlertClose: VoidFunction
  onCancelButtonClick: VoidFunction
  onScanFail: (e: any) => void
  onBackButtonClick: VoidFunction
  onScanComplete: (hash: string | null) => void
}

export const QrCodePixTransferScannerView: React.FC<
  QrCodePixTransferScannerViewProps
> = ({
  loading,
  errorMessage,
  onAlertClose,
  onScanFail,
  onScanComplete,
  onCancelButtonClick,
  onBackButtonClick,
}) => {
  const style = useStyles()

  return (
    <PageContainer className={style.container}>
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
          <Box className={style.scannerArea} data-test-id="camera">
            {errorMessage && (
              <Alert
                title="Erro"
                message={errorMessage}
                severity={'error'}
                onClose={onAlertClose}
              />
            )}
            <QrCodeReader
              onScanFail={onScanFail}
              onScanComplete={onScanComplete}
            />
          </Box>
        }
        footer={
          <ProcessPageFooterButton
            backButton /* onClick={onBackButtonClick} */
          />
        }
      />
      <Loader open={loading} />
    </PageContainer>
  )
}
