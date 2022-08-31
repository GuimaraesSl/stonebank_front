import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { StylesProps, useStyles } from './ActivateAccountButton.style'

interface ActivateAccountButtonProps extends StylesProps {
  route: string
  disabled?: boolean
}

export const ActivateAccountButton: React.FC<ActivateAccountButtonProps> = ({
  borderWidth,
  size,
  palette,
  route,
  disabled,
  children,
}) => {
  const styles = useStyles({ borderWidth, size, palette })

  return (
    <Button
      className={styles.button}
      variant="contained"
      component={Link}
      to={route}
      disabled={disabled}
      fullWidth
      data-test-id="activate-account-button"
    >
      {children}
    </Button>
  )
}
