/* eslint-disable react-hooks/exhaustive-deps */
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
} from 'components'
import { cancelLabel } from 'constants/buttons/labels'
import { useStyles } from './BankPixTransferSelectBank.style'
import { AccountRoutes } from 'features/account/constants/routes'
import { SearchField } from 'components/SearchField'
import { BankCard } from 'features/transference/components/BankCard'
import { Bank } from 'features/pix/redux/models/bank'

interface BankPixTransferSelectBankViewProps {
  toBank: string
  name?: string
  displayBanks?: any
  onBankClick?: any
  selectedBank: boolean
  _search: (value: string) => void
  onCancelButtonClick: VoidFunction
  onConfirmButtonClick: VoidFunction
  onBackButtonClick: VoidFunction
}
export const BankPixTransferSelectBankView: React.FC<
  BankPixTransferSelectBankViewProps
> = ({
  selectedBank,
  toBank,
  name,
  displayBanks,
  onBankClick,
  _search,
  onCancelButtonClick,
  onConfirmButtonClick,
  onBackButtonClick,
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
            subtitle={`Qual o banco da conta de ${name} que você deseja transferir?`}
            description="Selecione a instituição na lista ou busque pelo nome ou código do banco."
          />
        }
        main={
          <Box display="flex" flexDirection="column">
            <Box className={style.searchField}>
              <SearchField
                placeholder="Busque por nome ou código"
                onChange={e => _search(e.target.value)}
              />
            </Box>
            <Box>
              {displayBanks?.map((bank: Bank) => (
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
          <Box className={style.footer}>
            <ProcessPageFooterButton backButton onClick={onBackButtonClick} />
            <ProcessPageFooterButton
              forwardButton
              disabled={selectedBank}
              onClick={onConfirmButtonClick}
            />
          </Box>
        }
        footerPosition="fixed"
      />
    </PageContainer>
  )
}
