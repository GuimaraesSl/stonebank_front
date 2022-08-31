import React from 'react'
import { Button, Typography, Box } from '@material-ui/core'
import { useStyles } from './Option.style'

type OptionProps = {
  title: string
  icon: React.ReactNode
  type: 'standard'
  description: string
  onClick: React.MouseEventHandler<HTMLElement>
}

export const Option: React.FC<OptionProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  const styles = useStyles()
  return (
    <React.Fragment>
      <Button
        className={styles.buttonOption}
        onClick={onClick}
        data-test-id="option-button"
      >
        <Box className={styles.contentContainer}>
          <Box className={styles.labelContainer}>
            <Typography variant="subtitle1" className={styles.subtitle}>
              <strong>{title}</strong>
            </Typography>
            <Typography variant="body1" className={styles.description}>
              {description}
            </Typography>
          </Box>
          {icon}
        </Box>
      </Button>
    </React.Fragment>
  )
}
