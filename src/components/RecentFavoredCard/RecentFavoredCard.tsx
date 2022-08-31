import React from 'react'
import { Box } from '@material-ui/core'
import { Button } from 'components/Button'
import { useStyles } from './RecentFavoredCard.style'

interface RecentFavoredCardProps {
  name?: string
  taxId?: string
  bankName?: string
  onClick?: VoidFunction
}

export const RecentFavoredCard: React.FC<RecentFavoredCardProps> = ({
  name,
  taxId,
  bankName,
  onClick,
}) => {
  const styles = useStyles()

  return (
    <Box className={styles.recentFavored}>
      <Button onClick={onClick} palette={'secondary'}>
        <Box className="expressionsWrapper">
          <Box component="head" className="name">
            <strong>{name?.split(' ').slice(0, 2).join(' ')}</strong>
          </Box>
          <Box component="footer" className="bankName">
            {bankName?.split(' ').slice(0, 2).join(' ')}
          </Box>
        </Box>
      </Button>
    </Box>
  )
}
