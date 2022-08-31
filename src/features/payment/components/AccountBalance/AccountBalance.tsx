import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import { StoreState } from 'redux/state'

import { useStyles } from './AccountBalance.style'
import { CurrencyFormatter, currencySymbol } from '_translate'

interface AccountBalanceProps {
  show: boolean
  variant?: Variant
}

export const AccountBalance: React.FC<AccountBalanceProps> = ({
  show,
  variant = 'h6',
}) => {
  const styles = useStyles()

  const state = useSelector((state: StoreState) => state.account)
  const { loading, dashboard } = state

  const balanceIsNumber = typeof dashboard?.balance === 'number'

  const formattedBalance =
    balanceIsNumber &&
    CurrencyFormatter.format(dashboard!.balance).split(currencySymbol)[1].trim()

  const shownBalance =
    loading || !show || !balanceIsNumber ? '...' : formattedBalance

  return (
    <Typography
      data-test-id="account-balance"
      id="account-balance"
      variant={variant}
      className={styles.hiddenContent}
    >
      R$ {shownBalance}
    </Typography>
  )
}
