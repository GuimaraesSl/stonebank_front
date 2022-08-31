import React from 'react'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { useHistory } from 'react-router-dom'
import { PageContainer } from 'components/PageContainer'
import { Box, Grid, Typography } from '@material-ui/core'
import { useStyles } from './ConclusionFlow.style'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { AppBar } from 'components/AppBar'
import { OperationType } from 'features/account/redux/models/operationType'
import { useLocation } from 'react-router-dom'
import { Icon } from 'components/Icon'

export const ConclusionFlow: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const location = useLocation()

  const _typeOfPayment = (opType: any) => {
    switch (opType) {
      case OperationType.boletoPayment:
        return 'Pagamento de boleto realizado'
      case OperationType.garePayment:
        return 'Pagamento de GARE realizado'
      case OperationType.fgtsPayment:
        return 'Pagamento de FGTS realizado'
      case OperationType.darjPayment:
        return 'Pagamento de DARJ realizado'
      case OperationType.purchaseTopUp:
        return 'Recarga de celular concluída'
      case OperationType.qrCode:
        return 'Transferência via QR Code concluída'
      case OperationType.transferBySMS:
        return 'Transferência por celular concluída'
    }
  }

  const onHomeButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        main={
          <Box>
            <Typography variant="h3" className={styles.title}>
              {_typeOfPayment(location.state!)}
            </Typography>
            <Box
              className={styles.containerImg}
              data-test-id="completed-payment"
            >
              <Icon name="completedTransfer" className={styles.img} />
            </Box>
          </Box>
        }
        footer={
          <Grid container direction="column" alignItems="center" spacing={2}>
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
