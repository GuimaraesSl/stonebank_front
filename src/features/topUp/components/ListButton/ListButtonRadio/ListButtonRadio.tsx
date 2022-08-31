import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Radio,
  Box,
} from '@material-ui/core'
import { useStyles } from './ListButtonRadio.style'
import { useHistory } from 'react-router-dom'

interface ListOptionsProps {
  title: string
  description?: string
  selectedValue?: string
  setSelectedValue?: Function
  goToRoute: string
  onClick?: React.MouseEventHandler<HTMLElement>
}

export const ListButtonRadio: React.FC<ListOptionsProps> = ({
  title,
  description,
  selectedValue,
  setSelectedValue,
  goToRoute,
  onClick,
}) => {
  const history = useHistory()
  const styles = useStyles()

  return (
    <List disablePadding>
      <Box onClick={onClick} data-test-id="list-radio-button">
        <ListItem button divider className={styles.listItem}>
          <ListItemIcon>
            <Radio className={styles.radio} checked={selectedValue === title} />
          </ListItemIcon>
          <ListItemText
            className={styles.listItemText}
            primary={title}
            secondary={description}
          ></ListItemText>
        </ListItem>
      </Box>
    </List>
  )
}
