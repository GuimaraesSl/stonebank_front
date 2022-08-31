import React from 'react'
import { Grid } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { AccountRoutes } from 'features/account/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { PageContainer } from 'components/PageContainer'
import { useStyles } from './BirthDaterSMS.style'
import { LEGAL_AGE, ShortDateFormatter } from '_translate'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { useHistory } from 'react-router-dom'
import { TextField } from 'components/TextField'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { DateButton } from 'components/DateButton/DateButton'
import { updateOnboardingForm } from 'features/onboarding/redux/actions'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { PopUpConfirmToken } from 'components/PopUpConfirmToken'

export const BirthDate: React.FC = () => {
  const [birthDate, setBirthDate] = React.useState<Date | null>(null)
  const [displayDate, setDisplayDate] = React.useState('')
  const [maxDate, setMaxDate] = React.useState<Date>(new Date())
  const [openDatePicker, setOpenDatePicker] = React.useState(false)
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const history = useHistory()

  const dispatch = useDispatch()
  const styles = useStyles()

  const isLegalAge = React.useMemo(() => {
    const today = new Date()

    const age = today.getFullYear() - (birthDate?.getFullYear() ?? 0)

    if (
      (birthDate?.getMonth() ?? 0) >= today.getMonth() &&
      (birthDate?.getDate() ?? 0) > today.getDate()
    )
      return age - 1 >= LEGAL_AGE

    return age >= LEGAL_AGE
  }, [birthDate])

  const onboardingSms = useSelector(
    (state: StoreState) => state.onboarding.onboardingForm,
  )

  const onboardingSmsState = useSelector(
    (state: StoreState) => state.onboarding,
  )

  const { loading, errorMessage } = onboardingSmsState

  React.useEffect(() => {
    setDisplayDate(_getDisplayDate())
    const today = new Date()
    setMaxDate(today)
  }, [birthDate])

  React.useEffect(() => {
    if (displayDate.length === 0) setDisableNextButton(true)
    else setDisableNextButton(false)
  }, [displayDate.length])

  const _getDisplayDate = () => {
    if (!birthDate) return displayDate
    else return ShortDateFormatter.format(birthDate)
  }

  const onSchedulingButtonClick = () => {
    setOpenDatePicker(true)
  }

  const onDatePickerClose = () => {
    setOpenDatePicker(false)
  }

  const onDateChange = (date: Date | null) => {
    setBirthDate(date)
  }

  const onCancelButtonClick = () => {
    history.go(-5)
  }

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) history.push(OnboardingRoutes.createPasswordForSMS)
    setOpenAuthorizationSheet(false)
  }

  const onNextButtonClick = () => {
    dispatch(
      updateOnboardingForm({
        birthDate: birthDate!,
      }),
    )
    setOpenAuthorizationSheet(true)
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
            title="Ative Sua Conta"
            subtitle="Qual a sua data de nascimento"
          />
        }
        main={
          <Grid container direction="column">
            <Grid item>
              <TextField
                label="Quando você nasceu?"
                placeholder={'Ex: 10/05/1972'}
                value={displayDate}
                data-test-id="display-date"
              />
            </Grid>
            <Grid item>
              <Grid
                container
                justify="center"
                className={styles.scheduleButton}
                data-test-id="schedule-button"
              >
                <Grid item>
                  <DateButton
                    open={openDatePicker}
                    value={birthDate}
                    maxDate={maxDate}
                    onClick={onSchedulingButtonClick}
                    onDateSelection={onDateChange}
                    onClose={onDatePickerClose}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
                disabled={disableNextButton || !isLegalAge}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
      <PopUpConfirmToken
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
        phoneNumber={onboardingSms?.phoneNumber}
        taxId={onboardingSms?.taxId}
        mail={onboardingSms?.mail}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
