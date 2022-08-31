import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AccountCard } from 'features/account/components/AccountCard'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { useStyles } from './AccountSettings.style'
import { useHistory } from 'react-router-dom'
import { AccountRoutes } from 'features/account/constants/routes'
import { Box } from '@material-ui/core'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { ActionList } from 'components/ActionList'
import { ActionListItem } from 'components/ActionListItem'
import { ConfirmSignoutDialog } from 'features/authentication/components/ConfirmSignoutDialog'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'components/Button'
import { KeyboardArrowLeft } from '@material-ui/icons'
import { StoreState } from 'redux/state'
import { UserRoutes } from 'features/user/constants/routes'
import { Divider } from 'components/Divider'
import {
  changeAccount,
  getAccountDashboard,
} from 'features/account/redux/actions'
import { Account } from 'features/account/redux/models/account'
import { Loader } from 'components/Loader'
import { Icon } from 'components/Icon'

export const AccountSettings: React.FC = () => {
  const { dashboard } = useSelector((state: StoreState) => ({
    dashboard: state.account,
  }))
  const { account, loading } = useSelector((state: StoreState) => state.account)
  const { accounts } = dashboard.dashboard!
  const accountIn = dashboard.account?.accountId
  const [openConfirmSignoutDialog, setOpenConfirmSignoutDialog] =
    React.useState(false)
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()
  const onSeeAllButtonClick = () => {
    history.push(AccountRoutes.allAccounts)
  }
  const onChangeClick = (account: Account) => {
    dispatch(changeAccount(account))
  }
  const onBackToHome = () => history.push(AccountRoutes.home)
  const onPersonalInformationClick = () => {
    history.push(UserRoutes.home)
  }
  const onHelpClick = () => {
    history.push(AccountRoutes.help)
  }
  const onSignOutClick = () => {
    setOpenConfirmSignoutDialog(true)
  }
  const onConfirmSignoutClose = () => {
    setOpenConfirmSignoutDialog(false)
  }
  React.useEffect(() => {
    dispatch(getAccountDashboard())
  }, [])

  return (
    <PageContainer>
      <ProcessPageLayout
        header={
          <React.Fragment>
            <ProcessDescriptionHeader title="Configurações" />
            <AccountCard
              className={styles.cardBackground}
              account={account!}
              endIcon={<Icon name="check" />}
            />
            {accounts.map((accountItem, index) => {
              if (accountItem.accountId === account?.accountId) return ''
              if (!accountItem.isFixedAccount) return ''

              const accountComponent = (
                <AccountCard
                  className={styles.cardBackground}
                  key={accountItem.accountId}
                  account={accountItem}
                  onClick={() => onChangeClick(accountItem)}
                  favorite
                />
              )

              if (index < accounts.length - 1)
                return (
                  <React.Fragment>
                    <Divider spacing={1} />
                    {accountComponent}
                  </React.Fragment>
                )

              return (
                <React.Fragment>
                  <Divider spacing={1} />
                  {accountComponent}
                </React.Fragment>
              )
            })}
          </React.Fragment>
        }
        main={
          <React.Fragment>
            <Box
              display="flex"
              justifyContent="center"
              className={styles.seeAllButton}
            >
              <ButtonWithFloatingIcon
                onClick={onSeeAllButtonClick}
                data-test-id="see-all-button"
              >
                Ver Todas
              </ButtonWithFloatingIcon>
            </Box>
            <ActionList>
              <ActionListItem
                key="Informações pessoais"
                onClick={onPersonalInformationClick}
                data-test-id="user-information-button"
              >
                Informações pessoais
              </ActionListItem>
              <ActionListItem
                key="Ajuda"
                onClick={onHelpClick}
                data-test-id="help-button"
              >
                Ajuda
              </ActionListItem>
              <ActionListItem
                key="Sair"
                onClick={onSignOutClick}
                data-test-id="signout-button"
              >
                Sair
              </ActionListItem>
            </ActionList>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            secondaryButton={
              <Button
                palette="secondary"
                startIcon={<KeyboardArrowLeft color="secondary" />}
                onClick={onBackToHome}
                data-test-id="home-button"
              >
                Voltar
              </Button>
            }
          />
        }
      />
      <Loader open={loading} />
      <ConfirmSignoutDialog
        open={openConfirmSignoutDialog}
        onClose={onConfirmSignoutClose}
        data-test-id="confirm-signout-close"
      />
    </PageContainer>
  )
}
