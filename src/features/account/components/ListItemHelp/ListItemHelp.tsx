import React from 'react'
import { Box, ListItem, Typography } from '@material-ui/core'
import { useStyles } from './ListItemHelp.style'

interface ListItemHelpProps {
  title: string
  details: string
  icon: string | React.ReactNode
}
export const ListItemHelp: React.FC<ListItemHelpProps> = ({
  title,
  details,
  icon,
}) => {
  const styles = useStyles()
  return (
    <ListItem component="li" className={styles.actionListItem}>
      <Box className={styles.content}>
        <Box className={styles.items}>
          {/* <img src={icon} alt={title} /> */}
          {icon}
          <Typography className={styles.title}>{title}</Typography>
        </Box>
        <Typography className={styles.details}>{details}</Typography>
      </Box>
    </ListItem>
  )
}
