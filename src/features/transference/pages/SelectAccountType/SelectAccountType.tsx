import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyles } from './SelectAccountType.style'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { SelectionCard } from 'components/SelectionCard'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { updateTransferenceData } from 'features/transference/redux/actions'
import { AccountType } from 'features/transference/redux/models/enum'
import { StoreState } from 'redux/state'

export const SelectAccountType: React.FC = () => {
  const [accountType, setAccountType] = React.useState<
    AccountType | undefined
  >()
  const history = useHistory()
  const dispatch = useDispatch()
  const styles = useStyles()

  const transference = useSelector(
    (state: StoreState) => state.transference.transference,
  )

  React.useEffect(() => {
    if (accountType !== undefined) {
      dispatch(updateTransferenceData({ accountType }))
      history.push(TransferenceRoutes.bankBranch)
    }
  }, [accountType, dispatch, history])

  const onCheckingAccountClick = () => {
    setAccountType(AccountType.checking)
  }

  const onSavingsAccountClick = () => {
    setAccountType(AccountType.savings)
  }

  const onCancelButtonClick = () => {
    dispatch(updateTransferenceData())
    history.go(-5)
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
            subtitle={`Qual o tipo de conta da(o) ${transference?.toName}?`}
            description="Para realizar a transferência, precisamos que você informe o tipo da conta destino."
          />
        }
        main={
          <React.Fragment>
            <Box
              className={styles.accountTypeHeader}
              data-test-id="account-type"
            >
              <Typography variant="caption">Tipo de conta</Typography>
            </Box>
            <Box className={styles.selectionCards}>
              <SelectionCard
                title="Conta Corrente"
                endIcon={'next'}
                onClick={onCheckingAccountClick}
                data-test-id="checking-account-button"
              />
              <SelectionCard
                title="Conta Poupança"
                endIcon={'next'}
                onClick={onSavingsAccountClick}
                data-test-id="saving-account-button"
              />
            </Box>
          </React.Fragment>
        }
        footer={<ProcessPageFooter />}
      />
    </PageContainer>
  )
}
