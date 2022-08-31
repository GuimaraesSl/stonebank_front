import React from 'react'
import { Box } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
  TextField,
} from 'components'
import { cancelLabel } from 'constants/buttons/labels'
import { useStyles } from './BankDataPixTransferAccount.style'
import { AccountRoutes } from 'features/account/constants/routes'

interface BankDataPixTransferAccountViewProps {
  toBankAccount: string
  isValidValue: boolean
  onConfirmButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
  onToBankAccountChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const BankDataPixTransferAccountView: React.FC<
  BankDataPixTransferAccountViewProps
> = ({
  toBankAccount,
  isValidValue,
  onConfirmButtonClick,
  onToBankAccountChange,
  onCancelButtonClick,
}) => {
  const style = useStyles()

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
            title="Transferência com Pix"
            subtitle="Qual o número da conta?"
            description="Informe o número completo da conta, incluindo o dígito."
          />
        }
        main={
          <Box component="form" onSubmit={onConfirmButtonClick}>
            <TextField
              label="Conta"
              placeholder="Digite apenas números"
              inputMode="numeric"
              value={toBankAccount}
              onChange={onToBankAccountChange}
            />
          </Box>
        }
        footer={
          <Box className={style.footer}>
            <ProcessPageFooterButton backButton />
            <ProcessPageFooterButton
              forwardButton
              disabled={isValidValue}
              onClick={onConfirmButtonClick}
            />
          </Box>
        }
      />
    </PageContainer>
  )
}
