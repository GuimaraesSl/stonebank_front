import React from 'react'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { TextField } from 'components/TextField'
import { useMask } from 'hooks/useMask'
import { maskPhone } from '_utils/masks/phone'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PopUpConfirmToken } from 'components/PopUpConfirmToken'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { Box } from '@material-ui/core'
import { updateOnboardingForm } from 'features/onboarding/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'

export const EnterPhoneForCard: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [phoneNumber, setPhoneNumber] = useMask(maskPhone)
  const [sentRequest, setSentRequest] = React.useState(false)
  const [openTokenPopUp, setOpenTokenPopUp] = React.useState(false)
  const { onboardingForm } = useSelector(
    (state: StoreState) => state.onboarding,
  )

  React.useEffect(() => {
    if (sentRequest) history.push(OnboardingRoutes.createPasswordForCard)
  }, [sentRequest])

  const onCancelButtonClick = () => {
    history.replace(OnboardingRoutes.activateAccount)
  }

  const onNextButtonClick = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(updateOnboardingForm({ phoneNumber }))
    setOpenTokenPopUp(true)
  }

  const onTokenCloseButtonClick = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      setSentRequest(true)
    }
    setOpenTokenPopUp(false)
  }

  const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPhoneNumber(event.target.value)

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
              subtitle="Informe o número de celular cadastrado"
              description="Você receberá, por mensagem de texto, um código de validação do seu acesso."
            />
          </Box>
        }
        main={
          <React.Fragment>
            <TextField
              label="Celular com DDD"
              value={phoneNumber}
              placeholder="(XX) X XXXX.XXXX"
              onChange={onPhoneChange}
              maxValue={11}
              data-test-id="change-phone-number"
            />
          </React.Fragment>
        }
        footer={
          <Box>
            <ProcessPageFooter
              primaryButton={
                <Button
                  disabled={phoneNumber.length !== 16}
                  endIcon={<KeyboardArrowRight color="secondary" />}
                  onClick={onNextButtonClick}
                  data-test-id="next-button"
                >
                  {nextLabel}
                </Button>
              }
            />
            <PopUpConfirmToken
              open={openTokenPopUp}
              onClose={onTokenCloseButtonClick}
              mail={onboardingForm?.mail}
              taxId={onboardingForm?.taxId}
              phoneNumber={onboardingForm?.phoneNumber}
              nextRoute={OnboardingRoutes.createPasswordForCard}
            />
          </Box>
        }
      />
    </PageContainer>
  )
}
