import React from 'react'
import { AccountRoutes } from 'features/account/constants/routes'
import { useDispatch } from 'react-redux'
import { PageContainer } from 'components/PageContainer'
import { LEGAL_AGE, ShortDateFormatter } from '_translate'
import { TextField } from 'components/TextField'
import { DateButton } from 'components/DateButton/DateButton'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Grid } from '@material-ui/core'
import { useStyles } from './EnterBirthDateForCard.style'
import { updateOnboardingForm } from 'features/onboarding/redux/actions'

export const EnterBirthDateForCard: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const [birthDate, setBirthDate] = React.useState<Date | null>(null)
  const [displayDate, setDisplayDate] = React.useState('')
  const [maxDate, setMaxDate] = React.useState<Date>(new Date())
  const [openDatePicker, setOpenDatePicker] = React.useState(false)
  const [disableNextButton, setDisableNextButton] = React.useState(false)

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
    history.replace(OnboardingRoutes.activateAccount)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(
      updateOnboardingForm({
        birthDate: birthDate!,
      }),
    )
    history.push(OnboardingRoutes.enterPhoneForCard)
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
            subtitle="Qual a sua data de nascimento ?"
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
                alignItems="center"
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
                onClick={onSubmit}
                disabled={disableNextButton || !isLegalAge}
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
