import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { AccountRoutes } from 'features/account/constants/routes'
import { PasswordField } from 'features/user/components/PasswordField'
import { UserRoutes } from 'features/user/constants/routes'

export const ConfirmNewPasswordUserInformation: React.FC = () => {
  const [newPassword, setNewPassword] = React.useState('')
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const history = useHistory()

  const onNewPasswordChange = (value: string) => {
    setNewPassword(value)
  }

  const onCancelButtonClick = () => {
    history.go(-3)
  }

  const onNextButtonClick = () => {
    setOpenAuthorizationSheet(true)
    history.push(UserRoutes.changeConclude)
  }

  const onAuthorizationSheetClose = (isTokenValid: boolean) => {
    setOpenAuthorizationSheet(false)

    if (isTokenValid) {
      history.go(-3)
    }
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
        header={
          <ProcessDescriptionHeader
            title="Alterar sua senha"
            subtitle="Confirme a nova senha para sua conta"
            description="xxxxx"
          />
        }
        main={
          <PasswordField value={newPassword} onChange={onNewPasswordChange} />
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={newPassword.length !== 6}
                onClick={onNextButtonClick}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        description="Para autenticar a operação"
        onClose={onAuthorizationSheetClose}
      />
    </PageContainer>
  )
}
