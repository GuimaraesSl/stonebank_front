import React from 'react'
import { Box, Card, Typography } from '@material-ui/core'
import { useStyles } from './PixOptionsButtons.style'

interface PixOptionsButtonsProps {
  id?: string
  title: string
  subtitle?: React.ReactNode | string
  startIcon?: React.ReactNode
  className?: string
  onClick?: VoidFunction
}

export const PixOptionsButtons: React.FC<PixOptionsButtonsProps> = ({
  id,
  title,
  subtitle,
  startIcon,
  className,
  onClick,
}) => {
  const styles = useStyles()

  const _className = (() => {
    return className ? `${styles.card} ${className}` : styles.card
  })()

  return (
    <Card id={id} className={_className} elevation={0} onClick={onClick}>
      {startIcon && (
        <Box
          id="start-icon-column"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {typeof startIcon === 'string' ? (
            <img
              id="start-icon"
              src={startIcon}
              alt={title + ' icon'}
              className={styles.icon}
            />
          ) : (
            startIcon
          )}
        </Box>
      )}
      <Box id="text-column" className={styles.text}>
        <Typography id="title" variant="subtitle1" className={styles.title}>
          {title}
        </Typography>
        <Typography id="subtitle" variant="body1" className={styles.subtitle}>
          {subtitle}
        </Typography>
      </Box>
    </Card>
  )
}
