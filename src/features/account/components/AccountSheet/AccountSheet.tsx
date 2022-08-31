import React from 'react'
import { useStyles } from './AccountSheet.style'
import { AccountListPopUp } from 'features/account/components/AccountListPopUp'
import { ShowMoreButton } from '../ShowMoreButton'
import { Account } from 'features/account/redux/models/account'
import { StoreState } from 'redux/state'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeAccount,
  getAccountDashboard,
} from 'features/account/redux/actions'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { closeLabel } from 'constants/buttons/labels'
import Drawer from '@material-ui/core/Drawer'
import { Box } from '@material-ui/core'
import { Icon } from 'components/Icon'

interface AccountSheetProps {
  account?: Account
  open?: boolean
  onClose: Function | ((setOpen: boolean) => void)
}

export const AccountSheet: React.FC<AccountSheetProps> = ({
  open,
  onClose,
}) => {
  const { dashboard } = useSelector((state: StoreState) => ({
    dashboard: state.account,
  }))
  const { accounts } = dashboard.dashboard!
  const accountId = dashboard.account?.accountId
  const styles = useStyles()

  const [expanded, setExpanded] = React.useState(false)
  const [className, setClassName] = React.useState(styles.accounts)

  const onCloseButton = () => {
    onClose(!open)
  }

  const dispatch = useDispatch()
  const onAccountClick = (account: Account) => {
    dispatch(changeAccount(account))
    dispatch(getAccountDashboard(account.accountId))
  }

  const onShowMoreButtonClick = () => setExpanded(!expanded)

  React.useEffect(() => {
    setClassName(`${styles.accounts} ${expanded && styles.expanded}`)
  }, [expanded, styles.accounts, styles.expanded])

  return (
    <Drawer
      className={styles.drawer}
      anchor="bottom"
      open={open}
      onClose={onCloseButton}
      data-test-id="drawer"
    >
      <Box className={styles.containerPopUp}>
        <Box className={className}>
          {accounts.map((account, index) => {
            return (
              <React.Fragment>
                <AccountListPopUp
                  key={account.accountId}
                  account={account}
                  pathImage={<Icon name={'imageUser'} />}
                  stateImage={
                    account.accountId === accountId ? (
                      <Icon name="accountState" />
                    ) : undefined
                  }
                  onClick={() => onAccountClick(account)}
                  data-test-id="account-sheet"
                />
                <Box className={styles.divider} />
              </React.Fragment>
            )
          })}
        </Box>
        <Box className={styles.buttonShowMore}>
          <ShowMoreButton showMore={expanded} onClick={onShowMoreButtonClick} />
        </Box>
      </Box>
      <Box className={styles.closeButton}>
        <Button
          palette="secondary"
          size="small"
          startIcon={<Close color="primary" />}
          onClick={onCloseButton}
          data-test-id="close-button"
        >
          {closeLabel}
        </Button>
      </Box>
    </Drawer>
  )
}
