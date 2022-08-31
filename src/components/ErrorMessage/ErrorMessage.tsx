import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { useStyles } from './ErrorMessage.style'
import { Icon } from 'components/Icon'

interface ErrorMessageProps {
  message: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const styles = useStyles()

  return (
    <Box className={styles.container}>
      <Icon name="redExclamation" className={styles.alert} />
      <Typography className={styles.message}>{message}</Typography>
    </Box>
  )
}
