import React from 'react'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { cancelLabel, returnLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { useHistory } from 'react-router-dom'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AccountBalance } from 'features/account/components/AccountBalance'
import { ShowBalanceButton } from 'features/payment/components/ShowBalanceButton'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Box, Grid, Typography } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import { AccountSheet } from 'features/account/components/AccountSheet'
import { useStyles } from 'features/taxPayment/pages/Fgts/PaymentFgts/PaymentFgts.style'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { SelectionCard } from 'components/SelectionCard'
import { KeyboardArrowLeft } from '@material-ui/icons'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { updateFgtsPaymentData } from 'features/taxPayment/redux/actions'

export const PaymentFgts: React.FC = () => {
  const [bottom, setBottom] = React.useState(false)
  const { Account } = useSelector((state: StoreState) => ({
    Account: state.account.account,
  }))

  let displayValue = JSON.parse(localStorage.getItem('showBalance')!)
  const [showBalance, setShowBalance] = React.useState<boolean>(displayValue)

  React.useEffect(() => {
    localStorage.setItem('showBalance', JSON.stringify(showBalance))
    if (showBalance === null) setShowBalance(true)
  }, [showBalance])

  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()

  const onShowBalanceButtonClick = () => setShowBalance(!showBalance)

  const toggleDrawer = () => {
    setBottom(!bottom)
  }

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateFgtsPaymentData())
  }

  const onNextButtonClick = () => {
    history.push(TaxPaymentRoutes.paymentFgtsBarCode)
  }

  const onBackButtonClick = () => dispatch(updateFgtsPaymentData())

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
            <ProcessDescriptionHeader title="Impostos - FGTS" />
            <Grid container alignItems="center">
              <Grid container xs item>
                <Typography data-test-id="balance" variant="subtitle2">
                  Seu saldo&nbsp;
                </Typography>
                <AccountBalance
                  show={showBalance}
                  variant="subtitle2"
                  size="small"
                />
              </Grid>
              <Grid item>
                <ShowBalanceButton
                  showBalance={showBalance}
                  onClick={onShowBalanceButtonClick}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        }
        main={
          <Grid container direction="column">
            <Box className={styles.content}>
              <SelectionCard
                title="Conta de débito"
                subtitle={Account?.name}
                bankAccount={Account?.bankAccount}
                onClick={onNextButtonClick}
                data-test-id="account"
              />
            </Box>
            <Drawer
              className={styles.drawer}
              anchor="bottom"
              open={bottom}
              onClose={toggleDrawer}
            >
              <AccountSheet account={Account} onClose={toggleDrawer} />
            </Drawer>
          </Grid>
        }
        footer={<ProcessPageFooter onBackButtonClick={onBackButtonClick} />}
      />
    </PageContainer>
  )
}
