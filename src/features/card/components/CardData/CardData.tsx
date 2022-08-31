import React from 'react'
import { useStyles } from './CardData.style'
import { Box, Card } from '@material-ui/core'

interface CardUserProps {
  fullName?: string
  flagCard?: string | React.ReactNode
  panLastDigits?: number
}

export const CardData: React.FC<CardUserProps> = ({
  fullName,
  flagCard,
  panLastDigits,
}) => {
  const styles = useStyles()
  return (
    <Box className={styles.containerCard} data-test-id="card-data">
      <Card className={styles.card} data-test-id="card">
        <Box className={styles.cardContent}>
          <Box className={styles.headerCardText}>
            Cartão de crédito pré-pago
          </Box>
          <Box className={styles.contentNumberCard}>
            <Box className={styles.numberCard}>
              xxxx.xxxx.xxxx.{panLastDigits}
            </Box>
            <Box className={styles.contentFlag}>
              {typeof flagCard === 'string' ? (
                <img
                  src={flagCard}
                  className={styles.flagStyle}
                  alt="FlagCard"
                />
              ) : (
                flagCard
              )}
              <Box className={styles.prepagText}>pré-pago</Box>
            </Box>
          </Box>
          <Box className={styles.nameCard}>{fullName}</Box>
        </Box>
      </Card>
    </Box>
  )
}
