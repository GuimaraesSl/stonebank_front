import React from 'react'
import Button from '@material-ui/core/Button'
import { useStyles } from './LoginButton.style'

interface LoginButtonProps {
  disabled: boolean
}

export const LoginButton: React.FC<LoginButtonProps> = ({ disabled }) => {
  const styles = useStyles()

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      size="large"
      disableElevation
      className={styles.loginButton}
      disabled={disabled}
      type="submit"
      data-test-id="login-button"
    >
      Entrar
    </Button>
  )
}
