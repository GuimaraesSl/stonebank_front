import React from 'react'
import { Box, Card, Typography } from '@material-ui/core'
import { useStyles } from './PixButtonConfig.style'
import { Icon, IconTypes } from 'components/Icon/Icon'

interface PixOptionsButtonsProps {
  id?: string
  title: string
  subtitle?: React.ReactNode | string
  startIcon?: React.ReactNode | string | keyof typeof IconTypes
  className?: string
  onClick?: VoidFunction
}

export const PixButtonConfig: React.FC<PixOptionsButtonsProps> = ({
  id,
  title,
  subtitle,
  startIcon,
  className,
  onClick,
}) => {
  const styles = useStyles()
  let start = startIcon as keyof typeof IconTypes

  const _className = (() => {
    return className ? `${styles.card} ${className}` : styles.card
  })()

  return (
    <Card id={id} className={_className} elevation={0} onClick={onClick} data-test-id="pixcard-button">
      {startIcon && (
        <Box
          id="start-icon-column"
          display="flex"
          alignItems="center"
          justifyContent="center"
          data-test-id="pixicon-button"
        >
          {typeof startIcon === 'string' ? (
            <Icon name={start} className={styles.icon} />
          ) : (
            startIcon
          )}
        </Box>
      )}
      <Box id="text-column" className={styles.text}>
        <Typography id="title" variant="subtitle1" className={styles.title} data-test-id="pix-title">
          {title}
        </Typography>
        <Typography id="subtitle" variant="body1" className={styles.subtitle} data-test-id="pix-subtitle">
          {subtitle}
        </Typography>
      </Box>
    </Card>
  )
}
