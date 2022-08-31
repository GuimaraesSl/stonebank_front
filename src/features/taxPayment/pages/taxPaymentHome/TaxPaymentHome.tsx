import React from 'react'
import { Box } from '@material-ui/core'
import { AccountRoutes } from 'features/account/constants/routes'
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
import { useStyles } from './TaxPaymentHome.style'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { useDispatch } from 'react-redux'
import {
  updateDarjPaymentData,
  updateFgtsPaymentData,
  updateGarePaymentData,
} from 'features/taxPayment/redux/actions'

export const TaxPaymentHome: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()

  const onCancelButtonClick = () => {
    dispatch(updateGarePaymentData())
    history.replace(AccountRoutes.home)
  }
  const onGareClick = () => {
    history.push(TaxPaymentRoutes.paymentGare)
  }
  const onFgtsClick = () => {
    history.push(TaxPaymentRoutes.paymentFgts)
  }
  const onDarjClick = () => {
    history.push(TaxPaymentRoutes.paymentDarj)
  }

  React.useEffect(() => {
    dispatch(updateGarePaymentData())
    dispatch(updateFgtsPaymentData())
    dispatch(updateDarjPaymentData())
  }, [])

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
            title="Pagamentos de Impostos"
            subtitle=""
            description="Pode ser para uma conta bancária ou por mensagem de texto no celular, mesmo que o beneficiário não tenha conta bancária"
          />
        }
        main={
          <Box className={styles.content}>
            <SelectionCard
              title="FGTS"
              subtitle="Fundo de Garantia do Tempo de Serviço"
              onClick={onFgtsClick}
              data-test-id="fgts-button"
            />
            <SelectionCard
              title="GARE"
              subtitle="Guia de Arrecadação de Receitas Estaduais"
              onClick={onGareClick}
              data-test-id="gare-button"
            />

            <SelectionCard
              title="DARJ"
              subtitle="Documento de Arrecadação do Rio de Janeiro"
              onClick={onDarjClick}
              data-test-id="darj-button"
            />
          </Box>
        }
        footer={<ProcessPageFooter />}
      />
    </PageContainer>
  )
}
