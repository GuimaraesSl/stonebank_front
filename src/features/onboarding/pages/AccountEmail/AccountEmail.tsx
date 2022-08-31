import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { PageContainer } from 'components/PageContainer'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { TextField } from 'components/TextField'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { updateOnboardingForm } from 'features/onboarding/redux/actions'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { validateEmail } from '_utils/validate'
import { useStyles } from './AccountEmail.style'

export const AccountEmail: React.FC = () => {
  const [emailValue, setEmailValue] = useState('')
  const [error, setError] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()
  const style = useStyles()

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value)
  }

  const onNextButtonClick = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updateOnboardingForm({ mail: emailValue }))
    history.push(OnboardingRoutes.createPasswordForSMS)
  }

  const onCancelButtonClick = () => {
    history.go(-7)
  }

  const validateError = () => {
    setError(!validateEmail(emailValue))
  }

  useEffect(() => {
    validateError()
  }, [emailValue])

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={OnboardingRoutes.welcome}
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
            title="Abertura de conta"
            subtitle="Email"
            description="Se possuir, cadastre seu email. Esse campo é opcional."
          />
        }
        main={
          <Fragment>
            <TextField
              label="Email (opcional)"
              error={emailValue ? error : false}
              value={emailValue}
              onChange={onChangeEmail}
              variant="outlined"
              placeholder="Digite aqui"
              data-test-id="account-email"
            />
            {emailValue.length > 0 && error && (
              <span className={style.inputError}>E-mail inválido</span>
            )}
          </Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
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
