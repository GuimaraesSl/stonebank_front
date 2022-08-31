import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Radio,
} from '@material-ui/core'

import { useStyles } from './ListButtonRadio.style'

interface ListOptionsProps {
  title: string
  selectedValue: string
  setSelectedValue: Function
}

export const ListButtonRadio: React.FC<ListOptionsProps> = ({
  title,
  selectedValue,
  setSelectedValue,
}) => {
  const styles = useStyles()

  const handleClick = () => {
    setSelectedValue(title)
  }

  return (
    <List disablePadding>
      <ListItem
        button
        divider
        onClick={handleClick}
        className={styles.listItem}
        data-test-id="list-item"
      >
        <ListItemText className={styles.listItemText}>{title}</ListItemText>
        <ListItemSecondaryAction>
          <Radio
            data-test-id="list-button-radio"
            className={styles.radio}
            checked={selectedValue === title}
            onClick={handleClick}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}
