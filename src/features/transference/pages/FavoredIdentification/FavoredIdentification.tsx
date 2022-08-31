import React from 'react'
import { useHistory } from 'react-router-dom'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { maskTaxPayer } from '_utils/masks/taxPayer'
import { useMask } from 'hooks/useMask'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { TextField } from 'components/TextField'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import {
  closeAlert,
  getAccountsByTaxId,
  updateTransferenceData,
} from 'features/transference/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Box } from '@material-ui/core'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'
import { SuccessTransferenceState } from 'features/transference/redux/state'

export const FavoredIdentification: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false)
  const history = useHistory()
  const [taxId, setTaxId] = useMask(maskTaxPayer)
  const transferType = useSelector(
    (state: StoreState) => state.transference.transference?.transferType,
  )
  const transference = useSelector((state: StoreState) => state.transference)
  const dispatch = useDispatch()
  const { loading, favoredAccounts, errorMessage } = transference
  const isValid = taxId.length === 14 || taxId.length === 18

  React.useEffect(() => {
    dispatch(updateTransferenceData())
  }, [])

  React.useEffect(() => {
    if (submitted && transference instanceof SuccessTransferenceState) {
      history.push(
        favoredAccounts!.length > 0
          ? TransferenceRoutes.favoredAccountSelection
          : TransferenceRoutes.favoredName,
      )
    }
  }, [
    favoredAccounts,
    submitted,
    dispatch,
    taxId,
    history,
    transferType,
    transference,
  ])

  const onTaxIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTaxId(event.target.value)

  const onCancelButtonClick = () => {
    dispatch(updateTransferenceData())
    history.go(-2)
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!isValid) return
    dispatch(getAccountsByTaxId(taxId))
    setSubmitted(true)
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
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
            subtitle="Vamos identificar quem receberá sua transferência"
            description="Informe o CPF, CNPJ ou busque em seus contatos"
          />
        }
        main={
          <Box component="form" onSubmit={onSubmit}>
            <TextField
              label="CPF ou CNPJ"
              placeholder="Digite apenas números"
              inputMode="numeric"
              value={taxId}
              onChange={onTaxIdChange}
              data-test-id="change-taxid"
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
