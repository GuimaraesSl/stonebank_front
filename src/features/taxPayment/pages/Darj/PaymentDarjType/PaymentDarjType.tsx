import React from 'react'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight, Update } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { useHistory } from 'react-router-dom'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Grid, MenuItem } from '@material-ui/core'
import { useStyles } from 'features/taxPayment/pages/Darj/PaymentDarjType/PaymentDarjType.style'
import { TextField } from 'components/TextField'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { useDispatch } from 'react-redux'
import { updateDarjPaymentData } from 'features/taxPayment/redux/actions'
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

export const PaymentDarjType: React.FC = () => {
  const [startDate, setStartDate] = React.useState<string | null>()
  const [monthYear, setMonthYear] = React.useState<Date | null>(
    new Date(Date.now()),
  )
  const [referenceNumber, setReferenceNumber] = React.useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const styles = useStyles()
  const month = monthYear!.getMonth() + 1
  const validMonth = month < 10 ? 0 + month.toString() : month.toString()
  const year = monthYear!.getFullYear().toString()

  const onStartDateChange = (date: MaterialUiPickersDate) => {
    setStartDate(date?.toString())
    if (date) setMonthYear(date)
  }

  const onNextButtonClick = () => {
    dispatch(
      updateDarjPaymentData({
        referenceNumber: referenceNumber,
      }),
    )
    history.push(TaxPaymentRoutes.paymentDarjCodeNumber)
  }

  const onCancelButtonClick = () => {
    dispatch(updateDarjPaymentData())
    history.replace(AccountRoutes.home)
  }

  React.useEffect(() => {
    setReferenceNumber(validMonth.concat(year))
  }, [validMonth, year])

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
        header={<ProcessDescriptionHeader title="Impostos - Darj" />}
        main={
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <DatePicker
                className={styles.wrapper}
                views={['month', 'year']}
                label="Data de apuração"
                openTo="month"
                value={startDate}
                onChange={onStartDateChange}
                format={'MM/yyyy'}
                data-test-id="date-picker"
              />
            </Grid>

            <Grid item>
              <Grid
                container
                justifyContent="center"
                className={styles.scheduleButton}
                data-test-id="schedule-button"
              ></Grid>
            </Grid>
          </Grid>
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
