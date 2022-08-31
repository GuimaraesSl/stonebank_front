import { Box } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from 'components'
import { Alert } from 'components/Alert'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { LabelWithValueKeyPix } from 'components/LabelWithValueKeyPix'
import { Loader } from 'components/Loader'
import { cancelLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { PixTransfer } from 'features/pix/redux/models/pixTransfer'
import React from 'react'
import { useStyles } from './QrCodePixTransferSummary.style'

interface QrCodePixTransferSummaryViewProps {
  pixTransfer?: PixTransfer
  openAuthorizationSheet: any
  onAuthorizationClose: Function
  errorMessage?: string
  loading: boolean
  onConfirmButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
}

export const QrCodePixTransferSummaryView: React.FC<
  QrCodePixTransferSummaryViewProps
> = ({
  pixTransfer,
  openAuthorizationSheet,
  onAuthorizationClose,
  errorMessage,
  loading,
  onConfirmButtonClick,
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
                startIcon={<Close color="inherit" />}
                onClick={onCancelButtonClick}
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Transferência com Pix"
            subtitle="Hora de conferir"
            description="Confira, cuidadosamente, os dados da transferência."
          />
        }
        main={<LabelWithValueKeyPix pixTransfer={pixTransfer} />}
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
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
