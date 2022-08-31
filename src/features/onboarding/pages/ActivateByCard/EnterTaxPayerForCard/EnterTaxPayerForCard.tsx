import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { TextField } from 'components/TextField'
import { useMask } from 'hooks/useMask'
import { maskCpf } from '_utils/masks/taxPayer'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { Grid } from '@material-ui/core'
import { updateValidateCardForm } from 'features/onboarding/redux/actions'

export const EnterTaxPayerForCard: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [taxId, setTaxId] = useMask(maskCpf)
  const [disableNextButton, setDisableNextButton] = React.useState(false)

  React.useEffect(() => {
    taxId.length !== 14
      ? setDisableNextButton(true)
      : setDisableNextButton(false)
  }, [taxId.length])

  const onCancelButtonClick = () => {
    history.replace(OnboardingRoutes.activateAccount)
  }

  const onTaxIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTaxId(event.target.value)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(updateValidateCardForm({ taxId }))
    history.push(OnboardingRoutes.enterIdentifierForCard)
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
            subtitle="Que bom que seu cartão já está com você"
            description="Agora precisamos confirmar seu CPF."
          />
        }
        main={
          <React.Fragment>
            <Grid container direction="column">
              <Grid item component="form">
                <TextField
                  label="CPF"
                  value={taxId}
                  placeholder="Digite apenas números."
                  onChange={onTaxIdChange}
                  maxValue={16}
                  data-test-id="taxid"
                />
              </Grid>
            </Grid>
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
