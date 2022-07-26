import React from 'react'
import { Typography } from '@material-ui/core'
import { ConfigContext } from '_config'
import { useStyles } from './OnboardingSubTitle.style'

export const OnboardingSubTitle: React.FC = () => {
  const { company } = React.useContext(ConfigContext)
  const styles = useStyles()

  return (
    <Typography
      variant="h5"
      className={styles.title}
      data-test-id="welcome-title"
    >
      Bem-vindo a sua nova experiência
      <br />
      bancária
    </Typography>
  )
}
