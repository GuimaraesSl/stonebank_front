import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { Box } from '@material-ui/core'
import { useStyles } from './PaymentReceipt.style'
import { AppBar } from 'components/AppBar'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
// import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon";
// import { Authentication } from "features/payment/components/Authentication";
import { ReceiptDescription } from 'features/payment/components/ReceiptDescription'
import { PaymentRoutes } from 'features/payment/constants/routes'
import { Button } from 'components/Button'
import { closeLabel, saveLabel, shareLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { Close } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { AccountRoutes } from 'features/account/constants/routes'

export const PaymentReceipt: React.FC = () => {
  const payment = useSelector((store: StoreState) => store.payment)
  const styles = useStyles()
  const history = useHistory()

  const onCloseButtonClick = () => {
    history.replace(PaymentRoutes.completedPayment)
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
                onClick={onCloseButtonClick}
                data-test-id="cancel-button"
              >
                {closeLabel}
              </Button>
            }
          />
        }
        header={<ProcessDescriptionHeader title="Comprovante" />}
        main={
          <React.Fragment>
            <Box className={styles.description}>
              <ReceiptDescription
                paymentValue={payment.paymentData?.paymentValue!}
                receiverName={payment.paymentData?.receiverName!}
                bank={payment.paymentData?.bankName!}
                paymentDate={payment?.paymentData?.paymentDate!}
                barcode={'payment.barcode!'}
              />
            </Box>
            {/* <Box className={styles.separator} />
            <Box className={styles.bottom}>
              <Authentication
                controlProtocol="44B8-4B9324C-2398721"
                internalProtocol="44B8-4B9324C-2398721320AB"
              />
            </Box> */}
            {/* <Box className={styles.bottom}>
              <ButtonWithFloatingIcon size="large">
                {saveLabel}
              </ButtonWithFloatingIcon>
              <ButtonWithFloatingIcon size="large">
                {shareLabel}
              </ButtonWithFloatingIcon>
            </Box> */}
          </React.Fragment>
        }
      />
    </PageContainer>
  )
}
