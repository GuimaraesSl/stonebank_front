import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { AppBar } from 'components/AppBar'
import { AccountRoutes } from 'features/account/constants/routes'
import { SearchField } from 'components/SearchField/SearchField'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { BankCard } from 'features/transference/components/BankCard/BankCard'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Button } from 'components/Button'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { Bank } from 'features/transference/redux/models/bank'
import { useHistory } from 'react-router-dom'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import { useStyles } from './SelectBank.style'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import {
  listBanks,
  updateTransferenceData,
} from 'features/transference/redux/actions'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'

export const SelectBank: React.FC = () => {
  const [toBank, setToBank] = React.useState('')
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const [banks, loading, errorMessage] = useSelector<
    StoreState,
    [Bank[] | undefined, boolean, string | undefined]
  >(state => [
    state.transference.banks,
    state.transference.loading,
    state.transference.errorMessage,
  ])
  const history = useHistory()
  const dispatch = useDispatch()
  const styles = useStyles()
  const [displayBanks, setDisplayBanks] = React.useState(banks)

  React.useEffect(() => {
    dispatch(listBanks())
  }, [])

  React.useEffect(() => {
    setDisplayBanks(banks)
  }, [banks])

  React.useEffect(() => {
    if (toBank.length === 0) setDisableNextButton(true)
    else setDisableNextButton(false)
  }, [toBank])

  const _search = (value: string) => {
    value = value.replace(/^\s+|\s+$/, '').toLowerCase()
    const result = banks?.filter(
      bank =>
        bank.code.includes(value.replace(/^0/, '')) ||
        bank.name.toLowerCase().includes(value),
    )
    setDisplayBanks(result)
  }

  const onBankClick = (bank: Bank) => {
    setToBank(bank.code)
  }

  const onNextButtonClick = () => {
    dispatch(updateTransferenceData({ bank: toBank }))
    history.push(TransferenceRoutes.selectAccountType)
  }

  const onCancelButtonClick = () => {
    dispatch(updateTransferenceData())
    history.go(-4)
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
            description="Selecione a instituição na lista ou busque pelo nome ou código do banco."
          />
        }
        main={
          <Box display="flex" flexDirection="column">
            <Box className={styles.searchField}>
              <SearchField
                placeholder="Busque por nome ou código"
                onChange={e => _search(e.target.value)}
              />
            </Box>
            <Box>
              {displayBanks?.map(bank => (
                <BankCard
                  key={bank.code}
                  bank={bank}
                  selected={toBank === bank.code}
                  onClick={onBankClick}
                />
              ))}
            </Box>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={disableNextButton}
                onClick={onNextButtonClick}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
        footerPosition="fixed"
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Erro" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
