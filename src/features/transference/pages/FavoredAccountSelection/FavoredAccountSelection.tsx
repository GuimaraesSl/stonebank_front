import React from 'react'
import { Box } from '@material-ui/core'
import { AccountRoutes } from 'features/account/constants/routes'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { cancelLabel } from 'constants/buttons/labels'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { SelectionCard } from 'components/SelectionCard'
import { useStyles } from './FavoredAccountSelection.style'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { updateTransferenceData } from 'features/transference/redux/actions'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'
import { closeAlert } from 'features/account/redux/actions'
import { TransferType } from 'features/transference/redux/models/enum'
import { Icon } from 'components/Icon'

export const FavoredAccountSelection: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const styles = useStyles()
  const transferenceState = useSelector(
    (store: StoreState) => store.transference,
  )

  React.useEffect(() => {
    dispatch(
      updateTransferenceData({
        transferType: TransferType.InternalTransfer,
      }),
    )
  }, [])

  const { loading, favoredAccounts, errorMessage } = transferenceState

  const onCancelButtonClick = () => {
    dispatch(updateTransferenceData())
    history.go(-3)
  }

  const onAccountCardClick = (i: number) => {
    const { name, bank, bankBranch, bankAccount, bankAccountDigit } =
      favoredAccounts![i]

    dispatch(
      updateTransferenceData({
        toName: name,
        bank: bank,
        bankBranch: bankBranch,
        bankAccount: bankAccount,
        bankAccountDigit: bankAccountDigit,
      }),
    )
    history.push(TransferenceRoutes.value)
  }

  const onOtherAccountClick = () => {
    history.replace(TransferenceRoutes.favoredName)
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
            subtitle="Vimos que o CPF/CNPJ especificado já tem conta(s) com a gente"
            description="Deseja enviar para alguma conta encontrada ou de outro banco?"
          />
        }
        main={
          <Box className={styles.content}>
            {favoredAccounts?.map((account, i) => (
              <SelectionCard
                key={i}
                title={account.name}
                bankAccount={
                  account.bankAccount
                    ? `Conta ${account.bankAccount}-${account.bankAccountDigit}`
                    : ''
                }
                bank={account.bank ? `Bank ${account.bank}` : ''}
                endIcon={'next'}
                onClick={() => onAccountCardClick(i)}
              />
            ))}

            <Box mt={8} display="flex" justifyContent="center">
              <ButtonWithFloatingIcon
                icon={<Icon name="buttonBg" />}
                className={styles.otherAccountButton}
                onClick={onOtherAccountClick}
                data-test-id="favored-account-selection"
              >
                Outra conta
              </ButtonWithFloatingIcon>
            </Box>
          </Box>
        }
        footer={<ProcessPageFooter />}
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
