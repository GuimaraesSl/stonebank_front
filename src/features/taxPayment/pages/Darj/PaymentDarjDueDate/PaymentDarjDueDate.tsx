import React from 'react'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { useHistory } from 'react-router-dom'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Grid } from '@material-ui/core'
import { useStyles } from 'features/taxPayment/pages/Darj/PaymentDarjDueDate/PaymentDarjDueDate.style'
import { TextField } from 'components/TextField'
import { SchedulingButton } from 'components/SchedulingButton'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { ShortDateFormatter } from '_translate'
import { compareTransferDates } from 'features/transference/_utils'
import { DateInput } from 'components/DateInput'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { SuccessTaxPaymentState } from 'features/taxPayment/redux/state'
import { updateDarjPaymentData } from 'features/taxPayment/redux/actions'

export const PaymentDarjDueDate: React.FC = () => {
  const [openDatePicker, setOpenDatePicker] = React.useState(false)
  const [displayDate, setDisplayDate] = React.useState('')
  const [minDate] = React.useState<Date>(new Date())
  const [startDate, setStartDate] = React.useState<string | undefined>()
  const history = useHistory()
  const styles = useStyles()
  const [paymentDarjDueDate, setPaymentDarjDueDate] =
    React.useState<Date | null>(new Date(Date.now()))
  const [paymentDarjDate, setPaymentDarjDate] = React.useState<Date | null>(
    new Date(Date.now()),
  )

  React.useEffect(() => {
    setDisplayDate(_getDisplayDate())
  }, [paymentDarjDate])

  const _getDisplayDate = () => {
    const today = 'Hoje'
    if (!paymentDarjDate) return today
    else if (compareTransferDates(paymentDarjDate, new Date()) === 0)
      return today
    else return ShortDateFormatter.format(paymentDarjDate)
  }

  const onDatePickerClose = () => {
    setOpenDatePicker(false)
  }

  const onStartDateChange = (date: Date | null) => {
    setPaymentDarjDate(date)
  }

  const onStartDueDateChange = (date: MaterialUiPickersDate) => {
    setStartDate(date?.toString())
    setPaymentDarjDueDate(date)
  }

  const onSchedulingButtonClick = () => {
    setOpenDatePicker(true)
  }

  const taxPaymentState = useSelector((state: StoreState) => state.taxPayment)

  const dispatch = useDispatch()

  const onNextButtonClick = () => {
    history.push(TaxPaymentRoutes.paymentDarjDescription)
    dispatch(
      updateDarjPaymentData({
        paymentDate: paymentDarjDate,
        dueDate: paymentDarjDueDate,
      }),
    )
  }

  const onCancelButtonClick = () => {
    dispatch(updateDarjPaymentData())
    history.replace(AccountRoutes.home)
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
        header={<ProcessDescriptionHeader title="Impostos - DARJ" />}
        main={
          <React.Fragment>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <DateInput
                  label="Data de Vencimento"
                  value={startDate}
                  onChange={onStartDueDateChange}
                  data-test-id="due-date"
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Pagar"
                  placeholder="Hoje"
                  value={displayDate}
                  data-test-id="display-date"
                />
              </Grid>
              <Grid item>
                <Grid
                  container
                  justifyContent="center"
                  className={styles.scheduleButton}
                  data-test-id="schedule-button"
                >
                  <SchedulingButton
                    open={openDatePicker}
                    onClose={onDatePickerClose}
                    value={paymentDarjDate}
                    onDateSelection={onStartDateChange}
                    onClick={onSchedulingButtonClick}
                    minDate={minDate}
                  />
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
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
