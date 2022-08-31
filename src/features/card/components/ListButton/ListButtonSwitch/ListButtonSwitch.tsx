import React from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { useStyles } from './ListButtonSwitch.style'
import { Card } from 'features/card/redux/models/card'

interface ListButtonProps {
  card?: Card
  title: string
  right?: React.ReactNode
  onClick?: (card: Card) => void
}

export const ListButtonSwitch: React.FC<ListButtonProps> = ({
  card,
  title,
  right,
  onClick,
  ...rest
}) => {
  const styles = useStyles()
  return (
    <List disablePadding={true}>
      <Box
        onClick={() => {
          if (onClick) onClick(card!)
        }}
      >
        <ListItem
          button
          divider
          className={styles.listItem}
          data-test-id="list-button-switch"
          {...rest}
        >
          <ListItemText className={styles.listItemText}>{title}</ListItemText>
          <ListItemSecondaryAction className={styles.listItemSecondaryAction}>
            {right}
          </ListItemSecondaryAction>
        </ListItem>
      </Box>
    </List>
  )
}
