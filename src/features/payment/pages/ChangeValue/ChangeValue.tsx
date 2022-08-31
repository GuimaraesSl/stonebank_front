import React from 'react'
import { useSelector } from 'react-redux'
import { PageContainer } from 'components/PageContainer'
import { useHistory } from 'react-router-dom'
import { Grid, Typography, Box } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ReceiverAndValue } from 'features/payment/components/ReceiverAndValue'
import { parseCurrency, ShortDateFormatter } from '_translate'
import { useStyles } from './ChangeValue.style'
import { PaymentRoutes } from 'features/payment/constants/routes'
import { StoreState } from 'redux/state'
import { AccountRoutes } from 'features/account/constants/routes'
import { maskMoney } from '_utils/masks/money'
import { useMask } from 'hooks/useMask'
import { useDispatch } from 'react-redux'
import { InputCurrency } from 'components/InputCurrency'
import { updatePaymentData } from 'features/payment/redux/actions'
import Alert from '@material-ui/lab/Alert'

export const ChangeValue: React.FC = () => {
  const style = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { paymentData } = useSelector((state: StoreState) => state.payment)
  const [value, setValue] = useMask(maskMoney)
  const [alertValue, setAlertValue] = React.useState(false)

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const _isValidValue = () => {
    const valueCasting = parseCurrency(value)
    if (valueCasting > 0) return true
    setAlertValue(true)
  }

  const onSubmit = () => {
    if (_isValidValue()) {
      history.push(PaymentRoutes.paymentEmptyDescription)
      dispatch(updatePaymentData({ paymentValue: parseCurrency(value) }))
    }
  }

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
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
          <React.Fragment>
            <ProcessDescriptionHeader
              title="Pagamentos"
              subtitle="Alterar Valor"
            />
            <Box className={style.marginHeader}>
              <ReceiverAndValue
                receiver={paymentData?.receiverName}
                value={paymentData?.paymentValue}
              />
            </Box>
          </React.Fragment>
        }
        main={
          <React.Fragment>
            <Box className={style.customTexts}>
              <Typography variant="body2" className={style.dueDate}>
                Vencimento {ShortDateFormatter.format(paymentData?.dueDate)}
              </Typography>
            </Box>
            <Grid>
              <Grid item component="form" onSubmit={onSubmit}>
                <InputCurrency
                  label="Valor"
                  value={value}
                  onChange={onValueChange}
                  placeholder={'R$' + paymentData?.paymentValue}
                  data-test-id="payment-value"
                />
                {alertValue && (
                  <Alert severity="warning">
                    O valor deve ser maior que R$0,00!
                  </Alert>
                )}
              </Grid>

              <Box className={style.customInput}>
                <Typography variant="caption">Valor total</Typography>
                <Typography
                  id="pd-subtitle"
                  variant="subtitle1"
                  className={style.subtitle}
                >
                  {!value ? (
                    <strong>R$ {paymentData?.paymentValue}</strong>
                  ) : (
                    <strong>{value}</strong>
                  )}
                </Typography>
              </Box>
            </Grid>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
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
