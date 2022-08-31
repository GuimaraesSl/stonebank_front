import React from 'react'
import { Typography } from '@material-ui/core'
import { ConfigContext } from '_config'
import { useStyles } from './OnboardingTile.style'

export const OnboardingTitle: React.FC = () => {
  const { company } = React.useContext(ConfigContext)
  const styles = useStyles()

  return (
    <Typography
      variant="h5"
      className={styles.title}
      data-test-id="welcome-title"
    >
      Seja bem-vindo
      <br />
      ao <strong>{company.name}</strong>
    </Typography>
  )
}
