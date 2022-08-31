import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './ProcessDescriptionHeader.style'

interface TitleAndDescritionProps {
  title?: string
  subtitle?: string
  description?: string
}

export const ProcessDescriptionHeader: React.FC<TitleAndDescritionProps> = ({
  title,
  subtitle,
  description,
  ...rest
}: TitleAndDescritionProps) => {
  const styles = useStyles()

  return (
    <Box>
      <Typography
        id="pd-title"
        variant="h6"
        className={styles.title}
        data-test-id="description-title"
        {...rest}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          id="pd-subtitle"
          variant="subtitle1"
          className={styles.subtitle}
          data-test-id="description-subtitle"
        >
          <strong>{subtitle}</strong>
        </Typography>
      )}
      {description && (
        <Typography
          id="pd-description"
          variant="body1"
          className={styles.description}
          data-test-id="description"
        >
          {description}
        </Typography>
      )}
    </Box>
  )
}
