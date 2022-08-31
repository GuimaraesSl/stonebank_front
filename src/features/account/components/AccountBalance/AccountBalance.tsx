import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import { StoreState } from 'redux/state'

import { AccountBalanceStyleProps, useStyles } from './AccountBalance.style'
import { CurrencyFormatter, currencySymbol } from '_translate'

interface AccountBalanceProps extends AccountBalanceStyleProps {
  show: boolean
  variant?: Variant
}

export const AccountBalance: React.FC<AccountBalanceProps> = ({
  show,
  variant = 'h6',
  size = 'normal',
  ...rest
}) => {
  const styles = useStyles({
    size,
  })
  const state = useSelector((state: StoreState) => state.account)
  const { loading, dashboard } = state
  const balanceIsNumber =
    dashboard?.balance && typeof dashboard?.balance === 'number'

  let formattedBalance =
    balanceIsNumber &&
    CurrencyFormatter.format(dashboard!.balance).split(currencySymbol)[1].trim()
  formattedBalance =
    balanceIsNumber && dashboard!.balance < 0
      ? `-${formattedBalance}`
      : formattedBalance

  const shownBalance =
    loading || !show || balanceIsNumber === undefined
      ? '...'
      : dashboard!.balance === 0
      ? '0,00'
      : formattedBalance

  return (
    <Typography
      id="account-balance"
      variant={variant}
      data-test-id="account-balance"
      {...rest}
    >
      <span className={styles.currencySymbol}>{currencySymbol} </span>
      <span className={styles.accountBalance}>{shownBalance}</span>
    </Typography>
  )
}
