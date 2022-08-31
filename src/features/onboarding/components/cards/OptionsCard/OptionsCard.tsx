import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Typography } from '@material-ui/core'

import './OptionsCard.scss'

interface OptionCardProps {
  title: string
  subtitle: string
  pathImage: string | React.ReactNode
  goToRoute: string
}

export const OptionCard = ({
  title,
  subtitle,
  pathImage,
  goToRoute,
  ...rest
}: OptionCardProps) => {
  const historyRoutes = useHistory()

  const handleClick = () => {
    historyRoutes.push(goToRoute)
  }

  return (
    <Card
      onClick={handleClick}
      className="contentOptionCard"
      data-test-id="option-card"
      {...rest}
    >
      <div className="description">
        <Typography variant="caption" display="block" gutterBottom>
          <strong>{title}</strong>
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {subtitle}
        </Typography>
      </div>
      {typeof pathImage === 'string' ? (
        <img src={pathImage} alt="" />
      ) : (
        pathImage
      )}
    </Card>
  )
}
