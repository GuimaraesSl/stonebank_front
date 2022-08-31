import React from 'react'
import { Button } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

import './BadgeButton.scss'

interface BadgeButtonProps {
  imagePath: string | React.ReactNode
  title: string
  redirectRoute: string
}

export const BadgeButton: React.FC<BadgeButtonProps> = ({
  title,
  imagePath,
  redirectRoute,
  ...rest
}: BadgeButtonProps) => {
  const [redirect, setRedirect] = React.useState(false)

  const handleOnClick = () => {
    setRedirect(true)
  }

  return (
    <>
      {redirect ? <Redirect to={redirectRoute} /> : null}
      <Button
        className="bgButton"
        variant="outlined"
        color="primary"
        onClick={handleOnClick}
        fullWidth
        data-test-id="badge-button"
        {...rest}
      >
        <div className="propButton">
          {typeof imagePath === 'string' ? (
            <img src={imagePath} className="iconBgButton" alt="bgButton" />
          ) : (
            imagePath
          )}
          <div className="label">{title}</div>
        </div>
      </Button>
    </>
  )
}
