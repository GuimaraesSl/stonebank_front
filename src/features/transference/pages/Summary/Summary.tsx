import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { useStyles } from './Summary.style'
import { AppBar } from 'components/AppBar'
import { DetailTransferDescription } from 'components/DetailTransferDescription'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, concludeLabel } from 'constants/buttons/labels'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import {
  createInternalTransfer,
  createMoneyTransfer,
  updateTransferenceData,
} from 'features/transference/redux/actions'
import { SuccessTransferenceState } from 'features/transference/redux/state'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'
import { TransferType } from 'features/transference/redux/models/enum'
import { TagChip } from 'features/tags/components/TagChip'

export const Summary: React.FC = () => {
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const { transferType, transferenceState } = useSelector(
    (state: StoreState) => ({
      transferenceTags: state.transference.transference?.tags,
      transferType: state.transference.transference?.transferType,
      transferenceState: state.transference,
    }),
  )
  const history = useHistory()
  const dispatch = useDispatch()
  const styles = useStyles()

  const [validatedToken, setValidatedToken] = React.useState(false)

  const { transference, loading, errorMessage } = transferenceState

  React.useEffect(() => {
    if (validatedToken && transferenceState instanceof SuccessTransferenceState)
      history.replace(TransferenceRoutes.processTransfer)
  })

  const onConcludeButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const onCancelButtonClick = () => {
    dispatch(updateTransferenceData())
    history.go(transferType === TransferType.InternalTransfer ? -7 : -11)
  }

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      setValidatedToken(true)
      dispatch(
        transferenceState.transference?.transferType ===
          TransferType.InternalTransfer
          ? createInternalTransfer()
          : createMoneyTransfer(),
      )
    }
    setOpenAuthorizationSheet(false)
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
          <ProcessDescriptionHeader
            title="Transferência"
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
              <DetailTransferDescription
                value={transference?.transferValue!}
                accountName={transference?.toName ?? transference?.toTaxId!}
                date={transference?.transferDate!}
                description={transference?.description!}
                tags={
                  <Grid container justify="space-around" spacing={1}>
                    {transference?.tags?.map(tags => (
                      <Grid item>
                        <TagChip label={tags} />
                      </Grid>
                    ))}
                  </Grid>
                }
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
