import React from 'react'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { cancelLabel } from 'constants/buttons/labels'
import { UserRoutes } from 'features/user/constants/routes'
import { Box, Typography } from '@material-ui/core'
import { Account } from 'features/user/components/Account'
import { useStyles } from './UserInformation.style'
import { ActionList } from 'components/ActionList'
import { ActionListItem } from 'components/ActionListItem'
import { useMask } from 'hooks/useMask'
import { maskPhone } from '_utils/masks/phone'
import { AccountRoutes } from 'features/account/constants/routes'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Icon } from 'components/Icon'

export const UserInformation: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const { user } = useSelector((store: StoreState) => store.auth)

  const [phoneNumber, setPhone] = useMask(
    maskPhone,
    user?.phoneNumber !== null ? user?.phoneNumber : '',
  )

  React.useEffect(() => {
    if (user && user?.phoneNumber !== null) setPhone(user.phoneNumber!)
  }, [setPhone, user])

  const onCancelButtonClick = () => {
    history.push(AccountRoutes.settings)
  }

  const onChangeNicknameClick = () => {
    history.push(UserRoutes.changeChangeNickname)
  }

  const onAddressClick = () => {
    history.push(UserRoutes.currentAddress)
  }

  const onExitButtonClick = () => {
    history.push(AccountRoutes.settings)
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
        main={
          <React.Fragment>
            <Box component="header" className={styles.header}>
              <Account
                name={String(user?.name ?? '')}
                image={<Icon name={'imageUser'} />}
              />
            </Box>
            <ActionList className={styles.list} data-test-id="user-information">
              <ActionListItem
                key="Nome social"
                onClick={onChangeNicknameClick}
                data-test-id="change-nickname"
              >
                <Typography>Nome social:</Typography>
                <Typography>
                  <strong>{user?.name}</strong>
                </Typography>
              </ActionListItem>
              <ActionListItem data-test-id="email-button" key="Email">
                <Typography>Email:</Typography>
                <Typography>
                  <strong>{user?.mail}</strong>
                </Typography>
              </ActionListItem>
              <ActionListItem data-test-id="phone-number-button" key="Telefone">
                <Typography>Telefone:</Typography>
                <Typography>
                  <strong>{phoneNumber}</strong>
                </Typography>
              </ActionListItem>
              <ActionListItem
                data-test-id="address-button"
                key="Endereço"
                onClick={onAddressClick}
              >
                <Typography>Endereço</Typography>
              </ActionListItem>
              <ActionListItem
                data-test-id="exit-button"
                key="Sair"
                onClick={onExitButtonClick}
              >
                Sair
              </ActionListItem>
            </ActionList>
          </React.Fragment>
        }
      />
    </PageContainer>
  )
}
