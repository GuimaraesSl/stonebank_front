import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { StylesProps, useStyles } from './GreatButton.style'

interface GreatButtonProps extends StylesProps {
  route: string
  disabled?: boolean
  id: string
}

export const GreatButton: React.FC<GreatButtonProps> = ({
  route,
  size,
  palette,
  disabled,
  borderWidth,
  children,
  id,
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
      data-test-id={id}
    >
      {children}
    </Button>
  )
}
