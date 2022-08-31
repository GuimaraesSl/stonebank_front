import React from 'react'
import { Box, Button } from '@material-ui/core'
import { useStyles } from './TransactionCardButton.style'
interface TransactionCardButtonProps {
  icon: string | React.ReactNode
  iconAlt?: string
  disabled?: boolean
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const TransactionCardButton: React.FC<TransactionCardButtonProps> = ({
  icon,
  iconAlt,
  className,
  disabled,
  onClick,
  children,
  ...rest
}) => {
  const styles = useStyles()

  return (
    <Button
      variant="contained"
      disabled={disabled}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      data-test-id="transaction-card-button"
      {...rest}
    >
      <Box className={styles.icon}>
        {typeof icon === 'string' ? <img src={icon} alt={iconAlt} /> : icon}
      </Box>
      {children}
    </Button>
  )
}
