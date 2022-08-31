import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Box, Grid, Typography } from '@material-ui/core'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { useStyles } from './Summary.style'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { DetailPaymentDescription } from 'features/payment/components/DetailPaymentDescription'
import { PaymentRoutes } from 'features/payment/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { PageContainer } from 'components/PageContainer'
import { cancelLabel, concludeLabel } from 'constants/buttons/labels'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import {
  closeAlert,
  createPayment,
  updatePaymentData,
} from 'features/payment/redux/actions'
import { SuccessPaymentState } from 'features/payment/redux/state'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'
import { TagChip } from 'features/tags/components/TagChip'
import { OperationType } from 'features/account/redux/models/operationType'
import { ShortDateFormatter } from '_translate'

export const Summary: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const payment = useSelector((store: StoreState) => store.payment)
  const { errorMessage, loading, paymentData } = payment

  const toggleDrawer = (open: boolean) => {
    setOpenAuthorizationSheet(open)
  }

  React.useEffect(() => {
    if (payment instanceof SuccessPaymentState)
      history.replace(PaymentRoutes.paymentProcess)
  })

  const onConcludeButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const onCancelButtonClick = () => dispatch(updatePaymentData())

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(createPayment())
    }
    setOpenAuthorizationSheet(false)
  }

  const onBackButtonClick = () =>
    dispatch(updatePaymentData({ paymentValue: paymentData?.paymentValue }))
  const onAlertClose = () => dispatch(closeAlert())

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
            title="Pagamentos"
            subtitle="Hora de conferir"
            description="Confira, cuidadosamente, os dados do pagamento."
          />
        }
        main={
          <Box>
            <Grid
              container
              direction="column"
              justify="space-between"
              className={styles.contentValue}
            >
              <Grid item>
                <DetailPaymentDescription
                  paymentValue={payment.paymentData?.paymentValue!}
                  receiverName={
                    payment.paymentData?.concessionaireName ??
                    payment.paymentData?.receiverName
                  }
                  paymentDate={payment.paymentData?.paymentDate!}
                  description={payment.paymentData?.description!}
                  bankName={payment.paymentData?.bankName!}
                  tags={payment.paymentData?.tags?.join('\n')}
                />
                {/* <Grid className={styles.buttonDetailsPayment}>
                  <AttachmentCard
                    image={iconAttachmentButton}
                    title={"Video"}
                    info={"25s"}
                  />
                  <AttachmentCard
                    image={iconAttachmentButton}
                    title={"Documento"}
                    info={"136Kb"}
                  />
                </Grid> */}
                {/* <Grid className={styles.detailInfoTagsSummary}>
                  <Box className={styles.contentValue}>
                    {tags.map((i) => (
                      <TagsExtract tag={i.tag} />
                    ))}
                  </Box>
                </Grid> */}
              </Grid>
            </Grid>
          </Box>
        }
        footer={
          <Grid>
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
          </Grid>
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Error"
          message={errorMessage}
          severity="error"
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  )
}
