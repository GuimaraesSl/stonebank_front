import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { UserRoutes } from 'features/user/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { PasswordField } from 'features/user/components/PasswordField'

export const ChooseNewPassword: React.FC = () => {
  const [newPassword, setNewPassword] = React.useState('')
  const history = useHistory()

  const onNewPasswordChange = (value: string) => {
    setNewPassword(value)
  }

  const onCancelButtonClick = () => {
    history.go(-2)
  }

  const onNextButtonClick = () => {
    history.push(UserRoutes.confirmNewPassword)
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
            subtitle="Escolha a nova senha para sua conta"
            description="xxxxxxx"
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
    </PageContainer>
  )
}
