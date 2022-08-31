import React from 'react'
import { Button as MuiButton } from '@material-ui/core'
import { ButtonStylesProps, useStyles } from './CancelTransferButton.style'
import { Close } from '@material-ui/icons'
import { cancelMoneyLabel } from 'constants/buttons/labels'

interface ButtonProps extends ButtonStylesProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const CancelTransferButton: React.FC<ButtonProps> = ({
  onClick,
  size = 'medium',
  variant = 'contained',
  palette = 'secondary',
}) => {
  const styles = useStyles({ size, palette, variant })

  return (
    <MuiButton
      variant={variant}
      color={palette}
      size={size}
      startIcon={<Close />}
      className={styles.button}
      onClick={onClick}
      data-test-id="cancel-transfer-button"
    >
      {cancelMoneyLabel}
    </MuiButton>
  )
}
