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

export const ChangePassword: React.FC = () => {
  const [password, setPassword] = React.useState('')
  const history = useHistory()

  const onPasswordChange = (value: string) => {
    setPassword(value)
  }

  const onCancelButtonClick = () => {
    history.replace(UserRoutes.home)
  }

  const onNextButtonClick = () => {
    history.push(UserRoutes.chooseNewPassword)
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
            subtitle="Insira sua senha atual"
            description="xxxx"
          />
        }
        main={<PasswordField value={password} onChange={onPasswordChange} />}
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={password.length !== 6}
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
