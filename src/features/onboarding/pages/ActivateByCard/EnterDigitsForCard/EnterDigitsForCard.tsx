import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { Box, Grid } from '@material-ui/core'
import { DigitsCardProps } from 'features/onboarding/components/inputs/CardDigitsInput'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { ValidateCard } from 'features/onboarding/redux/models/validateCard'
import {
  updateOnboardingForm,
  updateValidateCardForm,
  validateCardOnboarding,
} from 'features/onboarding/redux/actions'
import {
  SuccessVerifyCardState,
  InitialValidateCardState,
  OnboardingState,
} from 'features/onboarding/redux/state'

export const EnterDigitsForCard: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [panLastDigits, setPanLastDigits] = React.useState('')
  const [sentTaxId, setSentTaxId] = React.useState(false)
  const [sentValidation, setSentValidation] = React.useState(false)
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const [cardState, validateCard, loading, taxId] = useSelector<
    StoreState,
    [
      OnboardingState | undefined,
      ValidateCard | undefined,
      boolean,
      string | undefined,
    ]
  >(state => [
    state.onboarding,
    state.onboarding.validateCard,
    state.onboarding.loading,
    state.onboarding.validateCard?.taxId,
  ])

  React.useEffect(() => {
    panLastDigits.length !== 4
      ? setDisableNextButton(true)
      : setDisableNextButton(false)
  }, [panLastDigits.length])

  React.useEffect(() => {
    if (sentValidation && cardState instanceof SuccessVerifyCardState) {
      if (!validateCard?.isValid)
        history.push(OnboardingRoutes.invalidDataForCard)
      else {
        dispatch(updateOnboardingForm({ taxId }))
        history.push(OnboardingRoutes.enterNameForCard)
      }
    }
  }, [cardState])

  React.useEffect(() => {
    if (sentTaxId && cardState instanceof InitialValidateCardState)
      dispatch(validateCardOnboarding())

    setSentValidation(true)
  }, [cardState])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(updateValidateCardForm({ panLastDigits }))
    setSentTaxId(true)
  }

  const onCancelButtonClick = () => {
    history.replace(OnboardingRoutes.activateAccount)
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
          <Box>
            <ProcessDescriptionHeader
              title="Ative sua conta"
              subtitle="Hora de ativar seu cartão"
              description="Para identificarmos seus dados, insira os 4 últimos digitos do número do seu cartão."
            />
          </Box>
        }
        main={
          <Grid direction="column" alignItems="center">
            <Grid item component="form">
              <DigitsCardProps
                onChange={setPanLastDigits}
                value={panLastDigits}
              />
            </Grid>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={disableNextButton}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                data-test-id="submit-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
      <Loader open={loading} />
    </PageContainer>
  )
}
