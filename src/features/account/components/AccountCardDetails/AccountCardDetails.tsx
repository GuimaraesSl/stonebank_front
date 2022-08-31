import React, { useState } from 'react'
import { useStyles } from './AccountCardDetails.style'
import { Account } from 'features/account/redux/models/account'
import { StoreState } from 'redux/state'
import { useSelector } from 'react-redux'
import { Clipboard } from 'ts-clipboard'
import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { Box, Typography, Drawer } from '@material-ui/core'
import { closeLabel } from 'constants/buttons/labels'
import { Close } from '@material-ui/icons'

interface AccountCardDetailsProps {
  account?: Account
  open?: boolean
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const AccountCardDetails: React.FC<AccountCardDetailsProps> = ({
  account,
  open,
  onClose,
}) => {
  useSelector((state: StoreState) => ({
    dashboard: state.account,
  }))
  const styles = useStyles()
  const [alertMessage, setAlertMessage] = useState('')

  const onCloseAlert = () => {
    setAlertMessage('')
  }

  const shareData = () => {
    let data = account!.taxId ? `CPF ou/ CNPJ: ${account!.taxId}\n` : ''
    data += account!.name ? `Nome: ${account!.name}\n` : ''
    data += account!.spbBank ? `Banco: ${account!.spbBank}\n` : ''
    data += account!.spbBankBranch ? `Agência: ${account!.spbBankBranch}\n` : ''
    data += account!.spbBankAccount ? `Conta: ${account!.spbBankAccount}\n` : ''
    data += account!.spbBankAccountDigit
      ? `Digito: ${account!.spbBankAccountDigit}\n`
      : ''

    Clipboard.copy(data)
    setAlertMessage('Copiado para área de transferência')
  }

  return (
    <Drawer
      className={styles.drawer}
      anchor="bottom"
      open={open}
      onClose={onClose}
      data-test-id="drawer"
    >
      <Box className={styles.container}>
        <Box className={styles.buttonClose}>
          <Button
            palette="secondary"
            size="small"
            startIcon={<Close color="primary" />}
            onClick={onClose}
            data-test-id="close-button"
          >
            {closeLabel}
          </Button>
        </Box>
        <Box className={styles.containerPopUp}>
          <Box data-test-id="container-pop-up">
            <Box className={styles.infos}>
              <Box className={styles.description}>
                <Typography
                  className={styles.nameAccount}
                  data-test-id="name-account"
                >
                  <strong>{account!.name}</strong>
                </Typography>
              </Box>
              <br />
              <>
                {account!.bank &&
                  account!.bankBranch &&
                  account!.bankAccount &&
                  account!.bankAccountDigit && (
                    <Typography variant="body2">
                      Identificador da conta: {account!.bank}.
                      {account!.bankBranch}.{account!.bankAccount}
                      {account!.bankAccountDigit}
                      <br />
                    </Typography>
                  )}
              </>
              <Box
                className={styles.bankingDataGrid}
                data-test-id="banking-data"
              >
                {account!.spbBank &&
                  account!.spbBankBranch &&
                  account!.spbBankAccount &&
                  account!.spbBankAccount && (
                    <Typography>
                      <strong>
                        Agência: {account!.spbBankBranch}
                        <br />
                        Conta: {account!.spbBankAccount}-
                        {account!.spbBankAccountDigit}
                        <br />
                        Banco: {account!.spbBank} Fitbank
                      </strong>
                    </Typography>
                  )}
              </Box>
            </Box>
          </Box>
          <br />
          <Box className={styles.buttonShare}>
            {account!.spbBank &&
              account!.spbBankBranch &&
              account!.spbBankAccount &&
              account!.spbBankAccount && (
                <Button
                  palette="secondary"
                  onClick={shareData}
                  data-test-id="share-button"
                >
                  Compartilhar
                </Button>
              )}
            {alertMessage && (
              <Alert
                title=""
                message={alertMessage}
                severity="info"
                onClose={onCloseAlert}
              />
            )}
          </Box>
          <br />
        </Box>
      </Box>
    </Drawer>
  )
}
