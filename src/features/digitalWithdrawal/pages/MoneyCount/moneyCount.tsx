import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AccountRoutes } from 'features/account/constants/routes'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './MoneyCount.style'
import { useHistory } from 'react-router-dom'
import { DigitalWithdrawalRoutes } from 'features/digitalWithdrawal/constants/routes'
import { Icon } from 'components/Icon'

export const MoneyCount: React.FC = () => {
  const style = useStyles()

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={<ProcessDescriptionHeader title="Saque digital" />}
        main={
          <Box className={style.main}>
            <Typography className={style.text}>
              Agora é só aguardar a <br />
              contagem das notas e retirar
              <br /> seu dinheiro
            </Typography>
            <Box className={style.clock}>
              <Icon name={'clock'} className={style.proportions} />
            </Box>
          </Box>
        }
      />
    </PageContainer>
  )
}
