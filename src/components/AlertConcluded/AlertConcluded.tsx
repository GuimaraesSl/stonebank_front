import React from 'react'
import { useStyle } from './AlertConcluded.style'
import { Icon } from 'components/Icon'
import { Drawer, Box, Typography } from '@material-ui/core'
import { RestaurantSharp } from '@material-ui/icons'

interface AlertProps {
  open: boolean
  onClose?: (args: boolean) => void
  onClick?: React.MouseEventHandler<HTMLElement>
  title: string
}

export const AlertConcluded: React.FC<AlertProps> = ({
  open,
  onClose = () => {},
  onClick,
  title,
  ...rest
}) => {
  const styles = useStyle()
  return (
    <Drawer
      className={styles.drawer}
      anchor="top"
      elevation={5}
      open={open}
      onClose={() => onClose(true)}
      onClick={onClick}
      data-test-id="alert"
    >
      <Box
        className={styles.alertcontainer}
        data-test-id="alert-concluded"
        {...rest}
      >
        <Icon name="conclude" className={styles.imgalert} />
        <Typography className={styles.txtalert}>{title}</Typography>
      </Box>
    </Drawer>
  )
}
