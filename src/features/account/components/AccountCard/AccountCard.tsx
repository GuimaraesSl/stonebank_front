import React from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import { useStyle } from './AccountCard.style'
import { Account } from 'features/account/redux/models/account'

import { DetailsButton } from 'features/account/components/DetailsButton'
import { AccountCardDetails } from 'features/account/components/AccountCardDetails'
import Button from '@material-ui/core/Button'

import { useDispatch } from 'react-redux'
import { getFixedAccounts } from 'features/account/redux/actions'
import { Icon } from 'components/Icon'
interface AccountCardProps {
  account: Account
  endIcon?: string | React.ReactNode
  onClick?: VoidFunction
  className?: string
  starIcon?: boolean
  btnStar?: boolean
  favorite?: boolean
}
export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  endIcon,
  onClick,
  className,
  starIcon,
  btnStar,
  favorite,
}) => {
  const styles = useStyle()
  const effectiveCardClassName = `${styles.accountCard} ${className ?? ''}`
  const dispatch = useDispatch()
  const [bottom, setBottom] = React.useState(false)

  const [btnFavorite, setBtnFavorite] = React.useState(starIcon)

  const toggleDrawer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setBottom(!bottom)
  }
  const onBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setBtnFavorite(!btnFavorite)
    dispatch(getFixedAccounts(account.accountId, !btnFavorite))
  }

  return (
    <React.Fragment>
      <Card
        className={effectiveCardClassName}
        elevation={0}
        onClick={onClick}
        data-test-id="account-card"
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Icon name="accountImage" data-test-id="account-image" />
          </Grid>
          <Grid item className={styles.accountData}>
            <Grid container direction="column" data-test-id="user-account">
              <Typography variant="body2" data-test-id="name">
                <strong>{account!.name}</strong> <br />
                {account!.spbBankBranch && (
                  <text
                    className={styles.description}
                    data-test-id="bank-branch"
                  >
                    {' '}
                    <strong> Agência: {account!.spbBankBranch} </strong>{' '}
                  </text>
                )}
                {account!.spbBankAccount && account!.spbBankAccountDigit && (
                  <text
                    className={styles.description}
                    data-test-id="account-digit-description"
                  >
                    <strong>
                      Conta: {account!.spbBankAccount}-
                      {account!.spbBankAccountDigit}{' '}
                    </strong>{' '}
                  </text>
                )}{' '}
                <br />
                {account!.spbBank && (
                  <text
                    className={styles.description}
                    data-test-id="bank-description"
                  >
                    <strong> Banco: {account!.spbBank} - Fitbank</strong>
                  </text>
                )}
              </Typography>
            </Grid>
          </Grid>
          {endIcon && (
            <Grid item className={styles.endIcon}>
              <Icon name="accountState" data-test-id="account-state-button" />
            </Grid>
          )}
          {btnStar && (
            <Grid item className={styles.starIcon} data-test-id="star-icon">
              <Button onClick={onBtnClick}>
                <Icon name={btnFavorite ? 'star' : 'starEmpty'} />
              </Button>
            </Grid>
          )}
          {favorite && (
            <Grid item className={styles.starIcon} data-test-id="star-icon">
              <Icon name={'star'} />
            </Grid>
          )}
        </Grid>
        {<DetailsButton title="Detalhes" onClick={toggleDrawer} />}
      </Card>
      {bottom && (
        <AccountCardDetails
          account={account}
          open={bottom}
          onClose={toggleDrawer}
          data-test-id="account-card-details"
        />
      )}
    </React.Fragment>
  )
}
