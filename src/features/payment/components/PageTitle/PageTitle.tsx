import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyle } from './PageTitle.style'
interface TextProps {
  text: string
}

export const PageTitle = ({ text }: TextProps) => {
  const stylePageTitle = useStyle()

  return (
    <div className={stylePageTitle.pageTitle} data-test-id="page-title">
      <Typography variant="h4" align="center">
        <strong>{text}</strong>
      </Typography>
    </div>
  )
}
