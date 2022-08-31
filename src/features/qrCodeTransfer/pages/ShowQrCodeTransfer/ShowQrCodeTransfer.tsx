import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyles } from './ShowQrCodeTransfer.style'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { cancelLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { Grid, Typography } from '@material-ui/core'
import { CurrencyFormatter } from '_translate'
import { updateQrCodeTransferState } from 'features/qrCodeTransfer/redux/actions'
import { InitialQrCodeTransferState } from 'features/qrCodeTransfer/redux/state'
import { QrCodeTransferRoutes } from 'features/qrCodeTransfer/constants/routes'

export const ShowQrCodeTransfer: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const styles = useStyles()

  const { qrCodeBase64, value } = useSelector((state: StoreState) => ({
    qrCodeBase64: state.qrCodeTransfer.qrCodeBase64,
    value: state.qrCodeTransfer.valueToReceive!,
  }))

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const onBackButtonClick = () => {
    dispatch(updateQrCodeTransferState(new InitialQrCodeTransferState()))
    history.replace(QrCodeTransferRoutes.generateQrCodeTransfer)
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
          <React.Fragment>
            <ProcessDescriptionHeader title="Receber transferência via QR Code" />
            <Grid
              container
              direction="column"
              spacing={1}
              className={styles.subheader}
            >
              <Grid item>
                <Typography
                  data-test-id="transfer-text"
                  variant="caption"
                  align="center"
                  className={styles.title}
                >
                  Mostre essa tela para quem vai lhe pagar o valor
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  align="center"
                  className={styles.value}
                  data-test-id="transfer-value"
                >
                  {CurrencyFormatter.format(value)}
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        }
        main={
          <Grid container>
            <Grid item className={styles.qrCodeWrapper}>
              <img
                className={styles.qrCode}
                src={`data:image/png;base64,${qrCodeBase64}`}
                alt="qr code"
              />
            </Grid>
            <Grid item>
              <Typography className={styles.subtitle} align="center">
                Peça para o pagador ir em QR Code, na tela inicial, e em PAGAR,
                depois é só alinhar a camera nessa tela
              </Typography>
            </Grid>
          </Grid>
        }
        footer={<ProcessPageFooter onBackButtonClick={onBackButtonClick} />}
      />
    </PageContainer>
  )
}
