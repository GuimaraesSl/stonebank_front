import React from 'react'
import { Link } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { useStyle } from './ForgotPassword.style'

export const ForgotPassword: React.FC = () => {
  const history = useHistory()
  const style = useStyle()

  const onForgotPasswordButtonClick = () => {
    history.push(AuthenticationRoutes.recoverPassword)
  }
  return (
    <Link
      className={style.forgotPassword}
      align="center"
      onClick={onForgotPasswordButtonClick}
      data-test-id="forgot-password-link"
    >
      Esqueci minha senha
    </Link>
  )
}
