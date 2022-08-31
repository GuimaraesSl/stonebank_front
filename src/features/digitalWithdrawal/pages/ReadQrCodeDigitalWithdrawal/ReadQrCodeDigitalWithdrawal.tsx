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
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './ReadQrCodeDigitalWithdrawal.style'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { DigitalWithdrawalRoutes } from 'features/digitalWithdrawal/constants'

export const ReadQrCodeDigitalWithdrawal: React.FC = () => {
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const history = useHistory()
  const styles = useStyles()

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const handleError = (e: any) => {}

  const handleScan = (e: string | null) => {
    if (e) setOpenAuthorizationSheet(true)
  }
  const onAuthorizationSheetClose = (tokenIsValid: boolean) => {
    setOpenAuthorizationSheet(false)
    if (tokenIsValid) history.push(DigitalWithdrawalRoutes.moneyCount)
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
            <QrCodeReader
              onScanFail={handleError}
              onScanComplete={handleScan}
            />
          </Box>
        }
        footer={<ProcessPageFooter />}
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationSheetClose}
      />
    </PageContainer>
  )
}
