import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { useMask } from 'hooks/useMask'
import { maskIdCard } from '_utils/masks/idCard'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { Box } from '@material-ui/core'
import { ReadQrCodeButton } from 'features/card/components/ReadQrCodeButton'
import { TextField } from 'components/TextField'
import { updateValidateCardForm } from 'features/onboarding/redux/actions'

export const EnterIdentifierForCard: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [identifierCard, setIdentifierCard] = useMask(maskIdCard)
  const [disableNextButton, setDisableNextButton] = React.useState(false)

  React.useEffect(() => {
    identifierCard.length !== 9
      ? setDisableNextButton(true)
      : setDisableNextButton(false)
  }, [identifierCard.length])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(updateValidateCardForm({ identifierCard }))
    history.push(OnboardingRoutes.enterDigitsForCard)
  }

  const onIdentifierCardChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setIdentifierCard(event.target.value)

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
              subtitle="Identificar seu cartão"
              description="Insira o código de identificação de 9 dígitos impresso em seu cartão."
            />
          </Box>
        }
        main={
          <React.Fragment>
            <TextField
              label="Insira o ID CARD de 9 dígitos"
              value={identifierCard}
              onChange={onIdentifierCardChange}
              maxValue={9}
              data-test-id="idcard"
            />
            {/* <ReadQrCodeButton /> */}
          </React.Fragment>
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
    </PageContainer>
  )
}
