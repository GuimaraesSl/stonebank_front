import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { updateState } from 'features/pix/redux/actions'
import { PixRoutes } from 'features/pix/constants/routes'
import { useStyles } from './PaymentProcess.style'
import {
  AppBar,
  Button,
  ButtonWithFloatingIcon,
  PageContainer,
  ProcessPageLayout,
} from 'components'
import { closeLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { Close } from '@material-ui/icons'
import { Typography, Box, Grid } from '@material-ui/core'
import { Icon } from 'components/Icon'
import { CurrencyFormatter } from '_translate'

export const PaymentProcess: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const styles = useStyles()
  const payment = useSelector((store: StoreState) => store.payment)

  const onHomeButtonClick = () => {
    dispatch(updateState())
    history.replace(PixRoutes.pixArea)
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
                onClick={onHomeButtonClick}
                data-test-id="cancel-button"
              >
                {closeLabel}
              </Button>
            }
          />
        }
        main={
          <React.Fragment>
            <Typography
              variant="h3"
              className={styles.title}
              data-test-id="pix-transfer-process"
            >
              PIX <br /> em processamento
            </Typography>
            <Box display="flex" justifyContent="center">
              <Icon className={styles.img} name={'transferProcess'} />
            </Box>

            <Typography variant="body1" className={styles.description}>
              Sua solicitação será processada e aparecerá em seu extrato após a
              conclusão.
            </Typography>

            <Grid item className={styles.box} data-test-id="transfer-content">
              <Grid className={styles.detailTransferContent}>
                <Typography> PIX no valor de </Typography>
                <Typography className={styles.transferDetail}>
                  {CurrencyFormatter.format(
                    payment.paymentData?.originalPaymentValue!,
                  )}
                </Typography>
                <Typography> para a conta de </Typography>
                <Typography className={styles.transferDetail}>
                  {payment?.paymentData?.receiverName ??
                    payment?.paymentData?.receiverTaxId}
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        }
        footer={
          <Grid container spacing={4} justify="center">
            {/*                         <Grid item>
              <ButtonWithFloatingIcon
                icon={IconBgVoucherButton}
                size="large"
                onClick={onHomeButtonClick}
              >
                Comprovante
              </ButtonWithFloatingIcon>
            </Grid> */}
            <Grid item>
              <ButtonWithFloatingIcon
                icon={<Icon name="home" />}
                size="large"
                onClick={onHomeButtonClick}
                data-test-id="home-button"
              >
                Início
              </ButtonWithFloatingIcon>
            </Grid>
          </Grid>
        }
      />
    </PageContainer>
  )
}
