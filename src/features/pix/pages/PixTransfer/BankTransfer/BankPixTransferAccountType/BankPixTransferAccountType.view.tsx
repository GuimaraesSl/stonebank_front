/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
  SelectionCard,
} from 'components'
import { cancelLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyles } from './BankPixTransferAccountType.style'

interface BankPixTransferAccountTypeViewProps {
  payeeName?: string
  onCancelButtonClick: VoidFunction
  onSavingsAccountClick: VoidFunction
  onCheckingAccountClick: VoidFunction
}
export const BankPixTransferAccountTypeView: React.FC<
  BankPixTransferAccountTypeViewProps
> = ({
  payeeName,
  onSavingsAccountClick,
  onCancelButtonClick,
  onCheckingAccountClick,
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
            subtitle={`Qual o tipo da conta de ${payeeName} ?`}
            description="Para realizar a transferência, precisamos que você informe o tipo da conta destino."
          />
        }
        main={
          <React.Fragment>
            <Box className={style.accountTypeHeader}>
              <Typography variant="caption">Tipo de conta</Typography>
            </Box>
            <Box className={style.selectionCards}>
              <SelectionCard
                title="Conta Corrente"
                endIcon={'next'}
                onClick={onCheckingAccountClick}
              />
              <SelectionCard
                title="Conta Poupança"
                endIcon={'next'}
                onClick={onSavingsAccountClick}
              />
            </Box>
          </React.Fragment>
        }
        footer={
          <Box className={style.footer}>
            <ProcessPageFooterButton backButton />
          </Box>
        }
      />
    </PageContainer>
  )
}
