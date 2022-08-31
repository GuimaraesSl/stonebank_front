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
import { LEGAL_AGE, ShortDateFormatter } from '_translate'
import { useHistory } from 'react-router-dom'
import { TextField } from 'components/TextField'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { DateButton } from 'components/DateButton/DateButton'
import { StoreState } from 'redux/state'
import { useStyles } from './AssociateBirthDateCard.style'
import { CardRoutes } from 'features/card/constants/routes'
import { updateCard } from 'features/card/redux/actions'
import { Validator } from 'components/Validator/Validator'

export const AssociateBirthDateCard: React.FC = () => {
  const [birthDate, setBirthDate] = React.useState<Date | null>(null)
  const [displayDate, setDisplayDate] = React.useState('')
  const [maxDate, setMaxDate] = React.useState<Date>(new Date())
  const [openDatePicker, setOpenDatePicker] = React.useState(false)
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const history = useHistory()
  const cardState = useSelector((s: StoreState) => s.card)
  const { card } = cardState

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
    history.replace(AccountRoutes.home)
    dispatch(updateCard())
  }
  const onNextButtonClick = () => {
    dispatch(
      updateCard({
        ...card!,
        birthDate: birthDate?.toLocaleDateString('en-US'),
      }),
    )
    history.push(CardRoutes.associateGenderUserCard)
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
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Associar novo cartão"
            subtitle="Quase lá! Precisamos confirmar alguns dados pessoais"
            description="Qual a sua data de nascimento?"
          />
        }
        main={
          <Grid container direction="column">
            <Grid item>
              <TextField
                label="Data de Nascimento"
                placeholder={'Ex: 10/05/1972'}
                value={displayDate}
              />
            </Grid>
            <Validator
              value={birthDate?.toLocaleDateString('en-US')}
              description={
                !(disableNextButton || !isLegalAge)
                  ? ''
                  : 'É necessário ter ao menos 18 anos'
              }
              validation={() => {}}
              onValidate={() => {}}
              strictValidation={true}
            />
            <Grid item>
              <Grid
                container
                justify="center"
                className={styles.scheduleButton}
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
