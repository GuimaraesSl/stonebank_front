import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { useHistory } from 'react-router-dom'
import { AppBar } from 'components/AppBar'
import { Close } from '@material-ui/icons'
import { closeLabel } from 'constants/buttons/labels'
import { useStyles } from './TransferProcess.style'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { Button } from 'components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { updateTransferenceData } from 'features/transference/redux/actions'
import { StoreState } from 'redux/state'
import { CurrencyFormatter, DateFormatter } from '_translate'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { Icon } from 'components/Icon'

export const TransferProcess: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { transferenceState } = useSelector((state: StoreState) => ({
    transferenceState: state.transference,
  }))
  const styles = useStyles()

  const { transference } = transferenceState

  const onHomeButtonClick = () => {
    dispatch(updateTransferenceData())
    history.replace(AccountRoutes.home)
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
                data-test-id="home-button"
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
              data-test-id="transfer-process"
            >
              Transferência <br /> em processamento
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
                <Typography> Transferência no valor de </Typography>
                <Typography className={styles.transferDetail}>
                  {CurrencyFormatter.format(transference?.transferValue!)}
                </Typography>
                <Typography> para a conta de </Typography>
                <Typography className={styles.transferDetail}>
                  {transference?.toName ?? transference?.toTaxId!}
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
