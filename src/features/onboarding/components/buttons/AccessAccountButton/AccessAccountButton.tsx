import React from 'react'
import { Button } from '@material-ui/core'
import { accessAccountLabel } from 'constants/buttons/labels'
import { useStyles } from './AccessAccountButton.style'
import { useHistory } from 'react-router-dom'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'

export const AccessAccountButton: React.FC = () => {
  const style = useStyles()
  const history = useHistory()

  const onAccessAccountClick = () => {
    history.replace(AuthenticationRoutes.signIn)
  }

  return (
    <Button
      className={style.accessAccountButton}
      variant="outlined"
      color="primary"
      onClick={onAccessAccountClick}
      data-test-id="access-account-button"
    >
      {accessAccountLabel}
    </Button>
  )
}
