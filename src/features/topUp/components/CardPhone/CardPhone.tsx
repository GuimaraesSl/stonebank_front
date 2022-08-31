import React from 'react'
import { Button, Typography, Box } from '@material-ui/core'
import { useStyles } from './CardPhone.style'

interface CardPhoneProps {
  title: string
  icon: React.ReactNode
  type: 'standard'
  description: string
  phoneNumber: string
  onClick: React.MouseEventHandler<HTMLElement>
}

export const CardPhone: React.FC<CardPhoneProps> = ({
  title,
  description,
  phoneNumber,
  icon,
  onClick,
}) => {
  const styles = useStyles()
  return (
    <React.Fragment>
      <Button
        className={styles.buttonOption}
        onClick={onClick}
        data-test-id="card-phone"
      >
        <Box className={styles.contentContainer}>
          <Box className={styles.labelContainer}>
            <Typography
              variant="subtitle1"
              className={styles.subtitle}
              data-test-id="subtitle"
            >
              <strong>{title}</strong>
            </Typography>
            <Typography
              variant="body1"
              className={styles.description}
              data-test-id="description"
            >
              {description}
            </Typography>
            <Typography
              className={styles.phoneNumber}
              data-test-id="phone-number"
            >
              {phoneNumber}
            </Typography>
          </Box>
          {icon}
        </Box>
      </Button>
    </React.Fragment>
  )
}
