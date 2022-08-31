import React from 'react'
import { Box, Card, Typography } from '@material-ui/core'
import { CurrencyFormatter } from '_translate'
import { useStyle } from './YourFinancesCard.style'
import { Icon } from 'components/Icon'

interface YourFinancesCardProps {
  value?: number
  income?: boolean
}

export const YourFinancesCard: React.FC<YourFinancesCardProps> = ({
  value,
  income,
}) => {
  const style = useStyle()
  const formattedValue = value ? CurrencyFormatter.format(value) : '---'

  return (
    <Box className={style.wrapper}>
      <Box className={style.icon}>
        <Icon name={income ? 'enter' : 'exit'} />
      </Box>
      <Card className={style.card} data-test-id="finances-card">
        <Typography variant="caption">
          Você <strong>{income ? 'recebeu' : 'gastou'}</strong>
        </Typography>
        <Typography variant="body2">
          <strong>{formattedValue}</strong>
        </Typography>
      </Card>
    </Box>
  )
}
