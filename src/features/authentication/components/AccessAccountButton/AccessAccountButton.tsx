import React from 'react'
import { Button } from '@material-ui/core'
import { accessAccountLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { useDispatch } from 'react-redux'
import { logout } from 'features/authentication/redux/actions'
import { useStyles, StylesProps } from 'components/GreatButton/GreatButton.style'


interface AccessAccountButtonProps extends StylesProps{

}

export const AccessAccountButton: React.FC<AccessAccountButtonProps> = (
  palette,
  size,
) => {
  const style = useStyles(palette)
  const history = useHistory()
  const dispatch = useDispatch()
  const onAccessAccountClick = () => {
    history.replace(AuthenticationRoutes.signIn)
    dispatch(logout())
  }

  return (
    <Button
      className={style.button}
      color="secondary"
      variant="contained"
      disableElevation
      size="large"
      onClick={onAccessAccountClick}
      data-test-id="access-account-button"
    >
      {accessAccountLabel}
    </Button>
  )
}
