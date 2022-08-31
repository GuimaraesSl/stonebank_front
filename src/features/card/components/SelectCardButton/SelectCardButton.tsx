import React from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from '@material-ui/core'
import { useStyles } from './SelectCardButton.style'
import { Card } from 'features/card/redux/models/card'
import { Icon } from 'components/Icon'

interface SelectButtonCardsProps {
  card?: Card
  flagCard?: string | React.ReactNode
  blocked?: boolean
  flagtype: string
  onClick?: (card: Card) => void
}

export const SelectCardButton: React.FC<SelectButtonCardsProps> = ({
  card,
  flagCard,
  blocked = card?.isBlocked,
  flagtype,
  onClick,
}) => {
  const styles = useStyles({ blocked, flagtype })
  return (
    <List className={styles.list}>
      <Box
        onClick={() => {
          if (onClick) onClick(card!)
        }}
      >
        <ListItem
          button
          divider
          className={styles.listItem}
          data-test-id="select-card"
        >
          <ListItemText
            primary={
              <Box className={styles.containerSpan}>
                <Box className={styles.blockStyle}>
                  <Icon name={'excludeIconCard'} className={styles.imgBlock} />
                </Box>
                <Typography className={styles.spanText}>
                  Cartão de crédito pré-pago
                </Typography>
                <Typography className={styles.infoCard}>
                  {flagtype} - Final {card!.panLastDigits}
                </Typography>
              </Box>
            }
            secondary={
              <Typography className={styles.fullName}>
                {card!.fullName}
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              className={styles.contentFlag}
              data-test-id="content-flag-button"
            >
              <Box className={styles.containerFlag}>
                {typeof flagCard === 'string' ? (
                  <img
                    src={flagCard}
                    className={styles.flagCard}
                    alt="bgButton"
                  />
                ) : (
                  flagCard
                )}
                <Typography className={styles.prepagText}>pré-pago</Typography>
              </Box>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Box>
    </List>
  )
}
