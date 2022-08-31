import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { StylesProps, useStyles } from './WelcomePageButton.style'

interface WelcomePageButtonProps extends StylesProps {
  route: string
  disabled?: boolean
}

export const WelcomePageButton: React.FC<WelcomePageButtonProps> = ({
  route,
  size,
  palette,
  disabled,
  borderWidth,
  children,
}) => {
  const styles = useStyles({ borderWidth, size, palette })

  return (
    <Button
      className={styles.button}
      variant="contained"
      component={Link}
      to={route}
      disabled={disabled}
      fullWidth
      data-test-id="welcome-page-button"
    >
      {children}
    </Button>
  )
}
