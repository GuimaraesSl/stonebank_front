import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { useStyles } from './SmsTransferSummary.style'
import { AppBar } from 'components/AppBar'
import { DetailSmsTransferDescription } from 'components/DetailSmsTransferDescription'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, concludeLabel } from 'constants/buttons/labels'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { SmsTransferRoutes } from 'features/smsTransfer/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { SuccessSmsTransferState } from 'features/smsTransfer/redux/state'
import { updateSmsTransferData } from 'features/smsTransfer/redux/actions'
import {
  createSmsTransfer,
  createPendingSmsTransfer,
} from 'features/smsTransfer/redux/actions'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { OperationType } from 'features/account/redux/models/operationType'

export const SmsTransferSummary: React.FC = () => {
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const smsTransferState = useSelector((store: StoreState) => store.smsTransfer)

  const history = useHistory()
  const dispatch = useDispatch()
  const styles = useStyles()

  const { smsTransfer, favoredAccount, loading, errorMessage } =
    smsTransferState

  React.useEffect(() => {
    if (smsTransferState instanceof SuccessSmsTransferState)
      history.push({
        pathname: SmsTransferRoutes.completedSmsTransfer,
        state: OperationType.transferBySMS,
      })
  })

  const onConcludeButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const onCancelButtonClick = () => {
    dispatch(updateSmsTransferData())
    history.replace(AccountRoutes.home)
  }

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      if (favoredAccount) dispatch(createSmsTransfer())
      else dispatch(createPendingSmsTransfer())
    }
    setOpenAuthorizationSheet(false)
  }

  const onBackButtonClick = () => dispatch(updateSmsTransferData({...smsTransfer, value: undefined}));

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
            title="Transferência pelo celular"
            subtitle="Hora de conferir"
            description="Confira, cuidadosamente, os dados da transferência."
          />
        }
        main={
          <Grid
            container
            direction="column"
            justify="space-between"
            className={styles.contentValue}
          >
            <Grid item>
              <DetailSmsTransferDescription
                value={smsTransfer?.value!}
                number={smsTransfer?.phoneNumber!}
                date={new Date(Date.now())}
                name={smsTransfer?.toName}
              />
            </Grid>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onConcludeButtonClick}
                data-test-id="conclude-button"
              >
                {concludeLabel}
              </Button>
            }
            onBackButtonClick={onBackButtonClick}
          />
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
