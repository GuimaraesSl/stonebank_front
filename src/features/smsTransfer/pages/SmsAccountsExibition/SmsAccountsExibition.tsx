import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { AccountRoutes } from 'features/account/constants/routes'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { SelectionCard } from 'components/SelectionCard'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { SmsTransferRoutes } from 'features/smsTransfer/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { updateSmsTransferData } from 'features/smsTransfer/redux/actions'
import { Alert } from '@material-ui/lab'
import { Loader } from 'components/Loader'
import { StoreState } from 'redux/state'
import { useStyles } from './SmsAccountsExibition.style'
import { closeAlert } from 'features/account/redux/actions'
import { Icon } from 'components/Icon'

export const SmsAccountsExibition: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const styles = useStyles()

  const transferenceState = useSelector(
    (store: StoreState) => store.smsTransfer,
  )

  const { loading, favoredAccount, errorMessage } = transferenceState

  const onOtherAccountClick = () => {
    history.replace(SmsTransferRoutes.SmsTransferName)
  }

  const onCancelButtonClick = () => {
    dispatch(updateSmsTransferData())
    history.go(-3)
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const onAccountCardClick = () => {
    const { name, bank, bankBranch, bankAccount, bankAccountDigit } =
      favoredAccount!

    dispatch(
      updateSmsTransferData({
        toName: name,
        bank: bank,
        bankBranch: bankBranch,
        bankAccount: bankAccount,
        bankAccountDigit: bankAccountDigit,
      }),
    )
    history.push(SmsTransferRoutes.smsTransferValue)
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
            subtitle="Vimos que o Número especificado já tem conta(s) com a gente"
            description="Deseja enviar para alguma conta encontrada ou de outro banco?"
          />
        }
        main={
          <Box className={styles.content}>
            <SelectionCard
              title={favoredAccount?.name!}
              bankAccount={
                favoredAccount?.bankAccount &&
                `Conta ${favoredAccount?.bankAccount}-${favoredAccount?.bankAccountDigit}`
              }
              bank={favoredAccount?.bank && `Bank ${favoredAccount?.bank}`}
              endIcon={'next'}
              onClick={onAccountCardClick}
              data-test-id="account-card-button"
            />

            <Box mt={8} display="flex" justifyContent="center">
              <ButtonWithFloatingIcon
                icon={<Icon name="buttonBg" />}
                className={styles.otherAccountButton}
                onClick={onOtherAccountClick}
                data-test-id="other-account-button"
              >
                Outra conta
              </ButtonWithFloatingIcon>
            </Box>
          </Box>
        }
        footer={<ProcessPageFooter />}
      />
      {errorMessage && (
        <Alert title="Erro" severity={'error'} onClose={onAlertClose} />
      )}
      <Loader open={loading} />
    </PageContainer>
  )
}
