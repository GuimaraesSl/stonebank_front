import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { confirmLabel, returnLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { useStyles } from './ProcessPageFooterButton.style'
import React from 'react'
import { Box } from '@material-ui/core'
import { Button } from 'components/Button'

interface ProcessPageFooterButtonProps {
  children?: string
  className?: string
  disabled?: boolean
  onClick?: VoidFunction
  backButton?: boolean
  forwardButton?: boolean
}

export const ProcessPageFooterButton: React.FC<
  ProcessPageFooterButtonProps
> = ({ children, className, disabled, onClick, backButton, forwardButton }) => {
  const history = useHistory()
  const styles = useStyles()

  const _className = (() => {
    return className ? `${styles.button} ${className}` : styles.button
  })()

  const _onClick = () => {
    history.goBack()
  }

  return (
    <Box className={_className}>
      <Button
        size="large"
        palette={forwardButton ? 'primary' : 'secondary'}
        startIcon={backButton && <KeyboardArrowLeft color="secondary" />}
        endIcon={forwardButton && <KeyboardArrowRight color="secondary" />}
        disabled={disabled}
        onClick={onClick ?? _onClick}
        data-test-id="back-button"
      >
        {backButton ? returnLabel : children ?? confirmLabel}
      </Button>
    </Box>
  )
}
