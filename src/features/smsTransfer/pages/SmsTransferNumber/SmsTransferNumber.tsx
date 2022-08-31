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
import { SmsTransferRoutes } from 'features/smsTransfer/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Box } from '@material-ui/core'
import { useMask } from 'hooks/useMask'
import { maskPhone } from '_utils/masks/phone'
import { useDispatch } from 'react-redux'
import {
  getAccountsByPhone,
  updateSmsTransferData,
} from 'features/smsTransfer/redux/actions'
import { useSelector } from 'react-redux'
import { closeAlert } from 'features/transference/redux/actions'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { SuccessSmsTransferState } from 'features/smsTransfer/redux/state'

export const SmsTransferNumber: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false)
  const [phoneNumber, setPhoneNumber] = useMask(maskPhone)

  const history = useHistory()
  const transferType = useSelector(
    (state: StoreState) => state.smsTransfer.smsTransfer?.transferType,
  )
  const smsTransference = useSelector((state: StoreState) => state.smsTransfer)
  const dispatch = useDispatch()

  const { loading, favoredAccount, errorMessage } = smsTransference
  const isValid = phoneNumber.length === 16

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  React.useEffect(() => {
    dispatch(updateSmsTransferData())
  }, [])

  React.useEffect(() => {
    if (submitted && smsTransference instanceof SuccessSmsTransferState) {
      history.push(
        favoredAccount
          ? SmsTransferRoutes.SmsAccountsExibition
          : SmsTransferRoutes.SmsTransferName,
      )
    }
  }, [
    favoredAccount,
    submitted,
    dispatch,
    phoneNumber,
    history,
    transferType,
    smsTransference,
  ])

  const onSmsNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
  }
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!isValid) return
    dispatch(getAccountsByPhone(phoneNumber))
    setSubmitted(true)
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
            title="Transferência pelo celular"
            subtitle="O primeiro passo é identificar o celular que receberá a transferência"
            description="Certifique-se que o número está correto, seu beneficiário receberá um código por SMS para ter acesso ao valor."
          />
        }
        main={
          <Box component="form" onSubmit={onSubmit}>
            <TextField
              label="Celular com DDD"
              placeholder="(XX) X XXXX.XXXX"
              value={phoneNumber}
              inputMode={'numeric'}
              onChange={onSmsNumberChange}
              data-test-id="change-sms-number"
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={!isValid}
                onClick={onSubmit}
                data-test-id="submit-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
      <Loader open={loading} />
    </PageContainer>
  )
}
