import React from 'react'
import { Box } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { OptionCard } from 'features/onboarding/components/cards/OptionsCard'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { useStyles } from './ActivateAccount.style'
import { Icon } from 'components/Icon'

export const ActivateAccount: React.FC = () => {
  const styles = useStyles()

  return (
    <ProcessPageLayout
      appBar={<AppBar homeRoute={OnboardingRoutes.welcome} />}
      header={
        <ProcessDescriptionHeader
          title="Ativar conta"
          subtitle="Primeiro passo"
          description="Para ativar sua conta escolha uma das opções abaixo."
        />
      }
      main={
        <Box className={styles.contentWrapper}>
          <OptionCard
            title="Recebi SMS"
            subtitle="Recebeu uma transferência ou um código de ativação no celular?"
            pathImage={<Icon name="receivedSms" />}
            goToRoute={OnboardingRoutes.activationTokenForSMS}
            data-test-id="activation-token-sms"
          />
          <OptionCard
            title="Recebi um cartão"
            subtitle="Está com seu cartão em mãos? Vamos confirmar os dados"
            pathImage={<Icon name="receivedCard" />}
            goToRoute={OnboardingRoutes.enterTaxPayerForCard}
            data-test-id="activation-card"
          />
        </Box>
      }
      footer={<ProcessPageFooter />}
    />
  )
}
