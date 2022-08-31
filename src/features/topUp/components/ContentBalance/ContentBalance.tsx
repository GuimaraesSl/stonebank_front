import React from 'react'
import { Card, Box, Typography } from '@material-ui/core'
import { useStyles } from './ContentBalance.style'
import { CurrencyFormatter } from '_translate'

interface ContentBalanceProps {
  balance: string
}

export const ContentBalance: React.FC<ContentBalanceProps> = ({ balance }) => {
  const style = useStyles()
  return (
    <Card className={style.card}>
      <Box>
        <Typography className={style.txtBalance} data-test-id="content-balance">
          Seu saldo <strong className={style.strongStyle}>{balance}</strong>
        </Typography>
      </Box>
    </Card>
  )
}
