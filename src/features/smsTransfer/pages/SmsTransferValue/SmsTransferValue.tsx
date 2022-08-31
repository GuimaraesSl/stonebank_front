import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { AccountRoutes } from 'features/account/constants/routes'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight, Store } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { TextField } from 'components/TextField'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { SmsTransferRoutes } from 'features/smsTransfer/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Box, Grid, Typography } from '@material-ui/core'
import { maskMoney } from '_utils/masks/money'
import { useDispatch, useSelector } from 'react-redux'
import { updateSmsTransferData } from 'features/smsTransfer/redux/actions'
import { useValue } from 'hooks/useValue'
import { StoreState } from 'redux/state'
import { CurrencyFormatter, parseCurrency } from '_translate'
import { ErrorMessage } from 'components/ErrorMessage'

export const SmsTransferValue: React.FC = () => {
  const [valueInput, setValueInput] = useValue(maskMoney)
  const [isValidValue, setIsValidValue] = React.useState(false)
  const { smsTransfer: smsTransferState } = useSelector(
    (store: StoreState) => store.smsTransfer,
  )
  const [balanceIsInvalid, setBalanceIsInvalid] = React.useState<
    boolean | undefined
  >()
  const { balance } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
  }))
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    const convertedValue = parseCurrency(
      isNaN(parseCurrency(valueInput))
        ? CurrencyFormatter.format(0)
        : valueInput,
    )
    setIsValidValue(convertedValue > 0)
    setIsValidValue(convertedValue > 0 && convertedValue <= balance)
    setBalanceIsInvalid(convertedValue > balance)
  }, [valueInput])

  const onTransferValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValueInput(event.target.value)
  }

  const onCancelButtonClick = () => {
    dispatch(updateSmsTransferData())
    history.replace(AccountRoutes.home)
  }

  const smsTransfer = useSelector(
    (store: StoreState) => store.smsTransfer.smsTransfer,
  )

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(
      updateSmsTransferData({
        ...smsTransfer,
        value: parseCurrency(valueInput),
      }),
    )
    history.push(SmsTransferRoutes.smsTransferSummary)
  }

  const onBackButtonClick = () =>
    dispatch(updateSmsTransferData({ ...smsTransferState, toName: undefined }))

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
            title="Transferência pelo celular"
            subtitle="Quanto deseja transferir?"
            description="Digite o valor."
          />
        }
        main={
          <Box>
            <Box component="form" onSubmit={onSubmit}>
              <TextField
                label="Valor"
                placeholder="R$ 0,00"
                value={
                  isNaN(parseCurrency(valueInput))
                    ? CurrencyFormatter.format(0)
                    : valueInput
                }
                inputMode="numeric"
                onChange={onTransferValueChange}
                data-test-id="transfer-value"
              />
            </Box>
            <Box>
              {balanceIsInvalid && (
                <ErrorMessage message={'Saldo insuficiente'} />
              )}
            </Box>
          </Box>
        }
        footer={
          <ProcessPageFooter
            onBackButtonClick={onBackButtonClick}
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={!isValidValue}
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
