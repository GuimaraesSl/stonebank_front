import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { TextField } from 'components/TextField'
import {
  Close,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { cancelLabel, nextLabel, returnLabel } from 'constants/buttons/labels'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { useDispatch } from 'react-redux'
import { updateOnboardingForm } from 'features/onboarding/redux/actions'
import { useMask } from 'hooks/useMask'
import { lettersOnly } from '_utils/masks/generics'

export const CreateName: React.FC = () => {
  const [name, setName] = useMask(lettersOnly)
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    if (name.length === 0) setDisableNextButton(true)
    else setDisableNextButton(false)
  }, [name.length])

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      updateOnboardingForm({
        name,
      }),
    )
    history.push(OnboardingRoutes.enterTaxPayerForSMS)
  }

  const onCancelButtonClick = () => {
    history.go(-2)
  }

  const onBackButtonClick = () => {
    history.goBack()
    dispatch(updateOnboardingForm())
  }

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
            title="Ative sua Conta"
            subtitle="Seu Nome"
            description="Insira seu nome"
          />
        }
        main={
          <Box component="form" onSubmit={onSubmit}>
            <TextField
              label="Nome"
              placeholder={'Nome Completo'}
              value={name}
              onChange={onNameChange}
              data-test-id="name"
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                disabled={disableNextButton}
                data-test-id="submit-button"
              >
                {nextLabel}
              </Button>
            }
            secondaryButton={
              <Button
                palette="secondary"
                startIcon={<KeyboardArrowLeft color="secondary" />}
                onClick={onBackButtonClick}
                data-test-id="back-button"
              >
                {returnLabel}
              </Button>
            }
          />
        }
      />
    </PageContainer>
  )
}
