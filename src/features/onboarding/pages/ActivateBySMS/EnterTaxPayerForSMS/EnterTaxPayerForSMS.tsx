import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { TextField } from 'components/TextField'
import { useMask } from 'hooks/useMask'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { maskCpf } from '_utils/masks/taxPayer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { updateOnboardingForm } from 'features/onboarding/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'

export const EnterTaxPayer: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [taxId, setTaxId] = useMask(maskCpf)

  const allowToContinue = taxId.length === 14

  const onboardingSms = useSelector(
    (state: StoreState) => state.onboarding.onboardingForm,
  )

  const onTaxIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTaxId(event.target.value)

  const onCancelButtonClick = () => {
    history.go(-3)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (allowToContinue) {
      dispatch(
        updateOnboardingForm({
          taxId,
        }),
      )
      history.push(OnboardingRoutes.enterMailForSms)
    }
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
            subtitle={`Olá, ${onboardingSms?.name}`}
            description="Agora precisamos confirmar seu CPF"
          />
        }
        main={
          <React.Fragment>
            <Grid container direction="column">
              <Grid item component="form" onSubmit={onSubmit}>
                <TextField
                  label="CPF"
                  value={taxId}
                  placeholder="Digite apenas números"
                  onChange={onTaxIdChange}
                  maxValue={16}
                  data-test-id="taxid"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="baseline"
              justifyContent="center"
            ></Grid>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={!allowToContinue}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
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
