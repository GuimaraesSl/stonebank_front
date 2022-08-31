import React from 'react'
import { Bank } from 'features/transference/redux/models/bank'
import { Card, ListItem, ListItemText } from '@material-ui/core'
import { BankCardStyleProps, useStyles } from './BankCard.style'

interface BankCardProps extends BankCardStyleProps {
  bank: Bank
  onClick?: (bank: Bank) => void
}

export const BankCard: React.FC<BankCardProps> = ({
  bank,
  selected,
  onClick,
}) => {
  const styles = useStyles({ selected })

  return (
    <Card variant="outlined" className={styles.bankCard}>
      <ListItem
        data-test-id="bank-card"
        button
        onClick={() => {
          if (onClick) onClick(bank)
        }}
      >
        <ListItemText
          data-test-id="bank"
          primary={bank.name}
          secondary={bank.code.padStart(4, '0')}
        />
      </ListItem>
    </Card>
  )
}
