import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from '@material-ui/core'
import { useStyles } from './EnterCodeButton.style'
import { useHistory } from 'react-router'
import { Icon } from 'components/Icon'

export const EnterCodeButton: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()

  const readCode = () => {
    history.goBack()
  }

  return (
    <Link
      className={styles.EnterCodeButton}
      onClick={readCode}
      underline="none"
      data-test-id="enter-code-button"
    >
      <Icon name={'numberTypeBarCode'} />
      <Typography className={styles.textHelper}>
        manualmente <br />
        Digitar o código
      </Typography>
    </Link>
  )
}
