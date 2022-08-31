import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { AccountRoutes } from 'features/account/constants/routes'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { TextField } from 'components/TextField'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { useDispatch } from 'react-redux'
import { useMask } from 'hooks/useMask'
import { maskTransference } from '_utils/masks/transferenceNumber'
import { updateTransferenceData } from 'features/transference/redux/actions'
import { Box } from '@material-ui/core'

export const AccountNumber: React.FC = () => {
  const [accountNumber, setAccountNumber] = useMask(maskTransference)
  const dispatch = useDispatch()
  const history = useHistory()

  const _splitAccountNumberFromDigit = (): [string, string] => {
    return [
      accountNumber.substring(0, accountNumber.length - 1),
      Array.from(accountNumber).pop()!,
    ]
  }

  const onAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAccountNumber(event.target.value)
  }

  const onCancelButtonClick = () => {
    dispatch(updateTransferenceData())
    history.go(-7)
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const [bankAccount, bankAccountDigit] = _splitAccountNumberFromDigit()
    if (accountNumber.length >= 5) {
      dispatch(updateTransferenceData({ bankAccount, bankAccountDigit }))
      history.push(TransferenceRoutes.value)
    }
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
            title="Transferência"
            subtitle="Qual o número da conta"
            description="Informe o número completo da conta, incluindo o dígito"
          />
        }
        main={
          <Box component="form" onSubmit={onSubmit}>
            <TextField
              label="Conta"
              placeholder="Digite apenas números"
              value={accountNumber}
              inputMode={'numeric'}
              onChange={onAccountNumberChange}
              data-test-id="change-account-number"
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={accountNumber.length < 5}
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
