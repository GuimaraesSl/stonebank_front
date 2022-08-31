import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyle } from './PageTitle.style'
interface TextProps {
  text: string
}

export const PageTitle = ({ text }: TextProps) => {
  const stylePageTitle = useStyle()

  return (
    <div className={stylePageTitle.pageTitle}>
      <Typography variant="h4" align="center" data-test-id="page-title">
        <strong>{text}</strong>
      </Typography>
    </div>
  )
}
