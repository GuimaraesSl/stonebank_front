import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from './Validator.style'
import { Icon } from 'components/Icon'

interface ValidatorProps {
  description: string
  isValid?: boolean | undefined
  validation: Function
  onValidate?: (value: boolean | undefined) => void
  strictValidation?: boolean
  value?: string
}
export const Validator: React.FC<ValidatorProps> = ({
  description,
  isValid,
  validation,
  onValidate,
  strictValidation,
  value,
  ...rest
}) => {
  const styles = useStyles()

  React.useEffect(() => {
    const result = validation(value)
    onValidate!(result)
  }, [value])

  const _getIcon = () => {
    return isValid ? 'exclude' : 'ellipse_24'
  }

  const _getClassName = () => {
    let className = `${styles.description} `

    if (isValid) className += styles.valid
    else if (strictValidation) className += styles.invalid

    return className
  }

  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      spacing={1}
      data-test-id="password-validator"
      {...rest}
    >
      <Grid item>
        <Icon name={_getIcon()} />
      </Grid>
      <Grid item>
        <Typography className={_getClassName()}>{description}</Typography>
      </Grid>
    </Grid>
  )
}
