import React from 'react'
import { Box, Button } from '@material-ui/core'
import { useStyles } from './BadgeChangeAccountButton.style'

interface BadgeChangeAccountButtonProps {
  icon: string
  iconAlt?: string
  onClick?: (evento: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const BadgeChangeAccountButton: React.FC<
  BadgeChangeAccountButtonProps
> = ({ icon: iconPath, iconAlt, onClick, children, ...rest }) => {
  const styles = useStyles()

  return (
    <Button
      variant="contained"
      className={styles.button}
      onClick={onClick}
      data-test-id="change-account-button"
      {...rest}
    >
      <Box className={styles.icon}>
        <img src={iconPath} alt={iconAlt} />
      </Box>
      {children}
    </Button>
  )
}
