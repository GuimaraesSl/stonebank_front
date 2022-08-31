import React from 'react'
import { Box, Button } from '@material-ui/core'
import { useStyles } from './ButtonWIthFloatingIcon.style'

interface ButtonWithFloatingIconProps {
  icon?: string | React.ReactNode
  iconAlt?: string
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const ButtonWithFloatingIcon: React.FC<ButtonWithFloatingIconProps> = ({
  icon,
  iconAlt,
  size = 'medium',
  className,
  disabled,
  onClick,
  children,
  ...rest
}) => {
  const styles = useStyles({ size })

  return (
    <Button
      variant="contained"
      disabled={disabled}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      size={size}
      {...rest}
    >
      <Box className={styles.icon}>
        {typeof icon === 'string' ? <img src={icon} alt={iconAlt} /> : icon}
      </Box>
      {children}
    </Button>
  )
}
