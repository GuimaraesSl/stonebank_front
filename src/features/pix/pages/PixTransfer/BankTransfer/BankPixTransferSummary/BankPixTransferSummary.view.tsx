import React from 'react'
import { Box } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { LabelWithValueKeyPix } from 'components/LabelWithValueKeyPix'
import { cancelLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { PixTransfer } from 'features/pix/redux/models/pixTransfer'
import { useStyles } from './BankPixTransferSummary.style'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from 'components'

interface BankPixTransferSummaryViewProps {
  pixTransfer?: PixTransfer
  openAuthorizationSheet?: any
  onAuthorizationClose?: Function
  errorMessage?: string
  loading: boolean
  onConfirmButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
}

export const BankPixTransferSummaryView: React.FC<
  BankPixTransferSummaryViewProps
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

  // const tagsView = React.useMemo(() => {
  //   return tags?.map(t => <TagChip label={t} key={t} />)
  // }, [])

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
                data-test-id="cancel-button"
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
        main={
          <React.Fragment>
            <Box>
              <LabelWithValueKeyPix pixTransfer={pixTransfer} />
            </Box>
            {/*
              <Typography className={styles.alertMessage}>Suas TAGs</Typography>
              <Box
                id="tags"
                display="grid"
                gridAutoRows="1fr"
                gridColumnGap={4}
                gridTemplateColumns="repeat(5, 1fr)"
              >
                {tagsView}
              </Box>
            */}
          </React.Fragment>
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
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose!}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
