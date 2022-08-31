/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { AppBar } from 'components/AppBar'
import { TransferenceRoutes } from '../../constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { PageContainer } from 'components/PageContainer'
import { useHistory } from 'react-router-dom'
import { CurrencyFormatter, parseCurrency } from '_translate'
import { updateTransferenceData } from 'features/transference/redux/actions'
import { TransferType } from 'features/transference/redux/models/enum'
import { useValue } from 'hooks/useValue'
import { maskMoney } from '_utils/masks/money'
import { TextField } from 'components/TextField'
import { Alert } from 'components/Alert'
import { ErrorMessage } from 'components/ErrorMessage'

export const TransferValue: React.FC = () => {
  const [isValidValue, setIsValidValue] = React.useState(false)
  const { balance, transferType, name } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
    transferType: store.transference.transference?.transferType,
    name: store.transference.transference?.toName,
  }))
  const dispatch = useDispatch()
  const history = useHistory()
  const [valueInput, setValueInput] = useValue(maskMoney)
  const [balanceIsInvalid, setBalanceIsInvalid] = React.useState<
    boolean | undefined
  >()

  React.useEffect(() => {
    const convertedValue = parseCurrency(
      isNaN(parseCurrency(valueInput))
        ? CurrencyFormatter.format(0)
        : valueInput,
    )
    setIsValidValue(convertedValue > 0 && convertedValue <= balance)
    setBalanceIsInvalid(convertedValue > balance)
  }, [valueInput])

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value)
  }

  const onCancelButtonClick = () => {
    dispatch(updateTransferenceData())
    history.go(transferType === TransferType.InternalTransfer ? -4 : -8)
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!isValidValue) return

    history.push(TransferenceRoutes.schedule)
    dispatch(
      updateTransferenceData({ transferValue: parseCurrency(valueInput) }),
    )
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={TransferenceRoutes.transference}
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
            title="Transferência"
            subtitle="Quanto deseja transferir?"
            description={`Você está transferindo para conta de ${name}`}
          />
        }
        main={
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography data-test-id="balance">
                <strong>Seu saldo {CurrencyFormatter.format(balance)}</strong>
              </Typography>
            </Grid>
            <Grid
              item
              component="form"
              onSubmit={onSubmit}
            >
              <TextField
                label="Valor"
                placeholder="R$ 0,00"
                inputMode="numeric"
                value={
                  isNaN(parseCurrency(valueInput))
                    ? CurrencyFormatter.format(0)
                    : valueInput
                }
                onChange={onValueChange}
                data-test-id="change-value"
              />
            </Grid>
            <Box>
              {balanceIsInvalid && (
                <ErrorMessage message={'Saldo insuficiente'} />
              )}
            </Box>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                disabled={!isValidValue}
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
