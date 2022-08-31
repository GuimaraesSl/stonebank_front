import React from 'react'
import { Typography } from '@material-ui/core'
import { ConfigContext } from '_config'

export const AuthenticationTitle: React.FC = () => {
  const { company } = React.useContext(ConfigContext)

  return (
    <Typography variant="h5" align="center" data-test-id="authentication-title">
      Seja bem-vindo
      <br />
      ao <strong> {company.name}</strong>
    </Typography>
  )
}
