import { Box, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from 'components'
import { LabelWithValueKeyPix } from 'components/LabelWithValueKeyPix'
import { cancelLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { TagChip } from 'features/tags/components/TagChip'
import React from 'react'
import { useStyles } from './KeyPixTransferSummary.style'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { PixKeyType } from 'features/pix/redux/models/pixKeyType'
import { PixTransfer } from 'features/pix/redux/models/pixTransfer'

interface KeyPixTransferSummaryViewProps {
  pixTransfer?: PixTransfer
  openAuthorizationSheet?: any
  onAuthorizationClose?: Function
  errorMessage?: string
  loading: boolean
  onConfirmButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
}

export const KeyPixTransferSummaryView: React.FC<
  KeyPixTransferSummaryViewProps
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
            {/*<Typography className={styles.txtalert}>Suas TAGs</Typography>
             <Box
              id="tags"
              display="grid"
              gridAutoRows="1fr"
              gridColumnGap={4}
              gridTemplateColumns="repeat(5, 1fr)"
            >
              {tagsView}
            </Box> */}
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
