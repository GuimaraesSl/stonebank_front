import React from 'react'
import { Container } from '@material-ui/core'
import { useStyles } from './PageContainter.style'

interface PageContainerProps {
  className?: string
}

export const PageContainer: React.FC<PageContainerProps> = ({
  className,
  children,
}) => {
  const styles = useStyles()

  return (
    <Container maxWidth="xs" className={`${styles.pageContainer} ${className}`}>
      {children as React.ReactChildren}
    </Container>
  )
}
