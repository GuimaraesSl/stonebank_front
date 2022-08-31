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
import { useStyles } from 'features/taxPayment/pages/Gare/PaymentGareDateType/PaymentGareDateType.style'
import { TextField } from 'components/TextField'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { useDispatch } from 'react-redux'
import { updateGarePaymentData } from 'features/taxPayment/redux/actions'
import { GAREType } from 'features/taxPayment/redux/models/enum'
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

export const PaymentGareDateType: React.FC = () => {
  const [typeGare, setTypeGare] = React.useState('')
  const [startDate, setStartDate] = React.useState<string | null>()
  const [monthYear, setMonthYear] = React.useState<Date | null>(
    new Date(Date.now()),
  )
  const [isValidValue, setIsValidValue] = React.useState(true)
  const [referenceNumber, setReferenceNumber] = React.useState('')
  const typesgare = [
    { id: '0', value: 'ICMS' },
    { id: '1', value: 'DR' },
    { id: '2', value: 'ITCMD' },
  ]
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
      updateGarePaymentData({
        GAREType: Number(typeGare) as GAREType,
        referenceNumber: referenceNumber,
      }),
    )
    history.push(TaxPaymentRoutes.paymentGareCodeNumber)
  }

  const onCancelButtonClick = () => {
    dispatch(updateGarePaymentData())
    history.replace(AccountRoutes.home)
  }

  const onGareType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeGare(event.target.value)
  }

  React.useEffect(() => {
    setReferenceNumber(validMonth.concat(year))
  }, [validMonth, year])

  React.useEffect(() => {
    setIsValidValue(!typeGare)
  }, [typeGare])

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
        header={<ProcessDescriptionHeader title="Impostos - GARE" />}
        main={
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <TextField
                label="Tipo de Gare"
                value={typeGare}
                onChange={onGareType}
                select
                data-test-id="gare-type"
              >
                {typesgare.map(option => (
                  <MenuItem
                    data-test-id="gare-option"
                    key={option.id}
                    value={option.id}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item>
              <DatePicker
                className={styles.wrapper}
                views={['month', 'year']}
                label="Data de apuração"
                openTo="month"
                value={startDate}
                onChange={onStartDateChange}
                format={'MM/yyyy'}
                data-test-id="change-start-date"
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
                disabled={isValidValue}
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
