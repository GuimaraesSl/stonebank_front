import React from 'react'
import { Box, CardContent, Grid, Toolbar, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { useHistory } from 'react-router'
import { SettingsButton } from 'features/account/components/SettingsButton'
import { ShowBalanceButton } from 'features/account/components/ShowBalanceButton'
import { AccountBalance } from 'features/account/components/AccountBalance'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyle } from './HomePageHeader.style'
import { Icon } from 'components/Icon'

interface HomePageHeaderProps {
  className?: string
}

export const HomePageHeader: React.FC<HomePageHeaderProps> = ({
  className,
}) => {
  const accountName = useSelector(
    (store: StoreState) => store.account.account?.name,
  )

  let displayValue = JSON.parse(localStorage.getItem('showBalance')!)
  const [showBalance, setShowBalance] = React.useState<boolean>(displayValue)

  React.useEffect(() => {
    localStorage.setItem('showBalance', JSON.stringify(showBalance))
    if (showBalance === null) setShowBalance(true)
  }, [showBalance])

  const history = useHistory()
  const styles = useStyle()

  const _getClassName = () => {
    let value = styles.mainHeader
    if (className) value = `${value} ${className}`
    return value
  }

  const onShowBalanceButtonClick = () => setShowBalance(!showBalance)

  const onShowBankStatementButtonClick = () =>
    history.push(AccountRoutes.bankStatement)

  return (
    <Box className={_getClassName()}>
      <CardContent data-test-id="card-content">
        <Toolbar className={styles.toolbar}>
          <Icon
            name={'logoSmall'}
            className={styles.logo}
            data-test-id="logo"
          />
          <SettingsButton />
        </Toolbar>
        <Box
          className={styles.greetingsSection}
          data-test-id="greetings-section"
        >
          <Typography>{`Olá ${accountName ?? '---'}`}</Typography>
        </Box>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Grid item data-test-id="balance">
              <Typography>Seu saldo</Typography>
            </Grid>
            <Grid item>
              <AccountBalance show={showBalance} />
            </Grid>
          </Grid>
          <Grid item>
            <ShowBalanceButton
              showBalance={showBalance}
              onClick={onShowBalanceButtonClick}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Box>
        <Box className={styles.bottomFloatingButton}>
          <ButtonWithFloatingIcon
            icon={<Icon name={'arrowRight'} />}
            onClick={onShowBankStatementButtonClick}
            data-test-id="bank-statement-button"
          >
            Ver extrato
          </ButtonWithFloatingIcon>
        </Box>
      </Box>
    </Box>
  )
}
