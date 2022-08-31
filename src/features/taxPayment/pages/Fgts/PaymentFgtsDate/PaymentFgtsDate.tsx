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
import { useStyles } from 'features/taxPayment/pages/Fgts/PaymentFgtsDate/PaymentFgtsDate.style'
import { TextField } from 'components/TextField'
import { SchedulingButton } from 'components/SchedulingButton'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { ShortDateFormatter } from '_translate'
import { compareTransferDates } from 'features/transference/_utils'
import { updateFgtsPaymentData } from 'features/taxPayment/redux/actions'
import { useDispatch } from 'react-redux'

export const PaymentFgtsDate: React.FC = () => {
  const [openDatePicker, setOpenDatePicker] = React.useState(false)
  const [displayDate, setDisplayDate] = React.useState('')
  const [minDate] = React.useState<Date>(new Date())
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()
  const [paymentDate, setPaymentDate] = React.useState<Date | null>(
    new Date(Date.now()),
  )

  React.useEffect(() => {
    setDisplayDate(_getDisplayDate())
  }, [paymentDate])

  const _getDisplayDate = () => {
    const today = 'Hoje'
    if (!paymentDate) return today
    else if (compareTransferDates(paymentDate, new Date()) === 0) return today
    else return ShortDateFormatter.format(paymentDate)
  }

  const onNextButtonClick = () => {
    history.push(TaxPaymentRoutes.paymentFgtsDescription)
    dispatch(
      updateFgtsPaymentData({
        paymentDate: paymentDate,
      }),
    )
  }

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateFgtsPaymentData())
  }

  const onDatePickerClose = () => {
    setOpenDatePicker(false)
  }

  const onStartDateChange = (date: Date | null) => {
    setPaymentDate(date)
  }

  const onSchedulingButtonClick = () => {
    setOpenDatePicker(true)
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
        header={<ProcessDescriptionHeader title="Impostos - FGTS" />}
        main={
          <React.Fragment>
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
                  value={paymentDate}
                  onDateSelection={onStartDateChange}
                  onClick={onSchedulingButtonClick}
                  minDate={minDate}
                />
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
