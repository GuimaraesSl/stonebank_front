import React from 'react'
import { Button as MuiButton } from '@material-ui/core'
import { useStyles } from './ButtonReadQRCode.style'
import { Icon } from 'components/Icon'

interface ButtonReadQRCodeProps {
  disabled?: boolean
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const ButtonReadQRCode: React.FC<ButtonReadQRCodeProps> = ({
  className,
  disabled,
  onClick,
  children,
}) => {
  const styles = useStyles()

  return (
    <MuiButton
      variant="contained"
      disabled={disabled}
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      {children}
      <Icon className={styles.img} name="qrCodeDigitalWithdrawal" />
    </MuiButton>
  )
}
