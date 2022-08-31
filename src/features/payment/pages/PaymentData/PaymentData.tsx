import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageContainer } from 'components/PageContainer'
import { useHistory } from 'react-router-dom'
import { Grid, Typography, Box } from '@material-ui/core'
import { TextField } from 'components/TextField'
import { AppBar } from 'components/AppBar'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ReceiverAndValue } from 'features/payment/components/ReceiverAndValue'
import { ShortDateFormatter } from '_translate'
import { useStyles } from './PaymentData.style'
import { PaymentRoutes } from 'features/payment/constants/routes'
import { SchedulingButton } from 'components/SchedulingButton'
import { StoreState } from 'redux/state'
import { AccountRoutes } from 'features/account/constants/routes'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { closeAlert, updatePaymentData } from 'features/payment/redux/actions'
import { PopUpErrorMessage } from 'components/PopUpErrorMessage'
import { ErrorPaymentState } from 'features/payment/redux/state'
import { ErrorMessage } from 'components/ErrorMessage'

export const PaymentData: React.FC = () => {
  const balance = useSelector((state: StoreState) => state.account.dashboard)
  const history = useHistory()
  const { paymentData, loading, errorMessage } = useSelector(
    (state: StoreState) => state.payment,
  )
  const [paymentDate, setPaymentDate] = React.useState<Date | null>(
    paymentData?.paymentDate!,
  )
  const [minDate] = React.useState<Date>(new Date())
  const [openDatePicker, setOpenDatePicker] = React.useState(false)
  const dispatch = useDispatch()
  const style = useStyles()
  const paymentState = useSelector((state: StoreState) => state.payment)

  const paymentDateIsToday = React.useMemo(() => {
    const removeTime = (date: Date) => {
      const d = new Date(date)
      d.setHours(0)
      d.setMinutes(0)
      d.setSeconds(0)
      d.setMilliseconds(0)

      return d
    }
    return (
      paymentDate &&
      removeTime(paymentDate).getTime() === removeTime(new Date()).getTime()
    )
  }, [paymentDate])

  const onCancelButtonClick = () => {
    dispatch(updatePaymentData())
    history.replace(AccountRoutes.home)
  }

  const onNextButtonClick = () => {
    history.push(PaymentRoutes.paymentEmptyDescription)
  }

  const onSchedulingButtonClick = () => {
    setOpenDatePicker(true)
  }

  const onDatePickerClose = () => {
    setOpenDatePicker(false)
  }

  const onStartDateChange = (date: Date | null) => {
    if (date) {
      setPaymentDate(date)
      dispatch(updatePaymentData({ paymentDate: date }))
    }
  }

  const onAlertClose = () => dispatch(closeAlert())
  const onBackButtonClick = () => dispatch(updatePaymentData())
  const error = paymentState instanceof ErrorPaymentState
  const errorBalance = balance?.balance! < paymentData?.paymentValue!

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
          <React.Fragment>
            <ProcessDescriptionHeader
              title="Pagamentos"
              subtitle="Data do pagamento"
            />
            <Box className={style.marginHeader}>
              <ReceiverAndValue
                receiver={
                  paymentData?.concessionaireName ?? paymentData?.receiverName
                }
                value={paymentData?.paymentValue}
              />
            </Box>
          </React.Fragment>
        }
        main={
          <React.Fragment>
            <Box className={style.customTexts}>
              {paymentData?.dueDate && (
                <Typography
                  variant="body2"
                  className={style.dueDateStyle}
                  data-test-id="due-date"
                >
                  Vencimento {ShortDateFormatter.format(paymentData?.dueDate)}
                </Typography>
              )}
            </Box>
            <Grid>
              {error && 
                <Alert 
                 message={errorMessage}
                 title="Erro"
                 severity={'error'}
                />
              }
              {errorBalance &&
               <ErrorMessage message={'Saldo insuficiente'} />
              }
              <Box className={style.customInput}>
                <TextField
                  data-test-id="display-date"
                  label="Quando?"
                  placeholder="Hoje"
                  value={
                    paymentDateIsToday
                      ? 'Hoje'
                      : ShortDateFormatter.format(paymentDate ?? new Date())
                  }
                />
              </Box>
              <Box className={style.customTexts}>
                <Typography variant="caption" className={style.infoText}>
                  Pagamentos realizados em fins de semana ou feriados serão
                  agendados para o próximo dia útil.
                </Typography>
              </Box>
              <Box className={style.buttonDate}>
                <SchedulingButton
                  open={openDatePicker}
                  onClose={onDatePickerClose}
                  value={paymentDate}
                  onDateSelection={onStartDateChange}
                  onClick={onSchedulingButtonClick}
                  minDate={minDate}
                  disabled={error || errorBalance}
                />
              </Box>
            </Grid>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
                disabled={error || errorBalance}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
            onBackButtonClick={onBackButtonClick}
          />
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  )
}
