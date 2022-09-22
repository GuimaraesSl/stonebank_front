import React from 'react'
import Button from '@material-ui/core/Button'
import { useStyles, StylesProps } from 'components/GreatButton/GreatButton.style'

interface LoginButtonProps  extends StylesProps{
  disabled: boolean
}

export const LoginButton: React.FC<LoginButtonProps> = ({ 
  disabled,
  size,
  borderWidth,
  palette,
}) => {
  const styles = useStyles({borderWidth, size, palette})

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      size="large"
      disableElevation
      className={styles.button}
      disabled={disabled}
      type="submit"
      data-test-id="login-button"
    >
      Entrar
    </Button>
  )
}
